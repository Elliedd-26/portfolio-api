const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  description: String,
  startDate: String,
  endDate: String
});

module.exports = mongoose.model("Experience", experienceSchema);