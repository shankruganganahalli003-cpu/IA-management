import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("All fields are required");

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8080/api/auth/login", form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (data.success) {
        toast.success("User Logged In ✅");
        dispatch(setUser({ user: { role: data.role }, token: data.token }));
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 p-4">
      
      {/* Glass Card */}
      <div className="w-full max-w-md backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Welcome Back 👋
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full h-12 bg-gray-800/40 text-white border border-gray-700 rounded-lg px-4
              outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full h-12 bg-gray-800/40 text-white border border-gray-700 rounded-lg px-4
              outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-500 text-white rounded-lg font-semibold
              hover:bg-blue-600 hover:scale-[1.02] transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-400 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-400 font-semibold cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;