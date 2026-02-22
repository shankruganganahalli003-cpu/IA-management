import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UploadIA = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [department, setDepartment] = useState("BCA");
  const [semester, setSemester] = useState("1");

  /* ================= STUDENT INPUT CHANGE ================= */
  const handleStudentChange = (id, field, value) => {
    setStudents((prev) =>
      prev.map((s) => (s._id === id ? { ...s, [field]: value } : s))
    );
  };

  /* ================= FILTER ================= */
  useEffect(() => {
    const filtered = students.filter(
      (s) =>
        s.department === department &&
        String(s.semester) === String(semester)
    );
    setFilteredStudents(filtered);
  }, [department, semester, students]);

  /* ================= FETCH ================= */
  const fetchStudentData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/student/getall",
        { withCredentials: true }
      );

      if (data.success) {
        const updated = data.getall.map((s) => ({
          ...s,
          IA1: "",
          IA2: "",
          IA3: "",
        }));
        setStudents(updated);
      }
    } catch {
      toast.error("Fetch Failed");
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/marks/create",
        filteredStudents,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/teacher");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload Failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-900 p-6 flex justify-center">
      <Toaster position="top-right" />

      <div className="w-full max-w-7xl bg-gray-800 rounded-2xl shadow-2xl p-8">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Upload IA Marks
        </h1>

        {/* DEPARTMENT FILTER */}
        <div className="flex justify-center gap-4 mb-5">
          {["BCA", "BBA", "BCom"].map((dep) => (
            <button
              key={dep}
              onClick={() => setDepartment(dep)}
              className={`px-6 py-2 rounded-lg font-semibold transition
                ${
                  department === dep
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
            >
              {dep}
            </button>
          ))}
        </div>

        {/* SEMESTER FILTER */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {[1, 2, 3, 4, 5, 6].map((sem) => (
            <button
              key={sem}
              onClick={() => setSemester(String(sem))}
              className={`px-4 py-2 rounded-lg transition
                ${
                  semester === String(sem)
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-center">
              <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
                <tr>
                  <th className="py-3 px-4 text-left">UUCMS No</th>
                  <th className="py-3 px-4 text-left">Student Name</th>
                  <th className="py-3 px-4">IA-1</th>
                  <th className="py-3 px-4">IA-2</th>
                  <th className="py-3 px-4">IA-3</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-gray-400">
                      No students available
                    </td>
                  </tr>
                )}

                {filteredStudents.map((s) => (
                  <tr
                    key={s._id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="py-3 px-4 text-left text-white">{s.uucmsNo}</td>
                    <td className="py-3 px-4 text-left font-medium text-white">
                      {s.name}
                    </td>

                    {["IA1", "IA2", "IA3"].map((field) => (
                      <td key={field} className="py-3">
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={s[field]}
                          onChange={(e) =>
                            handleStudentChange(
                              s._id,
                              field,
                              e.target.value
                            )
                          }
                          className="w-24 bg-gray-800 border border-gray-600 rounded-md text-center py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-2 rounded-lg font-semibold transition shadow-lg">
              Upload IA Marks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadIA;