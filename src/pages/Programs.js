// import ProgramBuilder from "../components/program/ProgramBuilder";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   doc,
//   deleteDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "../services/firebase/firebaseConfig";
// import Card from "../components/program/ProgramsCard";
// import "../styles/ProgramsList.css";

// // Define the deepCopyProgram function
// const deepCopyProgram = (program) => {
//   return JSON.parse(JSON.stringify(program));
// };

// const Programs = () => {
//   const { user } = useAuth();
//   const [programs, setPrograms] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newProgramName, setNewProgramName] = useState("");
//   const [currentProgram, setCurrentProgram] = useState(null);

//   useEffect(() => {
//     if (user) {
//       fetchPrograms();
//     }
//   }, [user]);

//   const fetchPrograms = async () => {
//     try {
//       const programsCollection = collection(db, "users", user.uid, "programs");
//       const programSnapshot = await getDocs(programsCollection);
//       const programList = programSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//         username: user.username, // Use the username from useAuth
//       }));
//       setPrograms(programList);
//     } catch (error) {
//       console.error("Error fetching programs:", error);
//     }
//   };

//   const handleCreateProgram = async () => {
//     if (!newProgramName.trim()) return;

//     try {
//       const programsCollection = collection(db, "users", user.uid, "programs");
//       const newProgramRef = await addDoc(programsCollection, {
//         name: newProgramName,
//         userId: user.uid,
//       });
//       const newProgram = {
//         id: newProgramRef.id,
//         name: newProgramName,
//         username: user.username || "Unknown",
//       };

//       setPrograms([...programs, newProgram]);
//       setNewProgramName("");
//       setShowModal(false);
//       setCurrentProgram(newProgram);
//     } catch (error) {
//       console.error("Error creating program:", error);
//     }
//   };

//   const handleDeleteProgram = async (programId) => {
//     try {
//       const programRef = doc(db, `users/${user.uid}/programs/${programId}`);
//       await deleteDoc(programRef);
//       setPrograms(programs.filter((program) => program.id !== programId));
//     } catch (error) {
//       console.error("Error deleting program:", error);
//     }
//   };

//   const handleDuplicateProgram = async (program) => {
//     try {
//       const programsCollection = collection(db, "users", user.uid, "programs");
//       const newProgramData = deepCopyProgram(program);
//       delete newProgramData.id; // Remove the ID from the copied data
//       newProgramData.name = `${program.name} (Copy)`;

//       const newProgramRef = await addDoc(programsCollection, newProgramData);
//       const newProgram = { id: newProgramRef.id, ...newProgramData };

//       setPrograms([...programs, newProgram]);
//     } catch (error) {
//       console.error("Error duplicating program:", error);
//     }
//   };

//   const handleShareProgram = (program) => {
//     // Implement sharing logic here, e.g., copy link to clipboard, share via email, etc.
//     console.log("Share program:", program);
//   };

//   const handleRenameProgram = async (programId, newName) => {
//     try {
//       const programRef = doc(db, `users/${user.uid}/programs/${programId}`);
//       await updateDoc(programRef, { name: newName });
//       setPrograms(
//         programs.map((program) =>
//           program.id === programId ? { ...program, name: newName } : program
//         )
//       );
//     } catch (error) {
//       console.error("Error renaming program:", error);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleCreateProgram();
//     }
//   };

//   return (
//     <div className="programs-page">
//       <h2>Your Programs</h2>
//       <button onClick={() => setShowModal(true)}>Create New Program</button>
//       {showModal && (
//         <div className="create-new-program-modal">
//           <div className="create-new-program-modal-content">
//             <button className="close" onClick={() => setShowModal(false)}>
//               &times;
//             </button>
//             <h3>Name your new program</h3>
//             <input
//               type="text"
//               value={newProgramName}
//               onChange={(e) => setNewProgramName(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />
//             <button onClick={handleCreateProgram}>Create Program</button>
//           </div>
//         </div>
//       )}
//       <div className="programs-grid">
//         {programs.map((program) => (
//           <Card
//             key={program.id}
//             image="https://via.placeholder.com/240x320" // Replace with actual image URL
//             title={program.name}
//             content={`Created by ${program.username}`}
//             onDelete={() => handleDeleteProgram(program.id)}
//             onDuplicate={() => handleDuplicateProgram(program)}
//             onShare={() => handleShareProgram(program)}
//             onRename={(newName) => handleRenameProgram(program.id, newName)}
//             onClick={() => setCurrentProgram(program)}
//           />
//         ))}
//       </div>
//       {currentProgram && <ProgramBuilder program={currentProgram} />}
//     </div>
//   );
// };

// export default Programs;

// src/pages/Programs.js

// Programs.js
import React from "react";
import Tback from "../components/TBack";
import ProgramsList from "../components/program/ProgramsList";

const Programs = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Tback
        color="#3498db"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      <div style={{ position: "absolute", zIndex: 1, top: 0, width: "100%" }}>
        <ProgramsList />
      </div>
    </div>
  );
};

export default Programs;
