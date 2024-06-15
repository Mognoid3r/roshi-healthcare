import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../services/firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Create a context for authentication
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext); // Custom hook to use the AuthContext
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the user data
  const [loading, setLoading] = useState(true); // State to indicate loading status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Auth state changed, user is logged in:", user.uid);
        const fetchUserData = async () => {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser({ uid: user.uid, email: user.email, ...docSnap.data() });
            console.log("User data set in state:", docSnap.data());
          } else {
            setUser(user);
            console.log("User data not found in Firestore, using Auth data");
          }
        };
        await fetchUserData();
      } else {
        setUser(null);
        console.log("Auth state changed, no user is logged in");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, username) => {
    try {
      console.log("Starting signup process...");

      // Step 1: Check if the username exists
      const usernameRef = doc(db, "usernames", username);
      const usernameSnap = await getDoc(usernameRef);

      if (usernameSnap.exists()) {
        throw new Error("Username already exists.");
      }

      // Step 2: Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created in Firebase Auth:", user.uid);

      // Step 3: Add user document to Firestore
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
      console.log("User document created in Firestore");

      // Step 4: Add username to usernames collection
      await setDoc(usernameRef, {
        uid: user.uid,
      });
      console.log("Username document created in Firestore");

      // Step 5: Fetch the stored data from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser({ uid: user.uid, email: user.email, ...docSnap.data() });
        console.log("User data set in state:", docSnap.data());
      } else {
        setUser(user);
        console.log("User data not found in Firestore, using Auth data");
      }
    } catch (error) {
      console.error("Error during signup process:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user.uid);
      return userCredential;
    } catch (error) {
      console.error("Error during login process:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error during logout process:", error);
      throw error;
    }
  };

  const updateUserTheme = async (uid, theme) => {
    try {
      await setDoc(doc(db, "users", uid), { theme }, { merge: true });
      setUser((prevUser) => ({ ...prevUser, theme }));
      document.body.classList.toggle("dark-mode", theme === "dark");
      console.log("User theme updated:", theme);
    } catch (error) {
      console.error("Error updating user theme:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateUserTheme,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only when not loading */}
    </AuthContext.Provider>
  );
};
