const express = require("express");
const {
  addProgram,
  updateProgram,
  getProgram,
} = require("../controllers/programController");
const {
  addUser,
  addFriend,
  removeFriend,
  searchUsers,
  getUser,
  getUserByUsername,
  sendFriendRequest,
  acceptFriendRequest,
  getNotifications,
  cancelFriendRequest,
  clearNotification,
  clearAllNotifications,
  shareProgram,
} = require("../controllers/userController");

const router = express.Router();

// Route to add a new program
router.post("/programs", addProgram);

// Route to update an existing program
router.put("/programs/:id", updateProgram);

// Route to get program details
router.get("/programs/:id", getProgram);

// Route to get user details
router.get("/users/:id", getUser);

// Route to get user details by username
router.get("/username/:username", getUserByUsername); // Added this route

// Routes for friends stuff
router.get("/search-users", searchUsers);
router.post("/add-friend", addFriend);
router.post("/remove-friend", removeFriend);

// Route to get user details by username
router.get("/username/:username", getUserByUsername); // Added this route

// Route to add a new user
router.post("/add-user", addUser); // Added this route

// Send a friend request
router.post("/send-friend-request", sendFriendRequest);
// Cancel friend request
router.post("/cancel-friend-request", cancelFriendRequest); // Add this route
// Accept a friend request
router.post("/accept-friend-request", acceptFriendRequest);

//Share program with friends
router.post("/share-program", shareProgram);

// Fetch notifications
router.get("/:userId/notifications", getNotifications);
router.post("/clear-notification", clearNotification);
router.post("/clear-all-notifications", clearAllNotifications);

module.exports = router;
