// const { default: Programs } = require("../../src/pages/Programs");
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

// Get User Details version 2
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching user with ID: ${id}`); // Debugging statement

    const userRef = db.collection("users").doc(id);
    const userDoc = await userRef.get();

    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Fetch friend details
      const friendsData = await Promise.all(
        userData.friends.map(async (friend) => {
          const friendRef = db.collection("users").doc(friend.uid);
          const friendDoc = await friendRef.get();
          if (friendDoc.exists()) {
            const friendData = friendDoc.data();
            return { uid: friend.uid, username: friendData.username };
          }
          return null;
        })
      );

      userData.friends = friendsData.filter((friend) => friend !== null);

      console.log(`User data: ${JSON.stringify(userData)}`); // Debugging statement
      res.status(200).json(userData);
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

// Clear a specific notification
exports.clearNotification = async (req, res) => {
  try {
    const { currentUserId, index } = req.body;
    const userRef = db.collection("users").doc(currentUserId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const notifications = userDoc.data().notifications || [];
    notifications.splice(index, 1); // Remove the specific notification

    await userRef.update({ notifications });

    res.status(200).json({ message: "Notification cleared successfully" });
  } catch (error) {
    console.error("Error clearing notification:", error);
    res
      .status(500)
      .json({ error: "Error clearing notification: " + error.message });
  }
};

// Clear all notifications
exports.clearAllNotifications = async (req, res) => {
  try {
    const { currentUserId } = req.body;
    const userRef = db.collection("users").doc(currentUserId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    await userRef.update({ notifications: [] });

    res.status(200).json({ message: "All notifications cleared successfully" });
  } catch (error) {
    console.error("Error clearing all notifications:", error);
    res
      .status(500)
      .json({ error: "Error clearing all notifications: " + error.message });
  }
};

// ################# Start Friend Interaction Functions #########################

// Add a new friend
exports.addFriend = async (req, res) => {
  const { currentUserId, friendUserId } = req.body;

  try {
    const friendUserRef = db.collection("users").doc(friendUserId);
    const friendUserDoc = await friendUserRef.get();
    if (!friendUserDoc.exists) {
      return res.status(404).json({ message: "Friend user not found" });
    }

    const friendUsername = friendUserDoc.data().username;

    const userRef = db.collection("users").doc(currentUserId);
    await userRef.update({
      friends: admin.firestore.FieldValue.arrayUnion({
        uid: friendUserId,
        username: friendUsername,
      }),
    });
    res.status(200).send("Friend added successfully");
  } catch (error) {
    res.status(500).send("Error adding friend: " + error.message);
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { currentUserId, friendUsername } = req.body;
    console.log(
      `Current User ID: ${currentUserId}, Friend Username: ${friendUsername}`
    );

    if (!friendUsername) {
      return res.status(400).json({ message: "Friend username is required" });
    }

    // Get the UID of the friend by their username
    const usernamesRef = db.collection("usernames").doc(friendUsername);
    const usernameDoc = await usernamesRef.get();
    if (!usernameDoc.exists) {
      console.log("Friend username not found");
      return res.status(404).json({ message: "Friend username not found" });
    }

    const friendUid = usernameDoc.data().uid;
    console.log(`Friend UID: ${friendUid}`);

    // Remove the friend request from the current user's incoming friend requests
    const currentUserRef = db.collection("users").doc(currentUserId);
    const currentUserDoc = await currentUserRef.get();
    if (!currentUserDoc.exists) {
      console.log("Current user not found");
      return res.status(404).json({ message: "Current user not found" });
    }

    await currentUserRef.update({
      incomingFriendRequests: admin.firestore.FieldValue.arrayRemove(friendUid),
      friends: admin.firestore.FieldValue.arrayUnion({
        uid: friendUid,
        username: friendUsername,
      }),
    });

    // Remove the friend request from the friend's outgoing friend requests
    const friendUserRef = db.collection("users").doc(friendUid);
    const friendUserDoc = await friendUserRef.get();
    if (!friendUserDoc.exists) {
      console.log("Friend user not found");
      return res.status(404).json({ message: "Friend user not found" });
    }

    const currentUsername = currentUserDoc.data().username;

    await friendUserRef.update({
      outgoingFriendRequests:
        admin.firestore.FieldValue.arrayRemove(currentUserId),
      friends: admin.firestore.FieldValue.arrayUnion({
        uid: currentUserId,
        username: currentUsername,
      }),
    });

    // Clear the friend request notification
    const notifications = currentUserDoc.data().notifications || [];
    const updatedNotifications = notifications.filter(
      (notification) =>
        !(
          notification.type === "friendRequest" &&
          notification.from === friendUid
        )
    );

    await currentUserRef.update({
      notifications: updatedNotifications,
    });

    res.status(200).json({
      message: "Friend request accepted and notification cleared successfully",
    });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res
      .status(500)
      .json({ error: "Error accepting friend request: " + error.message });
  }
};

exports.sendFriendRequest = async (req, res) => {
  try {
    const { currentUserId, friendUsername } = req.body;
    console.log(
      `Current User ID: ${currentUserId}, Friend Username: ${friendUsername}`
    );

    // Get the UID of the friend by their username
    const usernamesRef = db.collection("usernames").doc(friendUsername);
    const usernameDoc = await usernamesRef.get();
    if (!usernameDoc.exists) {
      console.log("Friend username not found");
      return res.status(404).json({ message: "Friend username not found" });
    }

    const friendUid = usernameDoc.data().uid;
    console.log(`Friend UID: ${friendUid}`);

    // Check if the current user is trying to send a friend request to themselves
    if (currentUserId === friendUid) {
      console.log("Cannot send friend request to yourself");
      return res
        .status(400)
        .json({ message: "Cannot send friend request to yourself" });
    }

    // Get the current user's username
    const currentUserRef = db.collection("users").doc(currentUserId);
    const currentUserDoc = await currentUserRef.get();
    if (!currentUserDoc.exists) {
      console.log("Current user not found");
      return res.status(404).json({ message: "Current user not found" });
    }
    const currentUsername = currentUserDoc.data().username;

    // Check if they are already friends
    if (
      currentUserDoc.data().friends.some((friend) => friend.uid === friendUid)
    ) {
      console.log("Users are already friends");
      return res.status(400).json({ message: "Users are already friends" });
    }

    // Check if a friend request is already pending
    if (currentUserDoc.data().outgoingFriendRequests.includes(friendUid)) {
      console.log("Friend request already sent");
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Add the friend request to the current user's outgoing friend requests
    await currentUserRef.update({
      outgoingFriendRequests: admin.firestore.FieldValue.arrayUnion(friendUid),
    });
    console.log(`Updated outgoing friend requests for ${currentUserId}`);

    // Add the friend request to the friend's incoming friend requests
    const friendUserRef = db.collection("users").doc(friendUid);
    await friendUserRef.update({
      incomingFriendRequests:
        admin.firestore.FieldValue.arrayUnion(currentUserId),
    });

    // Create the notification object with the current username
    const notification = {
      type: "friendRequest",
      from: currentUserId,
      fromUsername: currentUsername, // Use the username instead of user ID
      message: `${currentUsername} sent you a friend request`,
      timestamp: new Date(), // Use JavaScript Date for the timestamp
    };

    // Add the notification to the friend's notifications
    const friendUserDoc = await friendUserRef.get();
    const notifications = friendUserDoc.data().notifications || [];
    notifications.push(notification);
    await friendUserRef.update({
      notifications: notifications,
    });

    console.log(
      `Updated incoming friend requests and notifications for ${friendUid}`
    );

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res
      .status(500)
      .json({ error: "Error sending friend request: " + error.message });
  }
};

// Remove a friend
exports.removeFriend = async (req, res) => {
  try {
    const { currentUserId, friendUsername } = req.body;
    console.log(
      `Current User ID: ${currentUserId}, Friend Username: ${friendUsername}`
    );

    // Get the UID of the friend by their username
    const usernamesRef = db.collection("usernames").doc(friendUsername);
    const usernameDoc = await usernamesRef.get();
    if (!usernameDoc.exists) {
      console.log("Friend username not found");
      return res.status(404).json({ message: "Friend username not found" });
    }

    const friendUid = usernameDoc.data().uid;
    console.log(`Friend UID: ${friendUid}`);

    // Remove the friend from the current user's friends list
    const currentUserRef = db.collection("users").doc(currentUserId);
    const currentUserDoc = await currentUserRef.get();
    if (!currentUserDoc.exists) {
      console.log("Current user not found");
      return res.status(404).json({ message: "Current user not found" });
    }

    const currentUserData = currentUserDoc.data();
    currentUserData.friends = currentUserData.friends.filter(
      (friend) => friend.uid !== friendUid
    );
    await currentUserRef.update({
      friends: currentUserData.friends,
    });
    console.log(`Removed friend from ${currentUserId}`);

    // Remove the current user from the friend's friends list
    const friendUserRef = db.collection("users").doc(friendUid);
    const friendUserDoc = await friendUserRef.get();
    if (!friendUserDoc.exists) {
      console.log("Friend user not found");
      return res.status(404).json({ message: "Friend user not found" });
    }

    const friendUserData = friendUserDoc.data();
    friendUserData.friends = friendUserData.friends.filter(
      (friend) => friend.uid !== currentUserId
    );
    await friendUserRef.update({
      friends: friendUserData.friends,
    });
    console.log(`Removed current user from ${friendUid}`);

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    console.error("Error removing friend:", error);
    res.status(500).json({ error: "Error removing friend: " + error.message });
  }
};

// Cancel a friend request
exports.cancelFriendRequest = async (req, res) => {
  try {
    const { currentUserId, friendUsername } = req.body;
    console.log(
      `Current User ID: ${currentUserId}, Friend Username: ${friendUsername}`
    );

    // Get the UID of the friend by their username
    const usernamesRef = db.collection("usernames").doc(friendUsername);
    const usernameDoc = await usernamesRef.get();
    if (!usernameDoc.exists) {
      console.log("Friend username not found");
      return res.status(404).json({ message: "Friend username not found" });
    }

    const friendUid = usernameDoc.data().uid;
    console.log(`Friend UID: ${friendUid}`);

    // Remove the friend request from the current user's outgoing friend requests
    const currentUserRef = db.collection("users").doc(currentUserId);
    await currentUserRef.update({
      outgoingFriendRequests: admin.firestore.FieldValue.arrayRemove(friendUid),
    });
    console.log(`Removed outgoing friend request for ${currentUserId}`);

    // Remove the friend request from the friend's incoming friend requests
    const friendUserRef = db.collection("users").doc(friendUid);
    await friendUserRef.update({
      incomingFriendRequests:
        admin.firestore.FieldValue.arrayRemove(currentUserId),
    });

    // Remove the notification
    const friendUserDoc = await friendUserRef.get();
    const notifications = friendUserDoc.data().notifications || [];
    const updatedNotifications = notifications.filter(
      (notification) =>
        notification.type !== "friendRequest" ||
        notification.from !== currentUserId
    );
    await friendUserRef.update({
      notifications: updatedNotifications,
    });

    console.log(
      `Removed incoming friend requests and notifications for ${friendUid}`
    );

    res.status(200).json({ message: "Friend request cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling friend request:", error);
    res
      .status(500)
      .json({ error: "Error cancelling friend request: " + error.message });
  }
};

// Share a program with a friend
exports.shareProgram = async (req, res) => {
  try {
    const { currentUserId, friendUserId, programId } = req.body;
    console.log(
      `Sharing program ${programId} from ${currentUserId} to ${friendUserId}`
    );

    // Reference to the current user's program
    const currentUserProgramRef = db
      .collection("users")
      .doc(currentUserId)
      .collection("programs")
      .doc(programId);
    const currentUserProgramDoc = await currentUserProgramRef.get();

    if (!currentUserProgramDoc.exists) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Add the program to the friend's programs collection
    const friendProgramsCollection = db
      .collection("users")
      .doc(friendUserId)
      .collection("programs");
    await friendProgramsCollection.add(currentUserProgramDoc.data());

    // Add a notification to the friend's notifications
    const notification = {
      type: "programShare",
      from: currentUserId,
      programId: programId,
      message: "A program has been shared with you",
      timestamp: new Date(),
    };

    const friendUserRef = db.collection("users").doc(friendUserId);
    await friendUserRef.update({
      notifications: admin.firestore.FieldValue.arrayUnion(notification),
    });

    res
      .status(200)
      .json({ message: "Program shared and notification sent successfully" });
  } catch (error) {
    console.error("Error sharing program:", error);
    res.status(500).json({ error: "Error sharing program: " + error.message });
  }
};

// ################# End Friend Interaction Functions #########################
