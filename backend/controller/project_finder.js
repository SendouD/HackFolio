const express = require("express");
const Project = require("../models/project_form_Schema");
const isUser = require("../middleware/isUser");

const router = express.Router();

router.get("/userprojects", isUser, async (req, res) => {
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
