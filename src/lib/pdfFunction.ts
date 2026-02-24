import { PDFDocument } from "pdf-lib";
import { supabase } from "./supabase";

export default async function generatePDF(registrationId: string) {
  try {
    // 1. Fetch data (Joining registration and events)
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

    // Fetch user profile separately to avoid foreign key relation errors
    let fullName = "Guest";

    // First, check the currently authenticated user's metadata since full_name is often stored there on signup
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user?.user_metadata?.full_name) {
      fullName = userData.user.user_metadata.full_name;
    } else if (reg.user_id) {
      // Fallback: Check the profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", reg.user_id)
        .single();
      if (profile?.full_name) {
        fullName = profile.full_name;
      }
    }

    // 2. Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText(`OFFICIAL TICKET`, { x: 50, y: 350, size: 28 });
    page.drawText(`Event: ${reg.events?.title || "Event"}`, {
      x: 50,
      y: 300,
      size: 20,
    });
    page.drawText(`Attendee: ${fullName}`, {
      x: 50,
      y: 260,
      size: 18,
    });

    // Format date if exists
    const dateStr = reg.events?.date
      ? new Date(reg.events.date).toLocaleDateString()
      : "TBA";
    page.drawText(`Date: ${dateStr}`, { x: 50, y: 220, size: 15 });
    page.drawText(`Ticket ID: ${registrationId}`, { x: 50, y: 180, size: 12 });

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
