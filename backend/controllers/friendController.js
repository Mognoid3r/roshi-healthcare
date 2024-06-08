const { db } = require("../../src/services/firebase/firebaseConfig");
const {
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} = require("firebase/firestore");

const addFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const friendDocRef = doc(db, "friends", userId);
    const friendDoc = await getDoc(friendDocRef);

    if (friendDoc.exists()) {
      await updateDoc(friendDocRef, {
        friendIds: arrayUnion(friendId),
      });
    } else {
      await setDoc(friendDocRef, {
        userId: userId,
        friendIds: [friendId],
      });
    }

    res.status(200).send("Friend added successfully");
  } catch (error) {
    res.status(500).send("Error adding friend: " + error.message);
  }
};

const removeFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const friendDocRef = doc(db, "friends", userId);
    await updateDoc(friendDocRef, {
      friendIds: arrayRemove(friendId),
    });
    res.status(200).send("Friend removed successfully");
  } catch (error) {
    res.status(500).send("Error removing friend: " + error.message);
  }
};

const getFriends = async (req, res) => {
  const { userId } = req.params;

  try {
    const friendDocRef = doc(db, "friends", userId);
    const friendDoc = await getDoc(friendDocRef);

    if (friendDoc.exists()) {
      res.status(200).json(friendDoc.data().friendIds);
    } else {
      res.status(404).send("No friends found");
    }
  } catch (error) {
    res.status(500).send("Error fetching friends: " + error.message);
  }
};

module.exports = {
  addFriend,
  removeFriend,
  getFriends,
};
