import { useEffect, useState } from "react";
import api from "../../api/axios";

const statusStyles = {
  open: "bg-blue-500/20 text-blue-400 border-blue-600",
  "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-600",
  completed: "bg-green-500/20 text-green-400 border-green-600"
};

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  const fetchGigs = async () => {
    try {
      const res = await api.get("/api/gigs/my-gigs");
      setGigs(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to load gigs");
    }
  };

  const fetchApplications = async (gigId) => {
    try {
      const res = await api.get(`/api/applications/gig/${gigId}`);
      setApplications(Array.isArray(res.data) ? res.data : []);
      setSelectedGig(gigId);
    } catch {
      setError("Failed to load applications");
    }
  };

  const hireFreelancer = async (applicationId) => {
    await api.post(`/api/applications/hire/${applicationId}`);
    await fetchGigs();
    await fetchApplications(selectedGig);
  };

  const completeGig = async (gigId) => {
    await api.post(`/api/gigs/${gigId}/complete`);
    fetchGigs();
    setApplications([]);
    setSelectedGig(null);
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-10 pt-24">
      <h1 className="text-2xl font-semibold text-white mb-6">
        My Gigs
      </h1>

      {error && (
        <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-900 p-3 rounded-lg">
          {error}
        </div>
      )}

      {gigs.length === 0 && (
        <p className="text-neutral-400">
          You haven’t created any gigs yet.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {gigs.map((gig) => (
          <div
            key={gig._id}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-medium">
                  {gig.title}
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  {gig.description}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-xs border rounded-full ${statusStyles[gig.status]}`}
              >
                {gig.status}
              </span>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => fetchApplications(gig._id)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                View Applications
              </button>

              {gig.status === "in-progress" && (
                <button
                  onClick={() => completeGig(gig._id)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {applications.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white mb-4">
            Applications
          </h2>

          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex justify-between items-center"
              >
                <div>
                  <p className="text-white font-medium">
                    {app.freelancerId?.name}
                  </p>
                  <p className="text-sm text-neutral-400 mt-1">
                    {app.proposal}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-neutral-400">
                    {app.status}
                  </span>

                  {app.status === "pending" && (
                    <button
                      onClick={() => hireFreelancer(app._id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                    >
                      Hire
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGigs;
