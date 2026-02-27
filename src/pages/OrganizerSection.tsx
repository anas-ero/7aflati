import { supabase } from "@/lib/supabase";
import { Routes, Route } from "react-router-dom";
import CreateEvent from "./CreateEvent";
import OrganizerEvent from "./OrganizerEvent";
import OrganizerEventDetail from "./OrganizerEventDetail";
import { useEffect, useState } from "react";
import Analytics from "./Analytics";

const OrganizerSection = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(0);
  const [pastEvents, setPastEvents] = useState(0);
  const [thisMonthEvents, setThisMonthEvents] = useState(0);

  useEffect(() => {
    async function fetchEventsNumber() {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("created_by", (await supabase.auth.getUser()).data.user?.id);

      setNumberOfEvents(data?.length || 0);
    }
    fetchEventsNumber();
  }, []);

  useEffect(() => {
    async function fetchPastEvents() {
      const { count, error } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .lt("date", new Date().toISOString())
        .eq("created_by", (await supabase.auth.getUser()).data.user?.id);

      if (!error && count) {
        setPastEvents(count);
      }
    }
    fetchPastEvents();
  }, []);
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  useEffect(() => {
    async function fetchThisMonthEvents() {
      const { count, error } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .gte("date", startOfMonth.toISOString())
        .eq("created_by", (await supabase.auth.getUser()).data.user?.id);

      if (!error && count) {
        setThisMonthEvents(count);
      }
    }
    fetchThisMonthEvents();
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Organizer Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Summary Cards */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500">
                  Total Events
                </h3>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {numberOfEvents}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500">
                  Past Events
                </h3>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {pastEvents}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-medium text-slate-500">
                  This Month Events
                </h3>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {thisMonthEvents}
                </p>
              </div>
            </div>
          </div>
        }
      />
      <Route path="create" element={<CreateEvent />} />
      <Route path="analytics" element={<Analytics />} />
      <Route
        path="events"
        element={
          <div className="py-10">
            <h1 className="text-2xl font-bold text-slate-800 text-center pb-10">
              Event
            </h1>
            <OrganizerEvent />
          </div>
        }
      />
      <Route path="events/:id" element={<OrganizerEventDetail />} />
    </Routes>
  );
};

export default OrganizerSection;
