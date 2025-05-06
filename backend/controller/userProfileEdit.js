/**
 * @swagger
 * tags:
 *   name: UserProfile
 *   description: User profile management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User's unique identifier
 *         email:
 *           type: string
 *           description: User's email address
 *         name:
 *           type: string
 *           description: User's full name
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *           description: User's roles in the system
 *         education:
 *           type: object
 *           description: User's educational details
 */

const express = require('express');
const authController = express.Router();
const User = require('../models/user_Schema');

/**
 * @swagger
 * /profile/{id}/1:
 *   get:
 *     summary: Get user profile by username
 *     tags: [UserProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's username
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
authController.get('/:id/1', async (req, res) => {
  try {
    const { id } = req.params;
    if(!id) return res.status(404).json({message: "Id not found"});

    // Find the user by ID, excluding the password field
    const user = await User.findOne({username: id}).select('-password');

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
 * /profile/{id}/2:
 *   get:
 *     summary: Get user's education details
 *     tags: [UserProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's username
 *     responses:
 *       200:
 *         description: User's education details
 *       404:
 *         description: User or education details not found
 *       500:
 *         description: Server error
 */
authController.get('/:id/2', async (req, res) => {
  try {
    const { id } = req.params; // Get the username from the URL parameters
    
    if (!id) return res.status(404).json({ message: "Id not found" });

    // Find the user by username, excluding the password field
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
 * /profile/{id}/1:
 *   put:
 *     summary: Update user profile information
 *     tags: [UserProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's username
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
authController.put('/:id/1', async (req, res) => {
  try {
    const { id } = req.params; // Get the username (or ID) from the URL parameters
    const updates = req.body;  // Data to update from the request body

    

    // Find the user by username (ID)
    const user = await User.findOne({ username: id }).select('-password');

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
 * /profile/{id}/2:
 *   put:
 *     summary: Update user's education details
 *     tags: [UserProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's username
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               school:
 *                 type: string
 *               degree:
 *                 type: string
 *               field:
 *                 type: string
 *               startYear:
 *                 type: string
 *               endYear:
 *                 type: string
 *     responses:
 *       200:
 *         description: Education details updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
authController.put('/:id/2', async (req, res) => {
  try {
    const { id } = req.params; // Get the username (or ID) from the URL parameters
    const updates = req.body;  // Data to update from the request body

    

    // Find the user by username (ID)
    const user = await User.findOne({ username: id }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's fields with the data provided in req.body
    Object.keys(updates).forEach((key) => {
      user['education'][key] = updates[key];
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


module.exports = authController;
