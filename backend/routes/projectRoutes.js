const express = require("express");
const HackathonProjects = require("../models/projectForm_Schema"); // Import project model
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API endpoints for managing hackathon projects
 *
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         username:
 *           type: string
 *           description: Username of project owner
 *         projectName:
 *           type: string
 *           description: Name of the project
 *         tagline:
 *           type: string
 *           description: Short tagline or slogan for the project
 *         problem:
 *           type: string
 *           description: Problem statement the project addresses
 *         challenges:
 *           type: string
 *           description: Challenges faced during development
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *           description: Technologies used in the project
 *         links:
 *           type: object
 *           description: Related links (GitHub, demo, etc.)
 *         coverUrl:
 *           type: string
 *           description: URL to project cover image
 *         logoUrl:
 *           type: string
 *           description: URL to project logo
 *         teamCode:
 *           type: string
 *           description: Team code for the project
 */

/**
 * @swagger
 * /projects/all:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all hackathon projects with selected attributes
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Server error
 */
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
