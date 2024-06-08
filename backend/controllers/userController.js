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

// Get user details by username, this works!
exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(`Fetching user with username: ${username}`); // Debugging statement

    const usernamesRef = db.collection("usernames").doc(username);
    const usernameDoc = await usernamesRef.get();
    if (!usernameDoc.exists) {
      console.log("Username not found"); // Debugging statement
      return res.status(404).json({ message: "Username not found" });
    }

    const uid = usernameDoc.data().uid;
    console.log(`UID for username ${username}: ${uid}`); // Debugging statement

    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    // Debugging: Log the entire userDoc object
    console.log(`userDoc: ${JSON.stringify(userDoc)}`);
    console.log(`userDoc.exists: ${userDoc.exists}`);
    console.log(
      `userDoc.exists(): ${
        typeof userDoc.exists === "function" ? userDoc.exists() : "N/A"
      }`
    );

    if (userDoc.exists) {
      console.log(
        `User data for UID ${uid}: ${JSON.stringify(userDoc.data())}`
      ); // Debugging statement
      res.status(200).json(userDoc.data());
    } else {
      console.log("User not found"); // Debugging statement
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user by username:", error); // Debugging statement
    res.status(500).json({ error: error.message });
  }
};

// Send a friend request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { currentUserId, friendUsername } = req.body;

    // Get the UID of the friend by their username
    const usernamesRef = db.collection("usernames").doc(friendUsername);
    const usernameDoc = await usernamesRef.get();
    if (!usernameDoc.exists) {
      return res.status(404).json({ message: "Friend username not found" });
    }

    const friendUid = usernameDoc.data().uid;

    // Add the friend request to the current user's outgoing friend requests
    const currentUserRef = db.collection("users").doc(currentUserId);
    await currentUserRef.update({
      outgoingFriendRequests: admin.firestore.FieldValue.arrayUnion(friendUid),
    });

    // Add the friend request to the friend's incoming friend requests
    const friendUserRef = db.collection("users").doc(friendUid);
    await friendUserRef.update({
      incomingFriendRequests:
        admin.firestore.FieldValue.arrayUnion(currentUserId),
    });

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res
      .status(500)
      .json({ error: "Error sending friend request: " + error.message });
  }
};

// Accept a friend request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { currentUserId, friendUserId } = req.body;
    const currentUserRef = db.collection("users").doc(currentUserId);
    const friendUserRef = db.collection("users").doc(friendUserId);

    await currentUserRef.update({
      friends: admin.firestore.FieldValue.arrayUnion(friendUserId),
      friendRequests: admin.firestore.FieldValue.arrayRemove(friendUserId),
    });

    await friendUserRef.update({
      friends: admin.firestore.FieldValue.arrayUnion(currentUserId),
    });

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch notifications for a user
exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const notifications = userDoc.data().notifications || [];
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
