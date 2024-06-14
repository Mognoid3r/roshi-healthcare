// Version 1: Works perfectly, missing page link set up for SideBar navigation

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Programs from "../pages/Programs";
import NotFound from "../pages/NotFound";
import Welcome from "../pages/Welcome";
import Community from "../pages/Community";
import PublicProfile from "../pages/PublicProfile"; // Import PublicProfile

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Show a loading indicator while determining the auth state

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/home"
        element={user ? <Navigate to="/dashboard" /> : <Home />}
      />
      <Route
        path="/welcome"
        element={user ? <Welcome /> : <Navigate to="/" />}
      />

      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/home" />}
      />

      <Route
        path="/community"
        element={user ? <Community /> : <Navigate to="/community" />}
      />
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/home" />}
      />
      <Route
        path="/programs"
        element={user ? <Programs /> : <Navigate to="/home" />}
      />
      <Route path="/profile/:username" element={<PublicProfile />} />
      {/* Public profile route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

// Version 1: Works perfectly, missing page link set up for SideBar navigation
