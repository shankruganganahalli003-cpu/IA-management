import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const AdminDashBoard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Teachers",
      desc: "Manage Teachers",
      icon: <FaChalkboardTeacher className="text-5xl text-purple-500 mb-3" />,
      path: "/admin/teacher",
    },
    {
      title: "Students",
      desc: "Manage Students",
      icon: <FaUserGraduate className="text-5xl text-pink-500 mb-3" />,
      path: "/admin/students",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex flex-wrap justify-center items-center gap-10 p-6 relative overflow-hidden">

      {/* Floating Background Blobs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-700/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>

      {/* Cards */}
      {cards.map((card) => (
        <div
          key={card.title}
          onClick={() => navigate(card.path)}
          className="relative w-90 h-64 cursor-pointer rounded-3xl flex flex-col items-center justify-center
            bg-gray-900 shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
            transform transition-all duration-300 hover:scale-105 border border-gray-700 overflow-hidden group"
        >
          {card.icon}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{card.title}</h1>
          <p className="text-gray-400 text-center text-sm px-4">{card.desc}</p>

          {/* Subtle Hover Glow */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 bg-white/10 transition-opacity duration-500"></div>
        </div>
      ))}

      {/* Animations */}
      <style>
        {`
          @keyframes pulse-slow {
            0%,100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.5; }
          }
          .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default AdminDashBoard;