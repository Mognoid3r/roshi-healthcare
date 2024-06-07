import React, { useState, useEffect } from "react";
import "../styles/RenameModal.css";

const RenameModal = ({ isOpen, onClose, onRename, currentName }) => {
  const [newName, setNewName] = useState(currentName);

  useEffect(() => {
    setNewName(currentName);
  }, [currentName]);

  const handleRename = () => {
    onRename(newName);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Rename Program</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <div>
          <button onClick={handleRename}>Rename</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;
