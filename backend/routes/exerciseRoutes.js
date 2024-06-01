// backend/routes/exerciseRoutes.js
const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// Get all exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new exercise
router.post("/", async (req, res) => {
  const exercise = new Exercise({
    name: req.body.name,
    reps: req.body.reps,
    sets: req.body.sets,
  });

  try {
    const newExercise = await exercise.save();
    res.status(201).json(newExercise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an exercise
router.put("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!exercise) throw new Error("Exercise not found");
    res.json(exercise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an exercise
router.delete("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) throw new Error("Exercise not found");
    res.json({ message: "Exercise deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
