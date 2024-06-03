import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../services/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpModal.css";
import googleLogo from "../assets/google-logo.png"; // Ensure you have a Google logo in the assets folder

const SignUpModal = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowSignUp(false);
      navigate("/dashboard");
    } catch (error) {
      setError("Error signing up: " + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setShowSignUp(false);
      navigate("/dashboard");
    } catch (error) {
      setError("Error signing up with Google: " + error.message);
    }
  };

  return (
    <>
      <button onClick={() => setShowSignUp(true)}>Sign Up</button>
      {showSignUp && (
        <div className="signup-modal">
          <div className="signup-modal-content">
            <span className="close" onClick={() => setShowSignUp(false)}>
              &times;
            </span>
            <form onSubmit={handleSignUp} className="signup-form">
              <h2>Sign Up</h2>
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
              <button type="submit">Sign Up</button>
              <button
                type="button"
                className="google-button"
                onClick={handleGoogleSignUp}
              >
                <img src={googleLogo} alt="Google logo" width="20" />
                Sign Up with Google
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpModal;
