const express = require("express");
const {
  addFriend,
  removeFriend,
  searchUsers,
} = require("../controllers/friendController");
const router = express.Router();

router.post("/add", addFriend);
router.post("/remove", removeFriend);
router.get("/search", searchUsers);

module.exports = router;
