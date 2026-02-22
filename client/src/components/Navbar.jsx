import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../redux/authSlice";

import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Hide navbar on auth pages
  if (location.pathname === "/login" || location.pathname === "/register") return null;

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="w-full h-20 bg-gradient-to-r from-purple-600 via-indigo-700 to-pink-600 flex items-center justify-between px-8 shadow-xl backdrop-blur-md rounded-b-2xl z-50 relative">

      {/* Left: Role Info */}
      <div className="flex items-center gap-3 text-white">
        <FaUserCircle className="text-3xl" />
        <div className="flex flex-col">
          <span className="text-sm opacity-80">Logged in as</span>
          <span className="text-lg font-semibold">{user?.role || "Guest"}</span>
        </div>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-white text-purple-700 px-6 py-2 rounded-lg font-medium shadow-lg hover:scale-105 hover:bg-gray-100 transition duration-300"
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;