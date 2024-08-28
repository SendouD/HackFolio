const express = require('express');
const hack_create = express.Router();
const hackathon_form = require('../models/org_form_Schema');
const hackFullDetails = require('../models/hackathon_full_details');

hack_create.route('/')
    .get(async (req,res) => {
        let details;
        await hackFullDetails.find({}).then((data)=>details = data);
        return res.status(200).send(details);
    })

hack_create.route("/hackathonCreate")
    .get(async (req, res) => {
        
    })
    .post(async (req, res) => {
        const { hackName, uniName } = req.body;
        try {
            const existingHackathon = await hackathon_form.findOne({ hackathonName: hackName });
            if (existingHackathon) {
                return res.status(400).json({ Error: "Name already exists" });
            }

            const newHackathonData = new hackathon_form({
                hackathonName: hackName,
                uniName: uniName,
                completelyFilled: false,
            });
            await newHackathonData.save();
            const savedHackathon = await hackathon_form.findOne({ hackathonName: hackName });
            return res.status(200).json({ id: savedHackathon._id });
        } catch (e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create.route("/hackathonCreate/:id")
    .get(async(req,res) => {
        const id =  req.params.id;
        try {
            const data = await hackathon_form.findById(id);
            if (!data) {
                return res.status(404).json({ Error: "Hackathon not found!" });
            }
            return res.status(200).json(data);
        } catch (e) {
            return res.status(400).json({ Error: "Error fetching data from Database!" });
        }
    })
    .post(async(req,res) => {
        const { hackName, uniName, tech, teamSize, partProf, contactLinks, fromDate, toDate, prizesDesc } = req.body;
        const id = req.params.id;
        try{
            const newHackFullDetails = new hackFullDetails({
                hackathonName: hackName,
                uniName: uniName,
                tech: tech,
                teamSize: teamSize,
                participantsProfile: partProf,
                contactLinks: contactLinks,
                fromDate: fromDate,
                toDate: toDate,
                prizesDesc: prizesDesc,
            });
            const data = await newHackFullDetails.save();

            await hackathon_form.findByIdAndUpdate(id, { completelyFilled: true });

            res.status(200).json({ data: data });
        } catch(e) {
            res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

module.exports = hack_create;
