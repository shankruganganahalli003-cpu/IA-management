import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AllTeachers = () => {
  const navigate = useNavigate();
  const [teachers, setteachers] = useState([]);

  const fetchteachers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/teacher/getall", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (data.success) {
        setteachers(data.getall);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data?.message || "Failed to fetch teachers");
    }
  };

  const deleteteachers = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this teacher?");
      if (!confirm) return;

      const { data } = await axios.delete(`http://localhost:3000/api/teacher/delete/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        fetchteachers();
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchteachers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8">All Teachers</h1>

      {/* Table Container */}
      <div className="max-w-6xl mx-auto bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          {/* Header */}
          <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Semester</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3 text-center">Update</th>
              <th className="px-6 py-3 text-center">Delete</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {teachers.map((t) => (
              <tr key={t._id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                <td className="px-6 py-4 font-medium">{t.name}</td>
                <td className="px-6 py-4">{t.department}</td>
                <td className="px-6 py-4">{t.semester}</td>
                <td className="px-6 py-4">{t.subject}</td>

                {/* Update */}
                <td className="px-6 py-4 text-center">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition"
                    onClick={() => navigate(`/admin/updateteachers/${t._id}`)}
                  >
                    Update
                  </button>
                </td>

                {/* Delete */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => deleteteachers(t._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTeachers;