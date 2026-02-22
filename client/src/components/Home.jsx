import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Home = () => {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login", { replace: true });
  }, [token, navigate]);

  if (!token) return null;

  const handleGetStarted = () => {
    if (!user?.role) return toast.error("User role not found");

    switch (user.role) {
      case "admin":
        navigate("/admin");
        break;
      case "teacher":
        navigate("/teacher");
        break;
      case "student":
        navigate("/student");
        break;
      default:
        toast.error("Role not recognized");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center
                    bg-gradient-to-br from-black via-gray-900 to-gray-950 overflow-hidden relative">

      {/* Floating Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Glass Card */}
      <div className="relative w-96 p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl z-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Welcome</h1>
        <p className="text-gray-300 text-center mb-6">
          Click below to continue to your dashboard
        </p>
        <button
          onClick={handleGetStarted}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500
                     text-white font-semibold hover:scale-[1.05] transition transform shadow-lg shadow-purple-600/30"
        >
          Get Started
        </button>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes pulse-slow {
            0%,100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.5; }
          }
          .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default Home;