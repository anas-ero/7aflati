
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaHeart } from "react-icons/fa";
import { Route, Routes } from "react-router-dom";
import SavedEvents from "./SavedEvents";

const UserSection = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });
      setEvents(data || []);
    }
    fetchEvents();
  }, []);
  const handleSaveEvent = async (eventId: string) => {
    // Optimistically update the UI so the heart fills immediately
    setSavedEvents((prev) => [...prev, eventId]);

    const { data, error } = await supabase.from("saved_events").insert({
      event_id: eventId,
      user_id: (await supabase.auth.getUser()).data.user?.id,
    })
    if (error) {
      console.error("Error saving event:", error);
      // Revert the update if there was an error
      setSavedEvents((prev) => prev.filter((id) => id !== eventId));
    } else {
      console.log("Event saved successfully:", data);
    }

  }
  const handleUnsaveEvent = async (eventId: string) => {
    // Optimistically update the UI so the heart empties immediately
    setSavedEvents((prev) => prev.filter((id) => id !== eventId));

    const { data, error } = await supabase.from("saved_events").delete().eq("event_id", eventId);
    if (error) {
      console.error("Error unsaving event:", error);
      // Revert the update if there was an error
      setSavedEvents((prev) => [...prev, eventId]);
    } else {
      console.log("Event unsaved successfully:", data);
    }

  }
  useEffect(() => {
    async function fetchSavedEvents() {
      const { data } = await supabase
        .from("saved_events")
        .select("event_id")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);
      setSavedEvents(data?.map((event) => event.event_id) || []);
    }
    fetchSavedEvents();
  }, []);

  return (
    <div>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
              {events.length === 0 ? (
                <p>No upcoming events.</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {events.map((event) => (
                    <Card key={event.id} className="relative overflow-hidden mx-auto w-full max-w-sm pt-0">
                      <div className="absolute top-3 right-3 z-40">
                        <Badge
                          variant="link"
                          className={`cursor-pointer w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white ${savedEvents.includes(event.id) ? "text-rose-500" : "text-gray-500"
                            } shadow-sm transition-colors p-1.5`}
                          onClick={() => {
                            if (savedEvents.includes(event.id)) {
                              handleUnsaveEvent(event.id);
                            } else {
                              handleSaveEvent(event.id);
                            }
                          }}
                        >
                          <FaHeart className="w-4 h-4" />
                        </Badge>
                      </div>
                      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                      <img
                        src={event.image_url}
                        alt="Event cover"
                        className="relative z-20 aspect-video w-full object-cover brightness-60  dark:brightness-40"
                      />
                      <CardHeader>
                        <CardAction>
                          <Badge variant="secondary">Featured</Badge>
                        </CardAction>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full">View Event</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </>
          }
        />

        <Route path="/saved" element={<SavedEvents />} />

      </Routes>
    </div>

  );
};
export default UserSection;
