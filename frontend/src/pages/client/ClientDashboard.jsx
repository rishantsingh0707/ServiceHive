import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ClientDashboard = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await api.post("/api/gigs", form);
      setMessage("Gig created successfully");

      // Redirect to My Gigs after success
      navigate("/client/gigs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-10 pt-24">
      <div className="max-w-xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-white mb-1">
          Create a Gig
        </h1>
        <p className="text-sm text-neutral-400 mb-6">
          Post a new job and hire freelancers
        </p>

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Gig title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <textarea
            name="description"
            placeholder="Describe the work clearly"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <input
            name="budget"
            type="number"
            placeholder="Budget (₹)"
            value={form.budget}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <input
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Gig"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientDashboard;
