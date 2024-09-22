const express = require('express');
const authController = express.Router();
const User = require('../models/user_Schema');
const isUser=require('../middleware/isUser')

authController.route('/')
    .get(isUser,async (req, res) => {
        roles=req.roles;
        
        try {
            return res.status(200).json({msg: "Success",roles:roles});
        } catch (e) {
            return res.status(400).json({ Error: "Error fetching users from Database!" });
        }
    });

module.exports = authController;
