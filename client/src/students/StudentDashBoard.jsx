import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaFileInvoice, FaClipboardList } from 'react-icons/fa';

const StudentDashBoard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const cards = [
    {
      title: "IA Marks",
      desc: "View your internal assessment marks",
      icon: <FaFileInvoice className="text-5xl text-purple-400 mb-3" />,
      path: `/student/uucms`
    },
  
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex flex-wrap justify-center items-center gap-10 p-6 relative overflow-hidden">

      {/* Floating Background Blobs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-700/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-600/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Cards */}
      {cards.map((card) => (
        <div
          key={card.title}
          onClick={() => navigate(card.path)}
          className="relative w-100 h-64 cursor-pointer rounded-3xl flex flex-col items-center justify-center
                     bg-gray-900 shadow-2xl hover:shadow-[0_0_40px_rgba(255,0,255,0.5)]
                     transform transition-all duration-300 hover:scale-105 border border-gray-700 overflow-hidden group"
        >
          {card.icon}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{card.title}</h1>
          <p className="text-purple-300 text-center text-sm px-4">{card.desc}</p>

          {/* Subtle Hover Glow */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 transition-opacity duration-500"></div>
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
}

export default StudentDashBoard;