const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const Experience = require("../models/experience");

// Show projects
router.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.render("projects", { projects });
});

// Add project
router.post("/projects/add", async (req, res) => {
  await Project.create({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link
  });
  res.redirect("/admin/projects");
});

// Delete project
router.get("/projects/delete/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect("/admin/projects");
});

// Show experiences
router.get("/experiences", async (req, res) => {
  const experiences = await Experience.find();
  res.render("experiences", { experiences });
});

// Add experience
router.post("/experiences/add", async (req, res) => {
  await Experience.create({
    title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  res.redirect("/admin/experiences");
});

// Delete experience
router.get("/experiences/delete/:id", async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.redirect("/admin/experiences");
});

module.exports = router;
