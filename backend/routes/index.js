// backend/routes/index.js
const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const exerciseRoutes = require("./exerciseRoutes");
const programRoutes = require("./programRoutes");

router.use("/users", userRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/programs", programRoutes);

module.exports = router;
