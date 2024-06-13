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

// code above works great.  Trying to integrate notifications below:

// import React, { useState } from "react";

// const ShareProgramModal = ({ isOpen, onClose, onShare, friends }) => {
//   const [selectedFriend, setSelectedFriend] = useState("");

//   const handleShare = () => {
//     if (selectedFriend) {
//       onShare(selectedFriend);
//       setSelectedFriend("");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <h2>Share Program</h2>
//         <select
//           value={selectedFriend}
//           onChange={(e) => setSelectedFriend(e.target.value)}
//         >
//           <option value="">Select a friend</option>
//           {friends.map((friend) => (
//             <option key={friend.uid} value={friend.uid}>
//               {friend.username}
//             </option>
//           ))}
//         </select>
//         <button onClick={handleShare}>Share</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default ShareProgramModal;
