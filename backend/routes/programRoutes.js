const express = require("express");
const router = express.Router();
const Program = require("../models/Program");

// Get all programs for a user
router.get("/:userId", async (req, res) => {
  try {
    const programs = await Program.find({ userId: req.params.userId });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new program
router.post("/", async (req, res) => {
  try {
    const newProgram = new Program(req.body);
    const savedProgram = await newProgram.save();
    res.json(savedProgram);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
