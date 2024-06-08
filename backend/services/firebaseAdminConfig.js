const admin = require("firebase-admin");
const serviceAccount = require("../roshi-health-firebase-adminsdk-uncf8-e0cd4ed55e.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://roshi-health.firebaseio.com",
  });
}

const db = admin.firestore();

module.exports = { db };
