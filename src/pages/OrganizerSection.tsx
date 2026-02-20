
import { Routes, Route } from "react-router-dom";
import CreateEvent from "./CreateEvent";
import OrganizerEvent from "./OrganizerEvent";
import OrganizerEventDetail from "./OrganizerEventDetail";

const OrganizerSection = () => {
  return (
    <Routes>
      <Route path="/" element={
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Organizer Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Summary Cards */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500">Total Events</h3>
              <p className="text-3xl font-bold text-slate-900 mt-2"></p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500">Total Sales</h3>
              <p className="text-3xl font-bold text-slate-900 mt-2"></p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500">Upcoming</h3>
              <p className="text-3xl font-bold text-slate-900 mt-2"></p>
            </div>
          </div>
        </div>
      } />
      <Route path="create" element={<CreateEvent />} />
      <Route path="analytics" element={
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-slate-600">Analytics Coming Soon</h2>
        </div>
      } />
      <Route path="events" element={
        <div className="py-10">
          <h1 className="text-2xl font-bold text-slate-800 text-center pb-10">Event</h1>
          <OrganizerEvent />
        </div>
      } />
      <Route path="events/:id" element={<OrganizerEventDetail />} />
    </Routes>
  );
};

export default OrganizerSection;
