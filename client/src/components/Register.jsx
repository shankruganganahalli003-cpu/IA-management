import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password)
      return toast.error("All fields are required");

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:3000/api/auth/register", form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        console.log(data);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-black via-gray-900 to-gray-950 overflow-hidden relative p-4">

      {/* Floating Gradient Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Glass Card */}
      <div className="relative w-full max-w-md p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl z-10">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Create Account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-full h-11 px-4 rounded-lg bg-black/40 text-white border border-gray-700
                       placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none transition"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full h-11 px-4 rounded-lg bg-black/40 text-white border border-gray-700
                       placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full h-11 px-4 rounded-lg bg-black/40 text-white border border-gray-700
                       placeholder-gray-400 focus:ring-2 focus:ring-pink-400 outline-none transition"
          />

          {/* Role Select (Admin Only) */}
          {user?.role === "admin" && (
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-lg bg-black/40 text-white border border-gray-700
                         focus:ring-2 focus:ring-teal-400 outline-none transition"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-blue-500
                       text-white font-semibold hover:scale-[1.05] transition duration-300 "
          >
            {loading ? "Creating..." : "Register"}
          </button>

          <p className="text-center text-white text-sm mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-yellow-300 cursor-pointer hover:text-yellow-400 font-semibold"
            >
              Login
            </span>
          </p>
        </form>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes pulse-slow {
            0%,100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.5; }
          }
          .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default Register;