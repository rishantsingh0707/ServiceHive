import { useEffect, useState } from "react";
import api from "../../api/axios";

const statusStyles = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-600",
  accepted: "bg-green-500/20 text-green-400 border-green-600",
  rejected: "bg-red-500/20 text-red-400 border-red-600"
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const res = await api.get("/api/applications/my");
      setApplications(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to load applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-10 pt-24">
      <h1 className="text-2xl font-semibold text-white mb-6">
        My Applications
      </h1>

      {error && (
        <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-900 p-3 rounded-lg">
          {error}
        </div>
      )}

      {applications.length === 0 && (
        <p className="text-neutral-400">
          You haven’t applied to any gigs yet.
        </p>
      )}

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex justify-between items-center"
          >
            <div>
              <h3 className="text-white font-medium">
                {app.gigId?.title || "Gig"}
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                Application status
              </p>
            </div>

            <span
              className={`px-3 py-1 text-xs border rounded-full ${statusStyles[app.status]}`}
            >
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
