// import React, { createContext, useContext, useState, useEffect } from "react";
// import { auth } from "../services/firebase/firebaseConfig";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";

// // Create a context for authentication
// const AuthContext = createContext();

// // Create a custom hook to use the AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// // AuthProvider component to provide authentication state to its children
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Function to sign up a user
//   const signup = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   // Function to log in a user
//   const login = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   // Function to log out a user
//   const logout = () => {
//     return signOut(auth);
//   };

//   // Set the current user when the authentication state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     // Clean up the subscription on unmount
//     return unsubscribe;
//   }, []);

//   // Value to be provided to the AuthContext
//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// *****************************

// import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { auth, db } from "../services/firebase/firebaseConfig";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Add a loading state

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user || null);
//       setLoading(false); // Set loading to false once the auth state is determined
//     });

//     return () => unsubscribe();
//   }, []);

//   const login = async (email, password) => {
//     await signInWithEmailAndPassword(auth, email, password);
//   };

//   const signup = async (email, password) => {
//     await createUserWithEmailAndPassword(auth, email, password);
//   };

//   const logout = async () => {
//     await signOut(auth);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// ****************************

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
        const fetchUserData = async () => {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser({ uid: user.uid, email: user.email, ...docSnap.data() });
          } else {
            setUser(user);
          }
        };
        await fetchUserData(); // Await the fetch function
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, username) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      username: username,
      theme: "light", // Set default theme to light
    });

    // Fetch the stored data from Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser({ uid: user.uid, email: user.email, ...docSnap.data() });
    } else {
      setUser(user);
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
  };

  const logout = () => {
    return signOut(auth); // Sign out the current user
  };

  const updateUserTheme = async (uid, theme) => {
    await setDoc(doc(db, "users", uid), { theme }, { merge: true });
    setUser((prevUser) => ({ ...prevUser, theme }));
    document.body.classList.toggle("dark-mode", theme === "dark");
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
