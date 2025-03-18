const express = require("express");
const HackathonProjects = require("../models/projectForm_Schema"); // Import project model
const router = express.Router();

// Fetch all projects with selected attributes
router.get("/all", async (req, res) => {
  try {
    const projects = await HackathonProjects.find()
      .select("username projectName tagline  problem challenges technologies links coverUrl logoUrl teamCode")
      .lean();

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects", error });
  }
});

module.exports = router;
