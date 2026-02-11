import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import DashboardLayout from "../pages/DashboardLayout"
import UserSection from "../pages/UserSection"
import OrganizerSection from "../pages/OrganizerSection"
import AdminSection from "../pages/AdminSection"

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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
      setLoading(false)
    }

    loadRole()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <DashboardLayout role={role}>
      {role === "admin" && <AdminSection />}
      {role === "organizer" && <OrganizerSection />}
      {role === "user" && <UserSection />}
    </DashboardLayout>
  )
}
