import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../services/firebase/firebaseConfig"; // Adjust the path as needed

// Function to add a friend
export const addFriend = async (currentUserId, friendUserId) => {
  const userRef = doc(db, "users", currentUserId);

  try {
    await updateDoc(userRef, {
      friends: arrayUnion(friendUserId),
    });
    console.log("Friend added successfully");
  } catch (error) {
    console.error("Error adding friend:", error);
  }
};

// Function to remove a friend
export const removeFriend = async (currentUserId, friendUserId) => {
  const userRef = doc(db, "users", currentUserId);

  try {
    await updateDoc(userRef, {
      friends: arrayRemove(friendUserId),
    });
    console.log("Friend removed successfully");
  } catch (error) {
    console.error("Error removing friend:", error);
  }
};

// Function to search for users by username
export const searchUsers = async (username) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));

  try {
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => doc.data());
    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
};
