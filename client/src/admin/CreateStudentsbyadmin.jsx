import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserGraduate } from 'react-icons/fa';

const CreateStudentsbyadmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ uucmsNo: "", department: "", semester: "", name: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/student/create",
        form,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      if (data.success) {
        toast.success(data.message);
        setForm({ uucmsNo: "", department: "", semester: "", name: "" });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-6">
      
      {/* Form Container */}
      <div className="relative w-full max-w-5xl bg-gray-900 backdrop-blur-md rounded-3xl shadow-xl border border-gray-700 p-10 z-10 hover:shadow-2xl transition-shadow duration-500">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <FaUserGraduate className="text-7xl text-purple-400 mb-4 animate-bounce-slow" />
          <h1 className="text-4xl font-bold text-white text-center">Create Student</h1>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col md:flex-row flex-wrap gap-5 items-center justify-between w-full"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="flex-1 min-w-[180px] h-12 px-5 rounded-xl bg-gray-800/40 text-white border border-gray-600 placeholder-gray-400
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm hover:shadow-md"
          />
          
          <input
            type="text"
            name="uucmsNo"
            value={form.uucmsNo}
            onChange={handleChange}
            placeholder="UUCMS NO"
            className="flex-1 min-w-[180px] h-12 px-5 rounded-xl bg-gray-800/40 text-white border border-gray-600 placeholder-gray-400
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm hover:shadow-md"
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="flex-1 min-w-[180px] h-12 px-5 rounded-xl bg-gray-800/40 text-white border border-gray-600 placeholder-gray-400
                       focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <option value="">Select Course</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="BCOM">BCOM</option>
          </select>

          <select
            name="semester"
            value={form.semester}
            onChange={handleChange}
            className="flex-1 min-w-[120px] h-12 px-5 rounded-xl bg-gray-800/40 text-white border border-gray-600 placeholder-gray-400
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <option value="">Select Semester</option>
            {[1,2,3,4,5,6].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <button
            type="submit"
            className="h-12 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500
                       text-white font-semibold hover:scale-105 hover:shadow-xl transition transform duration-300 px-8"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-purple-800/10 via-pink-800/10 to-blue-800/10 pointer-events-none"></div>
    </div>
  );
};

export default CreateStudentsbyadmin;