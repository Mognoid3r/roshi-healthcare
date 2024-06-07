const { db } = require("../../src/services/firebase/firebaseConfig");
const {
  collection,
  addDoc,
  updateDoc,
  getDoc,
  doc,
} = require("firebase/firestore");

// Add a new exercise
exports.addExercise = async (req, res) => {
  try {
    const exercise = req.body;
    const newExerciseRef = await addDoc(collection(db, "exercises"), exercise);
    res.status(201).json({ id: newExerciseRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing exercise
exports.updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const exerciseRef = doc(db, "exercises", id);
    await updateDoc(exerciseRef, updatedData);
    res.status(200).json({ message: "Exercise updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get exercise details
exports.getExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const exerciseRef = doc(db, "exercises", id);
    const exerciseDoc = await getDoc(exerciseRef);
    if (exerciseDoc.exists()) {
      res.status(200).json(exerciseDoc.data());
    } else {
      res.status(404).json({ message: "Exercise not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
