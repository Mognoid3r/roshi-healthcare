// const { db } = require("../services/firebaseAdminConfig");
// const admin = require("firebase-admin");

// // Add a new user
// exports.addUser = async (req, res) => {
//   try {
//     const user = req.body;
//     user.friends = []; // Ensure the friends field is added
//     const newUserRef = await db.collection("users").add(user);
//     res.status(201).json({ id: newUserRef.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update an existing user
// exports.updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;
//     const userRef = db.collection("users").doc(id);
//     await userRef.update(updatedData);
//     res.status(200).json({ message: "User updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get user details
// exports.getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userRef = db.collection("users").doc(id);
//     const userDoc = await userRef.get();
//     if (userDoc.exists) {
//       res.status(200).json(userDoc.data());
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.addFriend = async (req, res) => {
//   const { currentUserId, friendUserId } = req.body;

//   try {
//     const userRef = doc(db, "users", currentUserId);
//     const userDoc = await getDoc(userRef);
//     if (!userDoc.exists()) {
//       return res.status(404).send("Current user not found");
//     }

//     const friendRef = doc(db, "users", friendUserId);
//     const friendDoc = await getDoc(friendRef);
//     if (!friendDoc.exists()) {
//       return res.status(404).send("Friend user not found");
//     }

//     await updateDoc(userRef, {
//       friends: admin.firestore.FieldValue.arrayUnion(friendUserId),
//     });

//     res.status(200).send("Friend added successfully");
//   } catch (error) {
//     console.error("Error adding friend:", error);
//     res.status(500).send("Error adding friend: " + error.message);
//   }
// };

// // Search users by username
// exports.searchUsers = async (req, res) => {
//   const { username } = req.query;

//   try {
//     console.log(`Searching for username: ${username}`);
//     const usernamesRef = db.collection("usernames");
//     const q = usernamesRef
//       .where(admin.firestore.FieldPath.documentId(), ">=", username)
//       .where(admin.firestore.FieldPath.documentId(), "<=", username + "\uf8ff");
//     const querySnapshot = await q.get();

//     if (querySnapshot.empty) {
//       console.log("No matching users found");
//       return res.status(404).send("No matching users found");
//     }

//     const users = [];
//     querySnapshot.forEach((doc) => {
//       console.log(`Found document: ${doc.id}`);
//       users.push({ username: doc.id, uid: doc.data().uid });
//     });

//     console.log(`Found users: ${JSON.stringify(users)}`);
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Error searching users:", error);
//     res.status(500).send("Error searching users: " + error.message);
//   }
// };

// // Add a new friend
// exports.addFriend = async (req, res) => {
//   const { currentUserId, friendUserId } = req.body;

//   try {
//     const userRef = db.collection("users").doc(currentUserId);
//     await userRef.update({
//       friends: admin.firestore.FieldValue.arrayUnion(friendUserId),
//     });
//     res.status(200).send("Friend added successfully");
//   } catch (error) {
//     res.status(500).send("Error adding friend: " + error.message);
//   }
// };

// // Remove a friend
// exports.removeFriend = async (req, res) => {
//   const { currentUserId, friendUserId } = req.body;

//   try {
//     const userRef = db.collection("users").doc(currentUserId);
//     await userRef.update({
//       friends: admin.firestore.FieldValue.arrayRemove(friendUserId),
//     });
//     res.status(200).send("Friend removed successfully");
//   } catch (error) {
//     res.status(500).send("Error removing friend: " + error.message);
//   }
// };

//testing new functionality for get requests below:

const { db } = require("../services/firebaseAdminConfig");
const admin = require("firebase-admin");

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const user = req.body;
    user.friends = []; // Ensure the friends field is added
    const newUserRef = await db.collection("users").add(user);
    res.status(201).json({ id: newUserRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const userRef = db.collection("users").doc(id);
    await userRef.update(updatedData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user details
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching user with ID: ${id}`); // Debugging statement
    const userRef = db.collection("users").doc(id);
    const userDoc = await userRef.get();
    if (userDoc.exists()) {
      console.log(`User data: ${JSON.stringify(userDoc.data())}`); // Debugging statement
      res.status(200).json(userDoc.data());
    } else {
      console.log("User not found"); // Debugging statement
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error); // Debugging statement
    res.status(500).json({ error: error.message });
  }
};

// Search users by username
exports.searchUsers = async (req, res) => {
  const { username } = req.query;

  try {
    console.log(`Searching for username: ${username}`);
    const usernamesRef = db.collection("usernames");
    const q = usernamesRef
      .where(admin.firestore.FieldPath.documentId(), ">=", username)
      .where(admin.firestore.FieldPath.documentId(), "<=", username + "\uf8ff");
    const querySnapshot = await q.get();

    if (querySnapshot.empty) {
      console.log("No matching users found");
      return res.status(404).send("No matching users found");
    }

    const users = [];
    querySnapshot.forEach((doc) => {
      console.log(`Found document: ${doc.id}`);
      users.push({ username: doc.id, uid: doc.data().uid });
    });

    console.log(`Found users: ${JSON.stringify(users)}`);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).send("Error searching users: " + error.message);
  }
};

// Add a new friend
exports.addFriend = async (req, res) => {
  const { currentUserId, friendUserId } = req.body;

  try {
    const userRef = db.collection("users").doc(currentUserId);
    await userRef.update({
      friends: admin.firestore.FieldValue.arrayUnion(friendUserId),
    });
    res.status(200).send("Friend added successfully");
  } catch (error) {
    res.status(500).send("Error adding friend: " + error.message);
  }
};

// Remove a friend
exports.removeFriend = async (req, res) => {
  const { currentUserId, friendUserId } = req.body;

  try {
    const userRef = db.collection("users").doc(currentUserId);
    await userRef.update({
      friends: admin.firestore.FieldValue.arrayRemove(friendUserId),
    });
    res.status(200).send("Friend removed successfully");
  } catch (error) {
    res.status(500).send("Error removing friend: " + error.message);
  }
};
