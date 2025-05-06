const express = require('express');
const authController = express.Router();
const User = require('../models/user_Schema');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile and education management
 */


/**
 * @swagger
 * /userProfile/{id}/1:
 *   get:
 *     summary: Get user profile by username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

// Route to get user profile by ID (excluding password)
authController.get('/:id/1', async (req, res) => {
  try {
    const { id } = req.params; // Using 'id' as per the original code

    if(!id) return res.status(404).json({message: "Id not found"});

    // Find the user by username (using 'id' as the parameter)
    const user = await User.findOne({ username: id }).select('-password');

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


/**
 * @swagger
 * /userProfile/{id}/2:
 *   get:
 *     summary: Get user's education details
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user
 *     responses:
 *       200:
 *         description: Education details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Education details object
 *       404:
 *         description: User or education details not found
 */

// Route to get user's education details
authController.get('/:id/2', async (req, res) => {
  try {
    const { id } = req.params; // Get the username from the URL parameters
    
    if (!id) return res.status(404).json({ message: "Id not found" });

    // Find the user by username (using 'id' as the parameter)
    const user = await User.findOne({ username: id }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if education details exist
    if (!user.education || Object.keys(user.education).length === 0) {
      return res.status(404).json({ message: 'Education details not found' });
    }

    // Return the user's education details
    res.status(200).json(user.education);
  } catch (error) {
    console.error('Error fetching user education:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


/**
 * @swagger
 * /userProfile/{id}/1:
 *   put:
 *     summary: Update user profile by username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *               githubProfile:
 *                 type: string
 *               linkedinProfile:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               bio:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *               resume:
 *                 type: string
 *               workExperience:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       404:
 *         description: User not found
 */

// Route to update user profile by ID
authController.put('/:id/1', async (req, res) => {
  try {
    const { id } = req.params; // Get the username (or ID) from the URL parameters
    const updates = req.body;  // Data to update from the request body

    // Find the user by username (using 'id' as the parameter)
    const user = await User.findOne({ username: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's fields with the data provided in req.body
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    // Save the updated user data
    await user.save();

    // Return the updated user details (excluding the password)
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


/**
 * @swagger
 * /userProfile/{id}/2:
 *   put:
 *     summary: Update user's education details
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               degreeType:
 *                 type: string
 *               institution:
 *                 type: string
 *               fieldOfStudy:
 *                 type: string
 *               graduationMonth:
 *                 type: string
 *               graduationYear:
 *                 type: integer
 *               certificationLinks:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Education details updated successfully
 *       404:
 *         description: User not found
 */

// Route to update user's education details by ID
authController.put('/:id/2', async (req, res) => {
  try {
    const { id } = req.params; // Get the username (or ID) from the URL parameters
    const updates = req.body;  // Data to update from the request body

    // Find the user by username (using 'id' as the parameter)
    const user = await User.findOne({ username: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's education details
    Object.keys(updates).forEach((key) => {
      user['education'][key] = updates[key];
    });

    // Save the updated user data
    await user.save();

    // Return the updated user details (excluding the password)
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user education details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = authController;