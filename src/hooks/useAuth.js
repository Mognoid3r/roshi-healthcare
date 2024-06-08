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
        await fetchUserData(); // Await the fetch function
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created in Firebase Auth:", user.uid);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        theme: "light", // Set default theme to light
        friends: [], // Ensure the friends field is added
      });
      console.log("User document created in Firestore");

      // Fetch the stored data from Firestore
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

// ****************************

// import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { auth, db } from "../services/firebase/firebaseConfig";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// // Create a context for authentication
// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext); // Custom hook to use the AuthContext
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // State to hold the user data
//   const [loading, setLoading] = useState(true); // State to indicate loading status

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const fetchUserData = async () => {
//           const docRef = doc(db, "users", user.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setUser({ uid: user.uid, email: user.email, ...docSnap.data() });
//           } else {
//             setUser(user);
//           }
//         };
//         await fetchUserData(); // Await the fetch function
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const signup = async (email, password, username) => {
//     try {
//       console.log("Starting signup process...");
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       console.log("User created in Firebase Auth:", user.uid);

//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         email: user.email,
//         username: username,
//         theme: "light", // Set default theme to light
//         friends: [], // Ensure the friends field is added
//       });
//       console.log("User document created in Firestore");

//       // Fetch the stored data from Firestore
//       const docRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setUser({ uid: user.uid, email: user.email, ...docSnap.data() });
//         console.log("User data set in state:", docSnap.data());
//       } else {
//         setUser(user);
//         console.log("User data not found in Firestore, using Auth data");
//       }
//     } catch (error) {
//       console.error("Error during signup process:", error);
//       throw error;
//     }
//   };

//   const login = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
//   };

//   const logout = () => {
//     return signOut(auth); // Sign out the current user
//   };

//   const updateUserTheme = async (uid, theme) => {
//     await setDoc(doc(db, "users", uid), { theme }, { merge: true });
//     setUser((prevUser) => ({ ...prevUser, theme }));
//     document.body.classList.toggle("dark-mode", theme === "dark");
//   };

//   const value = {
//     user,
//     loading,
//     signup,
//     login,
//     logout,
//     updateUserTheme,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children} {/* Render children only when not loading */}
//     </AuthContext.Provider>
//   );
// };
