const express = require('express');
const authController = express.Router();
const User = require('../models/user_Schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');  // Missing crypto import
const nodemailer = require('nodemailer');
let otpStore = {};  // OTP store in memory (use Redis in production)
const chatStatusModel = require('../models/chat_status_model');
const chatUserSchema = require('../models/chat_user_schema');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and management
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         username:
 *           type: string
 *           description: User's unique username
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's hashed password
 */

const mailSender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.gmail_auth_mail,
        pass: process.env.gmail_auth_pass
    }
});

/**
 * @swagger
 * /userlogin/signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with the provided details
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: User already exists or error occurred
 */
// Sign-Up Route
authController.route('/signup')
    .post(async (req, res) => {
        const { username, firstName, lastName, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ Error: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });

            await newUser.save();
            
            const newChatStatusModel = new chatStatusModel({
                email,
                status: false,
                socketId: "",
            });
            await newChatStatusModel.save();

            const newChatUserSchema = new chatUserSchema({
                email,
                interactedEmails: [email],
            });
            await newChatUserSchema.save();

            return res.status(201).json({ id: newUser._id, username, email });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ Error: `Error saving data to Database ${e}` });
        }
    });

/**
 * @swagger
 * /userlogin/signin:
 *   post:
 *     summary: Sign in to user account
 *     description: Authenticate a user and generate a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: jwt=abcdef123456; Path=/; HttpOnly
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
// Sign-In Route
authController.route('/signin')
    .post(async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ Error: "User not found!" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ Error: "Invalid credentials!" });
            }

            const token = jwt.sign({ username: user.username, userId: user._id, email: user.email }, 'secret', { expiresIn: '1d' });

            return res.cookie('jwt', token, {
                httpOnly:true,
                secure:true,
                sameSite:'none',
                maxAge: 1000 * 60 * 60 * 24, 
            }).status(200).json({ message: 'Success',username:user.username,email:user.email});
        } catch (e) {
            return res.status(400).json({ Error: "Error signing in!" });
        }
    });

// Forgot Password Route
   /**
 * @swagger
 * /userlogin/forgotpassword:
 *   post:
 *     summary: Request password reset
 *     description: Send an OTP to the user's email for password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: OTP sent to email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP sent to email
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
// Forgot Password Route - Modified
authController.route('/forgotpassword')
.post(async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();

        // Store OTP in memory (should use Redis in production)
        otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };  // OTP valid for 10 minutes

        // Import the sendOtp function from your mail.js
        const { sendOtp } = require('./mail');

        // Send OTP to user's email
        await sendOtp(email, otp);

        return res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error('Error in forgot password route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

    /**
     * @swagger
     * /userlogin/verifyotp:
     *   post:
     *     summary: Verify OTP
     *     description: Verify the OTP sent to the user's email
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - otp
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *               otp:
     *                 type: string
     *     responses:
     *       200:
     *         description: OTP verified successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: OTP verified
     *       400:
     *         description: Invalid or expired OTP
     */
    authController.route('/verifyotp')
    .post((req, res) => {
        const { email, otp } = req.body;

        // Check if OTP exists and is not expired
        if (!otpStore[email] || otpStore[email].expiresAt < Date.now()) {
            return res.status(400).json({ message: 'OTP expired or invalid' });
        }

        if (otpStore[email].otp === otp) {
            return res.status(200).json({ message: 'OTP verified' });
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    });

    /**
     * @swagger
     * /userlogin/resetpassword:
     *   post:
     *     summary: Reset password
     *     description: Reset the user's password after OTP verification
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - otp
     *               - newPassword
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *               otp:
     *                 type: string
     *               newPassword:
     *                 type: string
     *                 format: password
     *     responses:
     *       200:
     *         description: Password reset successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Password reset successful
     *       400:
     *         description: Invalid or expired OTP
     */
    authController.route('/resetpassword')
    .post(async (req, res) => {
        const { email, otp, newPassword } = req.body;

        // Check if OTP is correct and not expired
        if (!otpStore[email] || otpStore[email].otp !== otp || otpStore[email].expiresAt < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password
        await User.updateOne({ email }, { password: hashedPassword });

        // Clear OTP after successful reset
        delete otpStore[email];

        return res.status(200).json({ message: 'Password reset successful' });
    });

    /**
     * @swagger
     * /userlogin/logout:
     *   get:
     *     summary: Logout user
     *     description: Logout the user by clearing the JWT cookie
     *     tags: [Authentication]
     *     responses:
     *       200:
     *         description: Successfully logged out
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Successfully logged out
     */
    authController.route('/logout')
    .get(async (req, res) => {
            res.clearCookie("jwt")
            return res.status(200).json({message:"Successfully logged out"});
    
    });

module.exports = authController;
