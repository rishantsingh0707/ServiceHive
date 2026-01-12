import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const BrowseGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [proposal, setProposal] = useState("");
  const [selectedGig, setSelectedGig] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchGigs = async () => {
    try {
      const res = await api.get("/api/gigs");
      setGigs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to load gigs");
    }
  };

  const applyToGig = async (gigId) => {
    setMessage("");
    setError("");

    try {
      await api.post("/api/applications", {
        gigId,
        proposal
      });

      setMessage("Applied successfully");
      setProposal("");
      setSelectedGig(null);

      // Redirect back to stable page
      navigate("/gigs");
    } catch (err) {
      setError(err.response?.data?.message || "Apply failed");
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-10 pt-24">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Browse Gigs
      </h1>

      {message && (
        <div className="mb-4 text-sm text-green-400 bg-green-950/40 border border-green-900 p-3 rounded-lg">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-900 p-3 rounded-lg">
          {error}
        </div>
      )}

      {gigs.length === 0 && (
        <p className="text-neutral-400">No gigs available right now.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {gigs.map((gig) => (
          <div
            key={gig._id}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5"
          >
            <h3 className="text-lg font-medium text-white">
              {gig.title}
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              {gig.description}
            </p>
            <p className="text-sm text-neutral-300 mt-2">
              Budget: ₹{gig.budget}
            </p>

            <button
              onClick={() => setSelectedGig(gig._id)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Apply
            </button>

            {selectedGig === gig._id && (
              <div className="mt-4 space-y-2">
                <textarea
                  placeholder="Write your proposal..."
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  onClick={() => applyToGig(gig._id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
                >
                  Submit Proposal
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseGigs;
