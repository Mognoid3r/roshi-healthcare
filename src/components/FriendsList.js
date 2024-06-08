import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase/firebaseConfig";
import { useAuth } from "../hooks/useAuth";

const FriendsList = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
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
  }, [user]);

  const handleDeleteFriend = async (friendId) => {
    await deleteDoc(doc(db, "users", user.uid, "friends", friendId));
    setFriends(friends.filter((friend) => friend.id !== friendId));
  };

  return (
    <div>
      <h2>Your Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            {friend.username}
            <button onClick={() => handleDeleteFriend(friend.id)}>
              Delete
            </button>
            <button
              onClick={() => (window.location.href = `/profile/${friend.id}`)}
            >
              View Profile
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
