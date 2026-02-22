import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Updateteachers = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Initialize all form fields to empty strings
  const [form, setForm] = useState({
    name: "",
    department: "",
    semester: "",
    subject: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value ?? "" })); // safe controlled
  };

  const fetchteachers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/teacher/getme/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (data.success) {
        setForm({
          name: data.finddata.name || "",
          department: data.finddata.department || "",
          semester: data.finddata.semester || "",
          subject: data.finddata.subject || "",
        });
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err?.response?.data?.message || "Failed to fetch teacher data");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/teacher/update/${id}`,
        form,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (data.success) {
        toast.success("Teacher Updated Successfully");
        navigate("/admin/teacher/getall");
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    fetchteachers();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden
                    bg-gradient-to-br from-black via-gray-900 to-gray-950 p-4">

      {/* Floating Gradient Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-700/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse-fast"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-green-400/20 rounded-full blur-3xl animate-pulse-fast"></div>

      {/* Glass Form Card */}
      <form
        onSubmit={handlesubmit}
        className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-lg border border-white/10
                   rounded-3xl shadow-2xl flex flex-col gap-4"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Update Teacher</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handlechange}
          placeholder="Name"
          className="w-full h-12 px-4 rounded-lg bg-black/40 text-white border border-gray-700
                     placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition"
          required
        />
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handlechange}
          placeholder="Department"
          className="w-full h-12 px-4 rounded-lg bg-black/40 text-white border border-gray-700
                     placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition"
          required
        />
        <input
          type="text"
          name="semester"
          value={form.semester}
          onChange={handlechange}
          placeholder="Semester"
          className="w-full h-12 px-4 rounded-lg bg-black/40 text-white border border-gray-700
                     placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition"
          required
        />
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handlechange}
          placeholder="Subject"
          className="w-full h-12 px-4 rounded-lg bg-black/40 text-white border border-gray-700
                     placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition"
          required
        />

        <button
          type="submit"
          className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500
                     text-white font-semibold hover:scale-[1.05] transition duration-300 shadow-lg shadow-purple-600/40"
        >
          Update Teacher
        </button>
      </form>

      {/* Animations */}
      <style>
        {`
          @keyframes pulse-slow {
            0%,100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.5; }
          }
          @keyframes pulse-fast {
            0%,100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.1); opacity: 0.4; }
          }
          .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
          .animate-pulse-fast { animation: pulse-fast 5s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default Updateteachers;