import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SubmittedIAmarks = () => {
  const [marks, setMarks] = useState([]);
  const navigate = useNavigate();

  // Fetch submitted IA marks
  const fetchMarks = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/marks/getall", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (data.success) {
        setMarks(data.getall || []);
       
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Failed to fetch IA marks");
    }
  };

  // Delete IA marks
  const deleteMark = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this IA mark?");
      if (!confirm) return;

      const { data } = await axios.delete(`http://localhost:3000/api/marks/delete/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (data.success) {
        fetchMarks();
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8 relative text-white">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-center mb-8">Submitted IA Marks</h1>

      <div className="max-w-6xl mx-auto bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">UU CMS No</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Semester</th>
              <th className="px-6 py-3">IA1</th>
              <th className="px-6 py-3">IA2</th>
              <th className="px-6 py-3">IA3</th>
              <th className="px-6 py-3 text-center">Update</th>
              <th className="px-6 py-3 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {marks.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-400">
                  No submitted IA marks found
                </td>
              </tr>
            )}
            {marks.map((m) => (
              <tr key={m._id} className="border-b border-gray-700 hover:bg-gray-700 transition text-white">
                <td className="px-6 py-4 font-medium">{m.name}</td>
                <td className="px-6 py-4">{m.uucmsNo}</td>
                <td className="px-6 py-4">{m.department}</td>
                <td className="px-6 py-4">{m.semester}</td>
                <td className="px-6 py-4">{m.IA1}</td>
                <td className="px-6 py-4">{m.IA2}</td>
                <td className="px-6 py-4">{m.IA3}</td>

                {/* Update Button */}
                <td className="px-6 py-4 text-center">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition"
                    onClick={() => navigate(`/teacher/updateIA/${m._id}`)}
                  >
                    Update
                  </button>
                </td>

                {/* Delete Button */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => deleteMark(m._id)}
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

      {/* Optional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-purple-800/10 via-pink-800/10 to-blue-800/10 pointer-events-none"></div>
    </div>
  );
};

export default SubmittedIAmarks;