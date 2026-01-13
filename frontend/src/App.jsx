import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BrowseGigs from "./pages/freelancer/BrowseGigs";
import ClientDashboard from "./pages/client/ClientDashboard";
import MyGigs from "./pages/client/MyGigs";
import MyApplications from "./pages/freelancer/MyApplications";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import RootRedirect from "./components/RootRedirect";

function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        {/* Default */}
        <Route path="/" element={<RootRedirect />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Freelancer */}
        <Route element={<ProtectedRoute role="freelancer" />}>
          <Route path="/gigs" element={<BrowseGigs />} />
          <Route path="/freelancer/applications" element={<MyApplications />} />
        </Route>

        {/* Client */}
        <Route element={<ProtectedRoute role="client" />}>
          <Route path="/client/gigs" element={<MyGigs />} />
          <Route path="/client/create" element={<ClientDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
