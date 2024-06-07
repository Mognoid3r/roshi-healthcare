const { db } = require("../../src/services/firebase/firebaseConfig");
const {
  collection,
  addDoc,
  updateDoc,
  getDoc,
  doc,
} = require("firebase/firestore");

// Add a new program
exports.addProgram = async (req, res) => {
  try {
    const program = req.body; // Accept all fields
    const newProgramRef = await addDoc(collection(db, "programs"), program);
    res.status(201).json({ id: newProgramRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing program
exports.updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; // Accept all fields
    const programRef = doc(db, "programs", id);
    await updateDoc(programRef, updatedData);
    res.status(200).json({ message: "Program updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get program details
exports.getProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const programRef = doc(db, "programs", id);
    const programDoc = await getDoc(programRef);
    if (programDoc.exists()) {
      res.status(200).json(programDoc.data());
    } else {
      res.status(404).json({ message: "Program not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
