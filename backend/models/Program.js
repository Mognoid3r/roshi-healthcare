const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
});

const Program = mongoose.model("Program", programSchema);

module.exports = { Program };
