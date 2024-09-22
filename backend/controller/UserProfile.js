const express = require('express');
const authController = express.Router();
const User = require('../models/user_Schema');

// Route to get user profile by username (excluding password)
authController.get('/',async(req,res)=>{
  return res.status(200).json({message:'hitttae'})
})
authController.get('/:username', async (req, res) => {
  

  try {
    const { username } = req.params;
    
    // Extract the username from the route params

    // Find the user by username, excluding the password field
    const user = await User.findOne({ username }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user details (password excluded)
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = authController;
