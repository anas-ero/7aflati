import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { supabase } from "@/lib/supabase";
import NavItem from "../components/NavItem";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"

export default function DashboardLayout({
  role,
  children,
}: {
  role: string | null;
  children: React.ReactNode;
}) {
  return (


    <div className="flex min-h-screen bg-[#f8fafc] text-slate-800 antialiased">

      {/*Sidebar*/}
      <aside className="w-72 flex flex-col p-6 bg-white border-r border-slate-200 shadow-sm">

        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-linear-to-tr from-indigo-500 to-cyan-400 shadow-md" />
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              7aflati
            </h2>
          </div>
          <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-indigo-500">
            {role} portal
          </p>
        </div>

        <NavigationMenu.Root orientation="vertical" className="flex-1">
          <NavigationMenu.List className="space-y-2 list-none">

            <NavigationMenu.Item>
              <NavItem label="Overview" to="/dashboard" />
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavItem label="My Events" to="/dashboard/events" />
            </NavigationMenu.Item>

            {role === "user" && <NavigationMenu.Item>
              <NavItem label="Saved Events" to="/dashboard/saved" />
            </NavigationMenu.Item>}

            {role === "organizer" && (
              <div className="mt-10 space-y-2">
                <p className="text-[11px] uppercase tracking-widest text-slate-400 px-2">
                  Management
                </p>
                <NavigationMenu.Item>
                  <NavItem label="Create Event" to="/dashboard/create" />
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavItem label="Analytics" to="/dashboard/analytics" />
                </NavigationMenu.Item>
              </div>
            )}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="pt-6 mt-6 border-t border-slate-200 text-[11px] text-slate-400">
          PRO PLAN • © 2026
        </div>
      </aside>

      {/* ===== Main Area ===== */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-16 px-10 flex items-center justify-between bg-white border-b border-slate-200">

          <h1 className="text-sm font-semibold text-slate-700">
            Dashboard
          </h1>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-900"></p>

            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>OR</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheckIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BellIcon />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = '/login';
                }}>
                  <LogOutIcon color="red" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-10 bg-[#f1f5f9]">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-10">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}