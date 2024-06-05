import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../services/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/LoginModal.css";
import googleLogo from "../assets/google-logo.png"; // Ensure you have a Google logo in the assets folder

const LoginModal = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setShowLogin(false);
      navigate("/dashboard");
      console.log("Google login successful");
    } catch (error) {
      setError("Error logging in with Google: " + error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email address for password reset.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError("Error sending password reset email: " + error.message);
    }
  };

  return (
    <>
      <button onClick={() => setShowLogin(true)}>Login</button>
      {showLogin && (
        <div className="login-modal">
          <div className="login-modal-content">
            <span className="close" onClick={() => setShowLogin(false)}>
              &times;
            </span>
            <form onSubmit={handleLogin} className="login-form">
              <h2>Login</h2>
              {error && <p className="error">{error}</p>}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div className="error-message">{error}</div>}
              <button type="submit">Login</button>
              <button
                type="button"
                className="google-button"
                onClick={handleGoogleLogin}
              >
                <img src={googleLogo} alt="Google logo" width="20" />
                Login with Google
              </button>
              <p className="forgot-password" onClick={handlePasswordReset}>
                Forgot Password?
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
