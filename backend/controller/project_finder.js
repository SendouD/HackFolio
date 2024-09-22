const express = require("express");
const Project = require("../models/projectForm_Schema");
const isUser = require("../middleware/isUser");

const router = express.Router();
router.post('/submitproject',isUser, async (req, res) => {
 
  try {
   
    const username = req.username;
  

    const project = new Project({ ...req.body, username });

    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
   
    console.error('Error creating project:', error);
    res.status(400).json({
      message: 'Error creating project',
      error: error.message,
    });
  }
});

router.get("/userprojects", isUser, async (req, res) => {
  try {
    let username = req.username;

    const projects = await Project.find({ username: username });
    
    if (projects.length === 0) {
      return res.status(404).json({
        message: "No projects found",
      });
    }

    res.status(200).json(projects);
  } catch (error) {
 
    console.error("Error fetching project details:", error);
    res.status(500).json({
      message: "Error fetching project details",
      error: error.message,
    });
  }
});
router.get("/userprojects/:username", async (req, res) => {
  try {
    let username = req.params.username;

    const projects = await Project.find({ username: username });
    
    if (projects.length === 0) {
      return res.status(404).json({
        message: "No projects found",
      });
    }

    res.status(200).json(projects);
  } catch (error) {
  
    console.error("Error fetching project details:", error);
    res.status(500).json({
      message: "Error fetching project details",
      error: error.message,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    let projectId = req.params.id;

    const projects = await Project.findOne({ _id: projectId });
    if (projects.length === 0) {
      return res.status(404).json({
        message: "No projects found",
      });
    }

    res.status(200).json(projects);
  } catch (error) {
    // Handle errors during retrieval
    console.error("Error fetching project details:", error);
    res.status(500).json({
      message: "Error fetching project details",
      error: error.message,
    });
  }
});
router.get("/hackathonprojects/:id", isUser, async (req, res) => {
  try {
    let userId = req.userId;

    const projects = await Project.find({ userId: userId });
    if (projects.length === 0) {
      return res.status(404).json({
        message: "No projects found",
      });
    }

    res.status(200).json(projects);
  } catch (error) {
    // Handle errors during retrieval
    console.error("Error fetching project details:", error);
    res.status(500).json({
      message: "Error fetching project details",
      error: error.message,
    });
  }
});
module.exports = router;
