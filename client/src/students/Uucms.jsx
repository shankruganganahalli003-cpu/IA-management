import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UUcms = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    uucmsNo: "",
    department: "",
    semester: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { uucmsNo, department, semester } = form;
    navigate(`/student/uucms/${uucmsNo}/${department}/${semester}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-6 relative overflow-hidden">

      {/* Floating Background Blobs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-700/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl"></div>

      <form
        onSubmit={handleSubmit}
        className="bg-black/30 backdrop-blur-md rounded-3xl p-8 w-full max-w-4xl flex gap-4 shadow-2xl border border-white/20"
      >
        {/* UUCMS No */}
        <input
          type="text"
          name="uucmsNo"
          placeholder="UUCMS No"
          value={form.uucmsNo}
          onChange={handleChange}
          className="flex-1 p-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
          required
        />

        {/* Department */}
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="flex-1 p-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none transition"
          required
        />

        {/* Semester */}
        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={form.semester}
          onChange={handleChange}
          className="flex-1 p-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none transition"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-purple-400 hover:bg-purple-600 cursor-pointer text-black font-bold px-6 rounded-xl transition transform hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UUcms;