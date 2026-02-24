import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import DashboardLayout from "../layout/DashboardLayout"
import UserSection from "../pages/UserSection"
import OrganizerSection from "../pages/OrganizerSection"
import AdminSection from "../pages/AdminSection"

import { Routes, Route } from "react-router-dom"
import Account from "./Account"

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    async function loadRole() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) return

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single()

      setRole(data?.role || "user")
    }

    loadRole()
  }, [])

  return (
    <DashboardLayout role={role}>
      <Routes>
        <Route path="/account" element={<Account />} />
        <Route path="/*" element={
          <>
            {role === "admin" && <AdminSection />}
            {role === "organizer" && <OrganizerSection />}
            {role === "user" && <UserSection />}
          </>
        } />
      </Routes>
    </DashboardLayout>
  )
}
