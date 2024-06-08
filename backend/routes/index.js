// backend/routes/index.js
const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const exerciseRoutes = require("./exerciseRoutes");
const programRoutes = require("./programRoutes");
const friendRoutes = require("./friendRoutes");

router.use("/users", userRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/programs", programRoutes);
router.use("/friends", friendRoutes);

module.exports = router;
