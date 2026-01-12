import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Hide navbar on auth pages
  if (!auth || location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-white font-semibold text-lg">
          GigFlow
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm">
          {auth.role === "freelancer" && (
            <>
              <Link
                to="/gigs"
                className="text-neutral-300 hover:text-white transition"
              >
                Browse Gigs
              </Link>
              <Link
                to="/freelancer/applications"
                className="text-neutral-300 hover:text-white transition"
              >
                My Applications
              </Link>
            </>
          )}

          {auth.role === "client" && (
            <>
              <Link
                to="/client/gigs"
                className="text-neutral-300 hover:text-white transition"
              >
                My Gigs
              </Link>
              <Link
                to="/client/create"
                className="text-neutral-300 hover:text-white transition"
              >
                Create Gig
              </Link>
            </>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
