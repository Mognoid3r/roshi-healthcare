// const admin = require("firebase-admin");
// const serviceAccount = require("../roshi-health-firebase-adminsdk");

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://roshi-health.firebaseio.com",
//   });
// }

// const db = admin.firestore();

// module.exports = { db };

// backend/services/firebaseAdminConfig.js
// backend/services/firebaseAdminConfig.js
const admin = require("firebase-admin");
let serviceAccount;

if (process.env.NODE_ENV === "production") {
  serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  };
} else {
  serviceAccount = require("../roshi-health-firebase-adminsdk.json");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://roshi-health.firebaseio.com",
  });
}

const db = admin.firestore();

module.exports = { db };
