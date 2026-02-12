import { supabase } from "../lib/supabase";
import { useState } from "react";

const OrganizerSection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleCreateEvent(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      alert("You must be logged in to create an event.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("events").insert({
      title,
      description,
      date,
      location,
      price,
      created_by: userData.user.id,
    });
    setLoading(false);
    if (error) {
      alert("Error creating event: " + error.message);
      return;
    }
    alert("Event created !");
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create Event</h2>

      <form onSubmit={handleCreateEvent} className="space-y-4">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded bg-slate-800"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full p-3 rounded bg-slate-800"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-brand-accent text-black rounded-xl"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};
export default OrganizerSection;