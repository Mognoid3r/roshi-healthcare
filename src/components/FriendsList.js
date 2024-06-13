// import React, { useEffect, useState } from "react";
// import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
// import { db } from "../services/firebase/firebaseConfig";
// import { useAuth } from "../hooks/useAuth";

// const FriendsList = () => {
//   const { user } = useAuth();
//   const [friends, setFriends] = useState([]);

//   useEffect(() => {
//     const fetchFriends = async () => {
//       const friendsCollection = collection(db, "users", user.uid, "friends");
//       const friendsSnapshot = await getDocs(friendsCollection);
//       const friendsList = friendsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setFriends(friendsList);
//     };

//     fetchFriends();
//   }, [user]);

//   const handleDeleteFriend = async (friendId) => {
//     await deleteDoc(doc(db, "users", user.uid, "friends", friendId));
//     setFriends(friends.filter((friend) => friend.id !== friendId));
//   };

//   return (
//     <div>
//       <h2>Your Friends</h2>
//       <ul>
//         {friends.map((friend) => (
//           <li key={friend.id}>
//             {friend.username}
//             <button onClick={() => handleDeleteFriend(friend.id)}>
//               Delete
//             </button>
//             <button
//               onClick={() => (window.location.href = `/profile/${friend.id}`)}
//             >
//               View Profile
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FriendsList;

// Not sure if above code was used anywhere.

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "../styles/FriendsList.css";

const FriendsList = () => {
  const { user: currentUser } = useAuth(); // Get current user data from useAuth
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setFriends(currentUser.friends); // Directly set friends from currentUser
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setError("Error fetching friends");
        setLoading(false);
      }
    };

    if (currentUser && currentUser.friends) {
      fetchFriends();
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading friends...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="friends-list">
      <h2>Friends</h2>
      {friends.length === 0 ? (
        <p>No friends found.</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.uid}>
              <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsList;
