const express = require('express');
const router = express.Router();
const ProjectSubmission = require('../models/project_submissionSchema'); // Adjust the path as necessary

// @route   POST /api/projects
// @desc    Create a new project submission
router.post('/', async (req, res) => {
  try {
    const newProject = new ProjectSubmission(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/projects
// @desc    Get all project submissions
router.get('/', async (req, res) => {
  try {
    const projects = await ProjectSubmission.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/projects/:id
// @desc    Get a single project submission by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await ProjectSubmission.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update a project submission by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProject = await ProjectSubmission.findByIdAndUpdate(
      req.params.id,
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project submission by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await ProjectSubmission.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
