const express = require('express');
const Project = require('../models/project_form_Schema');
const isUser=require('../middleware/isUser')

const router = express.Router();



router.get('/userproject',isUser,async (req, res) => {
  console.log("hit")
    try {
   
      
      let userId=req.userId;
      console.log(req.userId);
      
    
      const projects = await Project.find({userId:userId});
      if (projects.length === 0) {
        return res.status(404).json({
          message: 'No projects found',
        });
      }
      console.log(projects);
      res.status(200).json(projects);
    } catch (error) {
      // Handle errors during retrieval
      console.error('Error fetching project details:', error);
      res.status(500).json({
        message: 'Error fetching project details',
        error: error.message,
      });
    }
  });
  module.exports = router;
