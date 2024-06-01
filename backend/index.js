// const express = require("express");
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// const uri = process.env.MONGODB_URI; // Ensure your .env file has the correct connection string

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function connectToDatabase() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } catch (err) {
//     console.error("Failed to connect to MongoDB", err);
//   }
// }

// connectToDatabase();

// // API route to get users
// app.get("/api/users", async (req, res) => {
//   try {
//     const database = client.db("roshi_healthcare"); // Replace with your database name
//     const usersCollection = database.collection("users");
//     const users = await usersCollection.find({}).toArray();
//     console.log("Fetched Users:", users); // Log fetched users
//     if (users.length === 0) {
//       console.log("No users found");
//     }
//     res.json(users);
//   } catch (err) {
//     console.error("Error fetching users:", err); // Log any errors
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error("Connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

// Import routes
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const programRoutes = require("./routes/programRoutes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/programs", programRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
