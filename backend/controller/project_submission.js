const express = require('express');
const Project=require('../models/project_form_Schema');

const router = express.Router();



router.post('/', async(req, res) => {
  try {
    // Create a new project instance with the request body
    const project = new Project(req.body);

    // Save the project to the database
    await project.save();

    // Respond with success message and the created project
    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    // Handle validation or server errors
    console.error('Error creating project:', error);
    res.status(400).json({
      message: 'Error creating project',
      error: error.message
    });
  }
 
});

module.exports = router;
