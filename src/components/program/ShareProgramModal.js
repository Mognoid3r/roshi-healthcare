import React, { useState } from "react";
import "../../styles/ShareProgramModal.css";

const ShareProgramModal = ({ isOpen, onClose, onShare, friends }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFriends, setFilteredFriends] = useState(friends);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = friends.filter((friend) =>
      friend.username.toLowerCase().includes(term)
    );
    setFilteredFriends(filtered);
  };

  const handleShare = (friendUserId) => {
    onShare(friendUserId);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Share Program</h2>
        <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <ul>
          {filteredFriends.map((friend) => (
            <li key={friend.uid}>
              {friend.username}
              <button onClick={() => handleShare(friend.uid)}>Share</button>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShareProgramModal;
