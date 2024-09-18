const express = require('express');
const Project = require('../models/project_form_Schema');
const isUser=require('../middleware/isUser')

const router = express.Router();

// GET request to fetch all project details or filter by userId or projectId

// POST request to create a new project
router.post('/',isUser, async (req, res) => {
 
  try {
   
    // Assuming userId is manually added or can be extracted from a JWT token
    const userId = req.userId;
    console.log(req.userId); // Example userId

    // Create a new project instance with the request body
    const project = new Project({ ...req.body, userId });

    // Save the project to the database
    await project.save();

    // Respond with success message and the created project
    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    // Handle validation or server errors
    console.error('Error creating project:', error);
    res.status(400).json({
      message: 'Error creating project',
      error: error.message,
    });
  }
});

module.exports = router;
