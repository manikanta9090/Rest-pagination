const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  branch: String,
  age: Number,
  marks: Number
});

module.exports = mongoose.model("Student", studentSchema);
