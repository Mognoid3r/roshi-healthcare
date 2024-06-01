import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ element: Component }) => {
  const { user } = useAuth();

  return user ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
