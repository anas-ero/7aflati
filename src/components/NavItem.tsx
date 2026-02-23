import { NavLink } from "react-router-dom";

export default function NavItem({
  label,
  to,
  end,
}: {
  label: string;
  to: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `
        block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
        ${isActive
          ? "bg-indigo-50 text-indigo-600 shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }
        `
      }
    >
      {label}
    </NavLink>
  );
}