const express = require('express');
const hack_create = express.Router();
const hackathon_form = require('../models/org_form_Schema');
const hackWebDetails = require('../models/hackathon_webpage_details');
const hackFullDetails = require('../models/hackathon_full_details');
const isUser = require('../middleware/isUser');

hack_create.route('/')
    .get(async (req,res) => {
        const filledForms = await hackathon_form.find({ completelyFilled: true });
        const filledFormNames = filledForms.map(form => form.hackathonName);
        const details = await hackFullDetails.find({ hackathonName: { $in: filledFormNames } });
        return res.status(200).send(details);
    })

hack_create.route("/hackathonCreate")
    .get(async (req, res) => {
        
    })
    .post(isUser,async (req, res) => {
        const { hackName, uniName } = req.body;
        try {
            const existingHackathon = await hackathon_form.findOne({ hackathonName: hackName });
            if (existingHackathon) {
                return res.status(400).json({ Error: "Name already exists" });
            }

            const newHackathonData = new hackathon_form({
                email: req.email,
                hackathonName: hackName,
                uniName: uniName,
                completelyFilled: false,
            });
            await newHackathonData.save();
            const savedHackathon = await hackathon_form.findOne({ hackathonName: hackName });
            return res.status(200).json({ name: savedHackathon.hackathonName });
        } catch (e) {
            return res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create.route("/hackathonCreate/:name/1")
    .get(async(req,res) => {
        const name =  req.params.name;
        try {
            const data = await hackathon_form.findOne({hackathonName: name});
            if (!data) {
                return res.status(404).json({ Error: "Hackathon not found!" });
            }
            return res.status(200).json(data);
        } catch (e) {
            return res.status(400).json({ Error: "Error fetching data from Database!" });
        }
    })
    .post(async(req,res) => {
        const { hackName, uniName, eventMode, tech, teamSize, partProf, contactLinks, fromDate, toDate, prizesDesc } = req.body;
        const name = req.params.name;
        try{
            const newHackFullDetails = new hackFullDetails({
                hackathonName: hackName,
                uniName: uniName,
                eventMode: eventMode,
                tech: tech,
                teamSize: teamSize,
                participantsProfile: partProf,
                contactLinks: contactLinks,
                fromDate: fromDate,
                toDate: toDate,
                prizesDesc: prizesDesc,
            });
            const data = await newHackFullDetails.save();

            await hackathon_form.findOneAndUpdate({hackathonName: name}, { step: 1});

            res.status(200).json({ data: data });
        } catch(e) {
            res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create.route("/hackathonCreate/:name/2")
    .get(async(req, res) => {
        
    })
    .post(async(req,res) => {
        const { aboutHack, aboutPrize } = req.body;
        const name = req.params.name;
        try {
            const newHackWebDetails = new hackWebDetails({
                hackathonName: name,
                aboutHack: aboutHack,
                aboutPrize: aboutPrize,
            });
            const data = await newHackWebDetails.save();
            await hackathon_form.findOneAndUpdate({ hackathonName: name }, { step: 2, completelyFilled: true });

            res.status(200).json({data: data})

        } catch(e) {
            res.status(400).json({ Error: "Error saving data to Database!" });
        }
    });

hack_create.route("/organizedHackathons")
    .get(isUser, async(req,res) => {
        const email = req.email;
        const myForms = await hackathon_form.find({ email: email });
        const myFormNames = myForms.map(form => form.hackathonName);
        const details = await hackFullDetails.find({ hackathonName: { $in: myFormNames } });
        return res.status(200).send(details);
    });

hack_create.route("/updateHackDetails/:name")
    .get(isUser, async(req,res) => {
        const name = req.params.name;
        try {
            const data = await hackFullDetails.findOne({hackathonName: name});
            res.status(200).json({data: data});
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
    })
    .post(isUser, async(req,res) => {
        let flag = 0;
        const name = req.params.name;
        const { uniName, eventMode, tech, teamSize, partProf, contactLinks, from, to, prizesDesc } = req.body;
        const updatedData = {
            hackathonName: name,
            uniName: uniName,
            eventMode: eventMode,
            tech: tech,
            teamSize: teamSize,
            participantsProfile: partProf,
            contactLinks: contactLinks,
            fromDate: from,
            toDate: to,
            prizesDesc: prizesDesc,
        };
        try{
            await hackathon_form.findOneAndUpdate({ hackathonName: name }, { uniName: uniName });
            await hackFullDetails.findOneAndUpdate({ hackathonName: name }, updatedData);

            res.status(200).json({msg: "Success"});
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
    })

hack_create.route("/updateHackWebsite/:name")
    .get(async(req,res) => {
        const name = req.params.name;
        try {
            const data = await hackWebDetails.findOne({hackathonName: name});
            res.status(200).json({data: data});
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
    })
    .post(async(req,res) => {
        const name = req.params.name;
        const { aboutHack, aboutPrize } = req.body;

        try {
            await hackWebDetails.findOneAndUpdate({hackathonName: name}, {aboutHack: aboutHack, aboutPrize: aboutPrize});
            
            res.status(200).json({msg: "success"})
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
    })

module.exports = hack_create;
