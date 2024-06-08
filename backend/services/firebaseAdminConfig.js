const admin = require("firebase-admin");
const serviceAccount = require("../roshi-health-firebase-adminsdk-uncf8-e0cd4ed55e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://roshi-health.firebaseio.com",
});

const db = admin.firestore();

module.exports = { admin, db };
