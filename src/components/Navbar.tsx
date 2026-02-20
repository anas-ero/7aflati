
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-dark/90 backdrop-blur-xl border-b border-slate-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl tracking-tight text-white">
            7aflati
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Discover
          </a>
          <a
            href="#events"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Schedule
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            About
          </a>
        </div>
        <div className="flex items-center gap-4 border px-4 py-2 rounded-xl bg-brand-card border-slate-700/50">
          <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <Link to="/login">Access Dashboard</Link>
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
