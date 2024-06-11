// src/components/Profile.js
import React from "react";
// import ExerciseTable from "../components/ExerciseTable";
import { useAuth } from "../hooks/useAuth";
import DarkModeToggle from "../components/DarkModeToggle";
import AppLayout from "../components/AppLayout";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <AppLayout />
      <h2>Profile Page</h2>
      <DarkModeToggle />
      <div className="profile-page">
        <h2>Profile</h2>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
      </div>
      {/* <ExerciseTable /> */}
    </div>
  );
};

export default Profile;
