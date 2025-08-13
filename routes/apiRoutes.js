const express = require('express');
const Project = require('../models/project');
const Experience = require('../models/experience');
const router = express.Router();

// GET /api/projects
router.get('/projects', async (req, res, next) => {
  try { res.json(await Project.find().lean()); }
  catch (e) { next(e); }
});

// GET /api/experiences
router.get('/experiences', async (req, res, next) => {
  try { res.json(await Experience.find().lean()); }
  catch (e) { next(e); }
});

module.exports = router;
