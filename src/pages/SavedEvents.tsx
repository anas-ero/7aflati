import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import EventDetails from "./EventDetails"
const SavedEvents = () => {
    const [savedEvents, setSavedEvents] = useState<any[]>([]);
    useEffect(() => {
        async function fetchSavedEvents() {
            const { data } = await supabase
                .from("saved_events")
                .select("*")
                .eq("user_id", (await supabase.auth.getUser()).data.user?.id);
            setSavedEvents(data || []);
        }
        fetchSavedEvents();
    }, []);
    return (
        <div>
            {savedEvents.map((event) => {
                return (
                    <div key={event.id} className="p-4 border rounded-lg shadow-sm mb-4">
                        <EventDetails eventId={event.event_id} />
                    </div>
                )
            })}
        </div>
    )
}



export default SavedEvents