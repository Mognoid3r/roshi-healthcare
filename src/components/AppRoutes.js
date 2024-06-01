import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Programs from "../pages/Programs";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Show a loading indicator while determining the auth state

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/" />}
      />
      <Route
        path="/programs"
        element={user ? <Programs /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
