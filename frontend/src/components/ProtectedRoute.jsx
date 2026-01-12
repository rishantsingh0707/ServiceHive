import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role }) => {
  const { auth, loading } = useAuth();

  if (loading) return null;

  if (!auth) return <Navigate to="/login" />;

  if (role && auth.role !== role) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
