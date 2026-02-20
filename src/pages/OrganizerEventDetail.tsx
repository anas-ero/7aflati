import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function OrganizerEventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [existingImageUrl, setExistingImageUrl] = useState("");

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        async function fetchEventDetails() {
            if (!id) return;
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                alert("Error fetching event details: " + error.message);
                navigate("/dashboard/events");
                return;
            }

            if (data) {
                setTitle(data.title || "");
                setDescription(data.description || "");
                setDate(data.date ? new Date(data.date).toISOString().slice(0, 16) : "");
                setLocation(data.location || "");
                setPrice(data.price || 0);
                setCategory(data.category || "");
                setExistingImageUrl(data.image_url || "");
            }
            setLoading(false);
        }

        fetchEventDetails();
    }, [id, navigate]);

    async function handleUpdateEvent(e: React.FormEvent) {
        e.preventDefault();
        setUpdating(true);
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) {
            alert("You must be logged in to update an event.");
            setUpdating(false);
            return;
        }

        let imageUrl = existingImageUrl;

        if (imageFile) {
            const filePath = `${userData.user.id}/${Date.now()}-${imageFile.name}`;

            const { error: uploadError } = await supabase.storage
                .from("event-images") // your bucket name
                .upload(filePath, imageFile);

            if (uploadError) {
                alert("Image upload failed: " + uploadError.message);
                setUpdating(false);
                return;
            }
            const { data } = supabase.storage
                .from("event-images")
                .getPublicUrl(filePath);

            imageUrl = data.publicUrl;
        }

        const { error } = await supabase
            .from("events")
            .update({
                title,
                description,
                date,
                location,
                price,
                category,
                image_url: imageUrl,
            })
            .eq("id", id);

        setUpdating(false);
        if (error) {
            alert("Error updating event: " + error.message);
            return;
        }

        alert("Event updated successfully!");
        navigate("/dashboard/events");
    }

    if (loading) {
        return <div className="text-center py-10">Loading event details...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto py-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Update Event Details</h2>

            <form onSubmit={handleUpdateEvent} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Event Title</label>
                        <input
                            placeholder="e.g. Summer Music Festival"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                        <textarea
                            placeholder="Describe your event..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50 min-h-[120px]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Date & Time</label>
                            <input
                                type="datetime-local"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                            <input
                                placeholder="Event specific location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50"
                            >
                                <option value="">Select a category</option>
                                <option value="Tech">Tech</option>
                                <option value="Art">Art</option>
                                <option value="Music">Music</option>
                                <option value="Business">Business</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Sports">Sports</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Price ($)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={price ?? ""}
                                onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : undefined)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Update Cover Image</label>
                        {existingImageUrl && !imageFile && (
                            <div className="mb-4">
                                <img src={existingImageUrl} alt="Current event cover" className="h-32 rounded-lg object-cover" />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        <p className="text-sm text-slate-500 mt-2">Leave empty to keep the current image.</p>
                    </div>
                </div>

                <div className="pt-4 flex gap-4 items-center">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/events")}
                        className="w-1/3 py-4 bg-white text-slate-700 border border-slate-300 font-semibold rounded-xl hover:bg-slate-50 transition-all"
                    >
                        Cancel
                    </button>
                    <Button
                        type="submit"
                        className="w-2/3 py-4 h-12 "

                    >
                        {updating ? "Updating Event..." : "Update Event"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
