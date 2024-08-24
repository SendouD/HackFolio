const express = require('express');
const hack_create = express.Router();
const hackathon_form = require('../models/org_form_Schema');

hack_create.route("/hackathonCreate")
    .get(async(req,res) => {

    })
    .post(async(req,res) => {
        const {hackName,uniName} = req.body
        try{
            const newHackathonData = new hackathon_form({
                hackathonName: hackName,
                uniName: uniName,
            });
            await newHackathonData.save();
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
        res.status(200).json({Error: "Data successfully saved to database!"});
    })

module.exports = hack_create;