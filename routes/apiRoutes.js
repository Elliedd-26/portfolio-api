const express = require("express");
const router = express.Router();
const Project = require("../models/project");

router.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

const Experience = require("../models/experience");

router.get("/experiences", async (req, res) => {
  const experiences = await Experience.find();
  res.json(experiences);
});

module.exports = router;
