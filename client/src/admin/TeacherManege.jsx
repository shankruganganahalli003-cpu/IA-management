import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUsers, FaClipboardCheck } from "react-icons/fa";

const TeacherManage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Create Teacher",
      desc: "Create Teacher Account",
      icon: <FaUserPlus className="text-5xl text-purple-400 mb-3" />,
      path: "/register",
    },
    {
      title: "Get All Teachers",
      desc: "Read, Update, Delete Teachers",
      icon: <FaUsers className="text-5xl text-pink-400 mb-3" />,
      path: "/admin/teacher/getall",
    },
    {
      title: "Assign Teacher",
      desc: "Assign Teachers to Subjects",
      icon: <FaClipboardCheck className="text-5xl text-green-400 mb-3" />,
      path: "/admin/teacher/assign",
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


        </div>
      ))}

      {/* Animations */}
      <style>
        {`
          @keyframes bounce-slow {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default TeacherManage;