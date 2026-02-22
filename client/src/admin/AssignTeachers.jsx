import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AssignTeachers = () => {
  const [teachers, setteachers] = useState([]);
  const [form, setform] = useState({ department: "", semester: "", name: "", subject: "" });
  const semester = [1, 2, 3, 4, 5, 6];

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/teacher/create", form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        console.log(data);
        setform({ department: "", semester: "", name: "", subject: "" });
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Failed to assign teacher");
    }
  };

  const fetchteachers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/teacher/get", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (data.success) {
        setteachers(data.teachers);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Failed to fetch teachers");
    }
  };

  React.useEffect(() => {
    fetchteachers();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <form
        onSubmit={handlesubmit}
        className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-4">Assign Teacher</h2>

        {/* Teacher Select */}
        <select
          name="name"
          value={form.name}
          onChange={handlechange}
          className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t._id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Department Select */}
        <select
          name="department"
          value={form.department}
          onChange={handlechange}
          className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="">Select Department</option>
          <option value="BCA">BCA</option>
          <option value="BBA">BBA</option>
          <option value="BCOM">BCom</option>
        </select>

        {/* Subject Input */}
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handlechange}
          placeholder="Subject"
          className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        {/* Semester Radio */}
        <div className="flex flex-wrap gap-4">
          {semester.map((s) => (
            <label key={s} className="flex items-center gap-2 text-white">
              <input
                type="radio"
                name="semester"
                value={s}
                checked={form.semester == s}
                onChange={handlechange}
                className="accent-purple-500"
                required
              />
              {s}
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition"
        >
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignTeachers;