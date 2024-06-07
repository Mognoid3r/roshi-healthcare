const express = require("express");
const {
  addProgram,
  updateProgram,
  getProgram,
} = require("../controllers/programController");

const router = express.Router();

// Route to add a new program
router.post("/", addProgram);

// Route to update an existing program
router.put("/:id", updateProgram);

// Route to get program details
router.get("/:id", getProgram);

module.exports = router;
