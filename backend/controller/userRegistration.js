const express = require('express');
const authController = express.Router();
const User = require('../models/user_Schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');  // Missing crypto import
const nodemailer = require('nodemailer');
let otpStore = {};  // OTP store in memory (use Redis in production)

const mailSender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'dumdum69069@gmail.com',
        pass: 'umbq xbkr bczc iyxf'
    }
});

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
            return res.status(400).json({ Error: `Error saving data to Database ${e}` });
        }
    });

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

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24, 
            });

            return res.status(200).json({ message: 'Success',username:user.username,email:user.email});
        } catch (e) {
            return res.status(400).json({ Error: "Error signing in!" });
        }
    });
    // authController.route('/checkmail').post(async(req,res)=>{
    //     try{
          
    //     const id=mailSender.donation_success(req.body.email,req.body.amount);
    //     return res.status(200).json({id:id});}
    //     catch(error){
    //         console.log(error)
    //     }


    // })

// Fetch All Users Route
authController.route('/logout')
    .get(async (req, res) => {

            res.clearCookie("jwt")
            return res.status(200).json({message:"Successfully logged out"});
    
    });

module.exports = authController;