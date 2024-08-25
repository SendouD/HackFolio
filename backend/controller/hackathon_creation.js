const express = require('express');
const hack_create = express.Router();
const hackathon_form = require('../models/org_form_Schema');
const hackFullDetails = require('../models/hackathon_full_details')

hack_create.route("/hackathonCreate")
    .get(async(req,res) => {

    })
    .post(async(req,res) => {
        const {hackName,uniName} = req.body
        let id = "";
        try{
            const newHackathonData = new hackathon_form({
                hackathonName: hackName,
                uniName: uniName,
                completelyFilled: false,
            });
            await newHackathonData.save();
            hackathon_form.find({hackathonName: hackName}).then((data)=> id=data._id) 
            res.status(200).json({id : {id}});
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
    })

hack_create.route("/hackathonCreate/:id")
    .get(async(req,res) => {
        const id =  req.params.id;
    })
    .post(async(req,res) => {
        const { hackName, uniName, tech, teamSize, partProf, contactLinks, fromDate, toDate, prizesDesc } = req.body;
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
            })
            const data = await newHackFullDetails.save()
            res.status(200).json({data: data})
        } catch(e) {
            res.status(400).json({Error: "Error saving data to Database!"});
        }
    })

module.exports = hack_create;