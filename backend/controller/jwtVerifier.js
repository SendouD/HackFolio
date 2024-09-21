const express = require('express');
const authController = express.Router();
const User = require('../models/User');
const isUser=require('../middleware/isUser')

authController.route('/')
    .get(isUser,async (req, res) => {
        try {
            return res.status(200).json({msg: "Success"});
        } catch (e) {
            return res.status(400).json({ Error: "Error fetching users from Database!" });
        }
    });

module.exports = authController;
