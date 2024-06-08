// const express = require("express");
// const {
//   addProgram,
//   updateProgram,
//   getProgram,
// } = require("../controllers/programController");

// const router = express.Router();

// // Route to add a new program
// router.post("/", addProgram);

// // Route to update an existing program
// router.put("/:id", updateProgram);

// // Route to get program details
// router.get("/:id", getProgram);

// module.exports = router;

// const express = require("express");
// const {
//   addProgram,
//   updateProgram,
//   getProgram,
// } = require("../controllers/programController");
// const {
//   addFriend,
//   removeFriend,
//   searchUsers,
// } = require("../controllers/userController"); // Adjust the path if needed

// const router = express.Router();

// // Route to add a new program
// router.post("/programs", addProgram);

// // Route to update an existing program
// router.put("/programs/:id", updateProgram);

// // Route to get program details
// router.get("/programs/:id", getProgram);

// // Routes for friends stuff
// // Route to search users
// router.get("/search-users", searchUsers);

// // Routes for friends
// router.post("/add-friend", addFriend);
// router.post("/remove-friend", removeFriend);

// module.exports = router;

// backend/routes/userRoutes.js

const express = require("express");
const {
  addProgram,
  updateProgram,
  getProgram,
} = require("../controllers/programController");
const {
  addFriend,
  removeFriend,
  searchUsers,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

// Route to add a new program
router.post("/programs", addProgram);

// Route to update an existing program
router.put("/programs/:id", updateProgram);

// Route to get user details
router.get("/users/:id", getUser);

// Route to get program details
router.get("/programs/:id", getProgram);

// Routes for friends stuff
router.get("/search-users", searchUsers);
router.post("/add-friend", addFriend);
router.post("/remove-friend", removeFriend);

module.exports = router;
