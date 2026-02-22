import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token } = useSelector((state) => state.auth);

  // 1️⃣ Wait until user and token are loaded
  if (user === null || token === null) return null; // or a spinner

  // 2️⃣ Not logged in → redirect to login
  if (!token || !user) return <Navigate to="/login" replace />;

  // 3️⃣ Role not allowed → redirect to home
  if (!allowedRoles?.includes(user?.role)) return <Navigate to="/" replace />;

  // 4️⃣ Otherwise → allow access
  return <Outlet />;
};

export default ProtectedRoute;
