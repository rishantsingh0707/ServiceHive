import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Hooks MUST be before any conditional return
  const [search, setSearch] = useState("");

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
      <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 items-center">

        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-white font-semibold text-lg">
            GigFlow
          </Link>
        </div>

        {/* Center: Search (freelancer only) */}
        <div className="flex justify-center">
          {auth.role === "freelancer" && (
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search.trim()) {
                  navigate(`/gigs?search=${encodeURIComponent(search)}`);
                }
              }}
              placeholder="Search gigs..."
              className="w-64 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm placeholder-neutral-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          )}
        </div>

        {/* Right: Links + Logout */}
        <div className="flex items-center justify-end gap-6 text-sm">
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
