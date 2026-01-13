import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RootRedirect = () => {
  const { auth, loading } = useAuth();

  if (loading) return null;

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  if (auth.role === "client") {
    return <Navigate to="/client/gigs" replace />;
  }

  if (auth.role === "freelancer") {
    return <Navigate to="/gigs" replace />;
  }
  
  return <Navigate to="/login" replace />;
  
};

export default RootRedirect;
