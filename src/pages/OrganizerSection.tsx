import { supabase } from "../lib/supabase";
import { useState } from "react";

const OrganizerSection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  async function handleCreateEvent(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      alert("You must be logged in to create an event.");
      setLoading(false);
      return;
    }
    let imageUrl = null;

    if (imageFile) {
      const filePath = `${userData.user.id}/${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("event-images") // your bucket name
        .upload(filePath, imageFile);

      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        setLoading(false);
        return;
      }
      const { data } = supabase.storage
        .from("event-images")
        .getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("events").insert({
      title,
      description,
      date,
      location,
      price,
      category,
      created_by: userData.user.id,
      image_url: imageUrl,
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
          className="w-full p-3 rounded border"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded border"
        />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 rounded border"
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 rounded border"
        />
        <select
          
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded border"
        >
          <option value="">Select a category</option>
          <option value="Tech">Tech</option>
          <option value="Art">Art</option>
          <option value="Music">Music</option>
          <option value="Business">Business</option>
          <option value="Workshop">Workshop</option>
          <option value="Sports">Sports</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full p-3 rounded border"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full p-3 rounded border"
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
