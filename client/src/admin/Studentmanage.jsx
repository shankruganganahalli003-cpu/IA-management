import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaUserPlus } from 'react-icons/fa';

const StudentManage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Get All Students",
      desc: "Manage students",
      icon: <FaUserGraduate className="text-5xl text-purple-500 mb-3" />,
      path: "/admin/getstudents",
    },
    {
      title: "Create Students",
      desc: "Create students by Admin",
      icon: <FaUserPlus className="text-5xl text-pink-500 mb-3" />,
      path: "/admin/students/create",
    },
  ];

  return (
    <div className="w-full min-h-screen relative flex flex-wrap justify-center items-center gap-10 p-6 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">

      {/* Floating Blobs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-700/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-700/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>

      {/* Cards */}
      {cards.map((card) => (
        <div
          key={card.title}
          onClick={() => navigate(card.path)}
          className="relative w-80 h-64 cursor-pointer rounded-3xl flex flex-col items-center justify-center
            bg-gray-900 shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
            transform transition-all duration-500 hover:scale-105 border border-gray-700 overflow-hidden group z-10"
        >
          {card.icon}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 relative z-10">{card.title}</h1>
          <p className="text-gray-400 text-center text-sm px-4 relative z-10">{card.desc}</p>

          {/* Neon Hover Glow */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 transition-opacity duration-500"></div>
        </div>
      ))}

 
    </div>
  );
};

export default StudentManage;