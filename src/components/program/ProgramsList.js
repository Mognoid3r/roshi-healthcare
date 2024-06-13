import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import Card from "../program/ProgramsCard";
import "../../styles/ProgramsList.css";
import RenameModal from "../../components/RenameModal";
import ShareProgramModal from "./ShareProgramModal";
import axios from "axios";

// Define the deepCopyProgram function
const deepCopyProgram = (program) => {
  return JSON.parse(JSON.stringify(program));
};

const ProgramsList = () => {
  const { user } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProgramName, setNewProgramName] = useState("");
  const [currentProgram, setCurrentProgram] = useState(null);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [programToRename, setProgramToRename] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [programToShare, setProgramToShare] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (user) {
      fetchPrograms();
    }
  }, [user]);

  const fetchPrograms = async () => {
    try {
      const programsCollection = collection(db, "users", user.uid, "programs");
      const programSnapshot = await getDocs(programsCollection);
      const programList = programSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        username: user.username, // Use the username from useAuth
      }));
      setPrograms(programList);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const handleCreateProgram = async () => {
    if (!newProgramName.trim()) return;

    try {
      const programsCollection = collection(db, "users", user.uid, "programs");
      const newProgramRef = await addDoc(programsCollection, {
        name: newProgramName,
        userId: user.uid,
      });
      const newProgram = {
        id: newProgramRef.id,
        name: newProgramName,
        username: user.username || "Unknown",
      };

      setPrograms([...programs, newProgram]);
      setNewProgramName("");
      setShowModal(false);
      setCurrentProgram(newProgram);
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  const handleDeleteProgram = async (programId) => {
    try {
      const programRef = doc(db, `users/${user.uid}/programs/${programId}`);
      await deleteDoc(programRef);
      setPrograms(programs.filter((program) => program.id !== programId));
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  const handleDuplicateProgram = async (program) => {
    try {
      const programsCollection = collection(db, "users", user.uid, "programs");
      const newProgramData = deepCopyProgram(program);
      delete newProgramData.id; // Remove the ID from the copied data
      newProgramData.name = `${program.name} (Copy)`;

      const newProgramRef = await addDoc(programsCollection, newProgramData);
      const newProgram = { id: newProgramRef.id, ...newProgramData };

      setPrograms([...programs, newProgram]);
    } catch (error) {
      console.error("Error duplicating program:", error);
    }
  };

  const handleShareProgram = async (friendUserId, programId) => {
    try {
      await axios.post("http://localhost:5000/api/users/share-program", {
        currentUserId: user.uid,
        friendUserId,
        programId,
      });
      console.log("Program shared successfully");
      setShareModalOpen(false);
    } catch (error) {
      console.error("Error sharing program:", error);
    }
  };

  const handleRenameProgram = (program) => {
    setProgramToRename(program);
    setRenameModalOpen(true);
  };

  const handleRenameSubmit = async (newName) => {
    try {
      const programRef = doc(
        db,
        `users/${user.uid}/programs/${programToRename.id}`
      );
      await updateDoc(programRef, { name: newName });
      setPrograms(
        programs.map((program) =>
          program.id === programToRename.id
            ? { ...program, name: newName }
            : program
        )
      );
      setRenameModalOpen(false);
    } catch (error) {
      console.error("Error renaming program:", error);
    }
  };

  const closeRenameModal = () => {
    setRenameModalOpen(false);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
    setProgramToShare(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateProgram();
    }
  };

  return (
    <div className="programs-list">
      <h2>Your Programs</h2>
      <button onClick={() => setShowModal(true)}>Create New Program</button>
      {showModal && (
        <div className="create-new-program-modal">
          <div className="create-new-program-modal-content">
            <button className="close" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h3 className="create-new-program-modal-title">
              Name your new program
            </h3>
            <input
              type="text"
              value={newProgramName}
              onChange={(e) => setNewProgramName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleCreateProgram}>Create Program</button>
          </div>
        </div>
      )}
      <div className="programs-grid">
        {programs.map((program) => (
          <Card
            key={program.id}
            image="https://via.placeholder.com/240x320"
            title={program.name}
            content={program.description || ""}
            username={program.username}
            onDelete={() => handleDeleteProgram(program.id)}
            onDuplicate={() => handleDuplicateProgram(program)}
            onShare={() => {
              setShareModalOpen(true);
              setProgramToShare(program);
            }}
            onRename={() => handleRenameProgram(program)}
            onClick={() => setCurrentProgram(program)}
          />
        ))}
      </div>
      <RenameModal
        isOpen={renameModalOpen}
        onClose={closeRenameModal}
        onRename={handleRenameSubmit}
        currentName={programToRename?.name || ""}
      />
      <ShareProgramModal
        isOpen={shareModalOpen}
        onClose={closeShareModal}
        onShare={(friendUserId) =>
          handleShareProgram(friendUserId, programToShare.id)
        }
        friends={user.friends}
      />
    </div>
  );
};

export default ProgramsList;
