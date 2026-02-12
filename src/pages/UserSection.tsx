import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";

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
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="p-4 bg-slate-800 rounded">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p>{event.description}</p>{" "}
              <p>
                {" "}
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleString()}{" "}
              </p>{" "}
              <p>
                {" "}
                <strong>Location:</strong> {event.location}{" "}
              </p>{" "}
              <p>
                {" "}
                <strong>Price:</strong> ${event.price}{" "}
              </p>{" "}
            </li>
          ))}{" "}
        </ul>
      )}
    </div>
  );
};
export default UserSection;
