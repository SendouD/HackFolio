const express = require('express');
const user_hack = express.Router();
const user_hack_model = require('../models/user_hackathons.js');

user_hack.route('/My-Hackathons')
    .get(async (req, res) => {
        
    });