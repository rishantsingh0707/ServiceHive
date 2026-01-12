import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(form);

      const auth = JSON.parse(localStorage.getItem("auth"));
      if (auth.role === "client") {
        navigate("/client/gigs");
      } else {
        navigate("/gigs");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 pt-24">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-1">
          Create your account
        </h2>
        <p className="text-sm text-neutral-400 mb-6">
          Join GigFlow in seconds
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-900 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <div>
            <label className="block text-sm text-neutral-400 mb-2">
              I am a
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "freelancer" })}
                className={`flex-1 py-2 rounded-lg border text-sm ${form.role === "freelancer"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500"
                  }`}
              >
                Freelancer
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, role: "client" })}
                className={`flex-1 py-2 rounded-lg border text-sm ${form.role === "client"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500"
                  }`}
              >
                Client
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
          <p className="text-sm text-center text-neutral-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Register;
