const express = require('express');
const hack_register = express.Router();
const hackParticipantDetails = require('../models/hackathon_participants_schema');

hack_register.route('/registerForHackathon/:name')
    .get(async(req, res) => {
        const { name } = req.params.name;

        try {
            const data = await hackParticipantDetails.find({hackathonName: name, email: formData.email});
            res.status(200).json({data: data})
        } catch (error) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    })
    .post(async(req, res) => {
        const { name } = req.params.name;
        const formData = req.body;
        try{
            const flag = await hackParticipantDetails.find({hackathonName: name, email: formData.email});
            if(!flag) {
                const newHackParticipantDetails = await hackParticipantDetails(formData, {hackathonName: name});
                await newHackParticipantDetails.save();
                return res.status(200).json({ Error: "Registered" });
            }
            else {
                console.log("Already Registered");
                return res.status(200).json({ Error: "Already Registered" });
            }
        } catch(e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }

    })

module.exports = hack_register;