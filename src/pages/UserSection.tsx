
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const UserSection = () => {
  const [events, setEvents] = useState<any[]>([]);
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="relative  mx-auto w-full max-w-sm pt-0">
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
        ))}</div>
      )}
        </div>

  );
};
export default UserSection;
