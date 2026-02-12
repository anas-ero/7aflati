import NavItem from "../components/NavItem"
import SectionDivider from "../components/SectionDivider"
export default function DashboardLayout({
  role,
  children,
}: {
  role: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col">
        {/* Logo / Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight">7aflati</h2>
          <p className="text-xs text-slate-400 mt-1 capitalize">
            {role} dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          <NavItem label="Overview" to="/dashboard" />
          <NavItem label="My Events" to="/dashboard/events" />
          <NavItem label="Saved Events" to="/dashboard/saved" />

          {role === "organizer" && (
            <>
              <SectionDivider label="Organizer" />
              <NavItem label="Create Event" to="/dashboard/create" />
              <NavItem label="Analytics" to="/dashboard/analytics" />
            </>
          )}

          {role === "admin" && (
            <>
              <SectionDivider label="Admin" />
              <NavItem label="Platform Stats" to="/dashboard/stats" />
              <NavItem label="Approve Organizers" to="/dashboard/approve" />
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="pt-6 border-t border-white/10 text-xs text-slate-400">
          © {new Date().getFullYear()} 7aflati
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-20 px-10 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <h1 className="text-xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400 capitalize">{role}</div>

            <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center font-bold">
              U
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
