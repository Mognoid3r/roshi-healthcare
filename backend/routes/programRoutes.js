const express = require("express");
const router = express.Router();
const Program = require("../models/Program");

// Define routes for programs here
router.get("/", async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const program = new Program({
    name: req.body.name,
    description: req.body.description,
    userId: req.body.userId,
    exercises: req.body.exercises,
  });

  try {
    const newProgram = await program.save();
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
