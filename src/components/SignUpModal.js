import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../services/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import "../styles/SignUpModal.css";
import googleLogo from "../assets/google-logo.png";

const SignUpModal = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await signup(email, password, username);
      navigate("/welcome");
    } catch (error) {
      setError("Error signing up: " + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const username = user.displayName || user.email.split("@")[0];

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        theme: "light",
        friends: [],
        notifications: [],
        incomingFriendRequests: [],
        outgoingFriendRequests: [],
        programs: [],
      });

      // Ensure uid is used in the usernames collection
      await setDoc(doc(db, "usernames", username), {
        uid: user.uid,
      });

      navigate("/welcome");
    } catch (error) {
      console.error("Error signing up with Google:", error);
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
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
