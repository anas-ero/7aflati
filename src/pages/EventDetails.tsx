import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


const EventDetails = ({ eventId }: { eventId: string }) => {
    const [event, setEvent] = useState<any>(null);

    useEffect(() => {
        async function fetchEvent() {
            const { data } = await supabase
                .from("events")
                .select("*")
                .eq("id", eventId)
                .single();
            setEvent(data);
        }
        fetchEvent();
    }, [])
    return (
        <div>
            <div className="">
                <div/>
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



                    </CardFooter>
                </Card>
            </div>



        </div>

    )
}

export default EventDetails