import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import generatePDF from "../lib/pdfFunction";

const EventDetails = ({ eventId }: { eventId: string }) => {
    const [event, setEvent] = useState<any>(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [registrationId, setRegistrationId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEventAndRegistration() {
            // Fetch Event
            const { data: eventData } = await supabase
                .from("events")
                .select("*")
                .eq("id", eventId)
                .single();
            setEvent(eventData);

            // Fetch User Registration Status
            const { data: userData } = await supabase.auth.getUser();
            if (userData?.user) {
                const { data: regData } = await supabase
                    .from("registrations")
                    .select("id")
                    .eq("event_id", eventId)
                    .eq("user_id", userData.user.id)
                    .maybeSingle();

                if (regData) {
                    setRegistrationId(regData.id);
                }
            }
        }
        fetchEventAndRegistration();
    }, [eventId]);

    const handleConfirm = async () => {
        setIsRegistering(true);
        try {
            const { data: userData } = await supabase.auth.getUser();
            if (!userData?.user) {
                alert("Please log in to confirm your attendance.");
                setIsRegistering(false);
                return;
            }

            let regIdToPrint = registrationId;

            // If not registered yet, insert a registration
            if (!regIdToPrint) {
                const { data: newReg, error } = await supabase
                    .from("registrations")
                    .insert({
                        event_id: eventId,
                        user_id: userData.user.id,
                    })
                    .select("id")
                    .single();

                if (error) {
                    console.error("Error registering:", error);
                    alert("Failed to confirm attendance.");
                    setIsRegistering(false);
                    return;
                }

                setRegistrationId(newReg.id);
                regIdToPrint = newReg.id;
            }

            // Generate the PDF
            if (regIdToPrint) {
                await generatePDF(regIdToPrint);
            }
        } catch (error) {
            console.error("Confirmation error:", error);
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div>
            <div className="">
                <Card>
                    <img
                        src={event?.image_url}
                        alt="Event cover"
                        className="relative z-20 aspect-video w-full object-cover"
                    />
                    <CardHeader>
                        <CardAction>
                        </CardAction>
                        <CardTitle>{event?.title}</CardTitle>
                        <CardDescription>
                            Description : {event?.description}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex gap-2">
                        <Button
                            onClick={handleConfirm}
                            disabled={isRegistering}
                            className="w-full"
                        >
                            {isRegistering
                                ? "Processing..."
                                : registrationId
                                    ? "Download Ticket"
                                    : "Confirm Attendance & Get Ticket"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default EventDetails