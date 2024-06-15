const admin = require("firebase-admin");
const serviceAccount = require("../roshi-health-firebase-adminsdk");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://roshi-health.firebaseio.com",
  });
}

const db = admin.firestore();

module.exports = { db };
