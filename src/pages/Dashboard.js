import React from "react";
import { useAuth } from "../hooks/useAuth";
import AppLayout from "../components/AppLayout";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <AppLayout />
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.email}</p>}
    </div>
  );
};

export default Dashboard;
