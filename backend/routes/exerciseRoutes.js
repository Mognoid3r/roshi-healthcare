const express = require("express");
const {
  addExercise,
  updateExercise,
  getExercise,
} = require("../controllers/exerciseController");

const router = express.Router();

// Route to add a new exercise
router.post("/", addExercise);

// Route to update an existing exercise
router.put("/:id", updateExercise);

// Route to get exercise details
router.get("/:id", getExercise);

module.exports = router;
