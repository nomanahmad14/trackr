import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClass = (path) =>
    `text-sm font-medium transition px-1 ${
      location.pathname === path
        ? "text-blue-600"
        : "text-slate-600 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="container-custom h-16 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-10">
          <Link to="/dashboard" className="text-xl font-semibold text-slate-900 tracking-tight">
            Trackr
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className={navLinkClass("/dashboard")}>
              Dashboard
            </Link>
            <Link to="/applications" className={navLinkClass("/applications")}>
              Applications
            </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link to="/applications/new" className="btn-primary text-sm">
            + Add Application
          </Link>

          <div className="hidden sm:flex items-center px-3 py-2 rounded-lg bg-slate-100 text-sm text-slate-700">
            {user?.name || "User"}
          </div>

          <button onClick={handleLogout} className="btn-secondary text-sm">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;