const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  screenshot: String,
  languages: [String],
}, { timestamps: true });
module.exports = mongoose.model('Project', projectSchema);
