import { NavLink } from "react-router-dom"
export default function NavItem({ label, to }: { label: string; to: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
          isActive
            ? "bg-brand-accent text-black shadow-lg shadow-brand-accent/30"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      {label}
    </NavLink>
  )
}
