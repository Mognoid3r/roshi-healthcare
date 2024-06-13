import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase/firebaseConfig";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/"); // Redirect to Home page after logout
  };

  return (
    <button className="nav-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
