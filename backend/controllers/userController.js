const { db } = require("../../src/services/firebase/firebaseConfig");
const {
  collection,
  addDoc,
  updateDoc,
  getDoc,
  doc,
} = require("firebase/firestore");

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const user = req.body;
    const newUserRef = await addDoc(collection(db, "users"), user);
    res.status(201).json({ id: newUserRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, updatedData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user details
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      res.status(200).json(userDoc.data());
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
