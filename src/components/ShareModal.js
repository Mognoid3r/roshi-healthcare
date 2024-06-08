import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase/firebaseConfig";
import "../styles/ShareModal.css";

const ShareModal = ({ isOpen, onClose, onShare, user }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");

  useEffect(() => {
    if (isOpen) {
      const fetchFriends = async () => {
        const friendsCollection = collection(db, "users", user.uid, "friends");
        const friendsSnapshot = await getDocs(friendsCollection);
        const friendsList = friendsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFriends(friendsList);
      };

      fetchFriends();
    }
  }, [isOpen, user]);

  const handleShare = () => {
    onShare(selectedFriend);
    onClose();
  };

  return (
    isOpen && (
      <div className="share-modal-overlay">
        <div className="share-modal-content">
          <h2>Share Program</h2>
          <select
            onChange={(e) => setSelectedFriend(e.target.value)}
            value={selectedFriend}
          >
            <option value="" disabled>
              Select a friend
            </option>
            {friends.map((friend) => (
              <option key={friend.id} value={friend.id}>
                {friend.username}
              </option>
            ))}
          </select>
          <div className="share-modal-buttons">
            <button onClick={handleShare} disabled={!selectedFriend}>
              Share
            </button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ShareModal;
