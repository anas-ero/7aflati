import { PDFDocument } from "pdf-lib";
import QRCode from "qrcode";
import { supabase } from "./supabase";

export default async function generatePDF(registrationId: string) {
  try {
    // fetching data
    const { data: reg, error } = await supabase
      .from("registrations")
      .select("*, events(title, date)")
      .eq("id", registrationId)
      .single();

    if (error || !reg) {
      console.error("Error fetching registration:", error);
      alert("Could not find registration details.");
      return;
    }

    let fullName = "Guest";
    // check the logged in user by searching the metadata in our supabase table since the full_name is stored there on signup
    const { data: userData } = await supabase.auth.getUser();
    // if the user is logged in  get the full name from the metadata
    if (userData?.user?.user_metadata?.full_name) {
      fullName = userData.user.user_metadata.full_name;
    } else if (reg.user_id) {
      // another solution : checking the table of profiles incase we didnt find any data in the metadata
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", reg.user_id)
        .single();
      // if the profile is found, we change our variable to the full name we founf.
      if (profile?.full_name) {
        fullName = profile.full_name;
      }
    }

    // 2. create our pdf receipe
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // generate the qr code
    const qrDataUrl = await QRCode.toDataURL(registrationId);

    const qrBase64 = qrDataUrl.split(",")[1];

    // include the qr in the pdf
    const qrImage = await pdfDoc.embedPng(qrBase64);

    // put the qr in the top of the pdf
    const qrDims = qrImage.scale(0.5); 
    page.drawImage(qrImage, {
      x: 50,
      y: page.getHeight() - qrDims.height - 30, 
      width: qrDims.width,
      height: qrDims.height,
    });

    page.drawText(`OFFICIAL TICKET`, { x: 50, y: 250, size: 28 });
    page.drawText(`Event: ${reg.events?.title || "Event"}`, {
      x: 50,
      y: 200,
      size: 20,
    });
    page.drawText(`Attendee: ${fullName}`, {
      x: 50,
      y: 160,
      size: 18,
    });

    // Format date if exists
    const dateStr = reg.events?.date
      ? new Date(reg.events.date).toLocaleDateString()
      : "TBA";
    page.drawText(`Date: ${dateStr}`, { x: 50, y: 120, size: 15 });
    page.drawText(`Ticket ID: ${registrationId}`, { x: 50, y: 80, size: 12 });

    const pdfBytes = await pdfDoc.save();

    // 3. Create a Blob and trigger download in the browser natively
    const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
    const localUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = localUrl;
    link.download = `ticket-${registrationId}.pdf`;
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(localUrl);

    return { success: true, message: "PDF Downloaded Successfully" };
  } catch (err) {
    console.error("Failed to generate PDF:", err);
    alert("An error occurred while generating the PDF.");
    return { success: false, error: err };
  }
}
