const { db } = require("../../src/services/firebase/firebaseConfig");
const {
  collection,
  addDoc,
  updateDoc,
  getDoc,
  doc,
} = require("firebase/firestore");

// Add a new workout
exports.addWorkout = async (req, res) => {
  try {
    const workout = req.body;
    const newWorkoutRef = await addDoc(collection(db, "workouts"), workout);
    res.status(201).json({ id: newWorkoutRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing workout
exports.updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const workoutRef = doc(db, "workouts", id);
    await updateDoc(workoutRef, updatedData);
    res.status(200).json({ message: "Workout updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get workout details
exports.getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const workoutRef = doc(db, "workouts", id);
    const workoutDoc = await getDoc(workoutRef);
    if (workoutDoc.exists()) {
      res.status(200).json(workoutDoc.data());
    } else {
      res.status(404).json({ message: "Workout not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
