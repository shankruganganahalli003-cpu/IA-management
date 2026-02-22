import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Mymarks = () => {
  const { uucmsNo, department, semester } = useParams();
  const [marks, setMarks] = useState([]);

  // Fetch Marks
  const fetchMarks = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/marks/getme/${uucmsNo}/${department}/${semester}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setMarks(data.getmymarks);
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to fetch marks");
    }
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  const calculateTotal = (m) => Number(m.IA1) + Number(m.IA2) + Number(m.IA3);

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-start p-6">
      <div className="w-full max-w-4xl bg-gray-800 shadow-xl rounded-xl p-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          My Internal Assessment Marks
        </h1>

        {/* INFO CARDS */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-blue-800 p-3 rounded-lg">
            <p className="text-blue-100 text-sm">UUCMS No</p>
            <p className="font-semibold text-white">{uucmsNo}</p>
          </div>
          <div className="bg-green-800 p-3 rounded-lg">
            <p className="text-green-100 text-sm">Department</p>
            <p className="font-semibold text-white">{department}</p>
          </div>
          <div className="bg-purple-800 p-3 rounded-lg">
            <p className="text-purple-100 text-sm">Semester</p>
            <p className="font-semibold text-white">{semester}</p>
          </div>
        </div>

        {/* MARKS TABLE */}
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="p-3 text-left">IA-1</th>
                <th className="p-3 text-left">IA-2</th>
                <th className="p-3 text-left">IA-3</th>
                <th className="p-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {marks.length > 0 ? (
                marks.map((m) => (
                  <tr
                    key={m._id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-4 font-semibold text-blue-400">{m.IA1}</td>
                    <td className="p-4 font-semibold text-green-400">{m.IA2}</td>
                    <td className="p-4 font-semibold text-pink-400">{m.IA3}</td>
                    <td className="p-4 font-bold text-yellow-400">
                      {calculateTotal(m)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-400">
                    Marks are not uploaded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Mymarks;