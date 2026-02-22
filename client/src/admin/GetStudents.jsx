import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GetStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/student/getall", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (data.success) {
        setStudents(data.getall || []);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch students");
    }
  };

  const deleteStudent = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this student?");
      if (!confirm) return;

      const { data } = await axios.delete(`http://localhost:3000/api/student/delete/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        fetchStudents();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 p-6 relative">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-center text-white mb-6">Students List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-6 py-3 text-left">UUCM No</th>
              <th className="px-6 py-3 text-left">Semester</th>
              <th className="px-6 py-3 text-center">Update</th>
              <th className="px-6 py-3 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No students found
                </td>
              </tr>
            )}
            {students.map((s) => (
              <tr
                key={s._id}
                className="bg-gray-800 hover:bg-gray-700 transition-all duration-300"
              >
                <td className="px-6 py-4 text-white">{s.name}</td>
                <td className="px-6 py-4 text-white">{s.department}</td>
                <td className="px-6 py-4 text-white">{s.uucmsNo}</td>
                <td className="px-6 py-4 text-white">{s.semester}</td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => navigate(`/admin/updatestudent/${s._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition duration-300"
                  >
                    Update
                  </button>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => deleteStudent(s._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optional gradient overlay for modern look */}
      <div className="absolute inset-0 bg-gradient-to-tl from-purple-800/10 via-pink-800/10 to-blue-800/10 pointer-events-none"></div>
    </div>
  );
};

export default GetStudents;