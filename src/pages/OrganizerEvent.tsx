import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Event } from "../types";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

export default function OrganizerEvent() {
    const [events, setEvents] = useState<Event[] | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchEvents() {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .eq('created_by', user.id);

                if (!error && data) {
                    setEvents(data);
                }
            }
            setLoading(false);
        }
        fetchEvents();
    }, []);

    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (!error) {
            setEvents(events?.filter((event) => event.id !== id) || null);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events?.map((event) => (
                    <Card className="relative mx-auto w-full max-w-sm pt-0" key={event.id}>
                        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                        <img
                            src={event.image_url}
                            alt="Event cover"
                            className="relative z-20 aspect-video w-full object-cover"
                        />
                        <CardHeader>
                            <CardAction>
                            </CardAction>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription>
                                Description : {event.description}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex gap-2">
                            <Button className="w-3/4 cursor-pointer" onClick={() => navigate(`/dashboard/events/${event.id}`)} >View Event</Button>

                            <Button variant="outline" size="icon" className="text-destructive cursor-pointer w-1/4 " onClick={() => handleDelete(event.id)}>
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}