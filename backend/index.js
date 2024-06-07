// Import necessary modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require("./routes/userRoutes");
const programRoutes = require("./routes/programRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
