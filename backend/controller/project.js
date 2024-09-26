const express = require('express');
const hack_project = express.Router();
const isUser = require('../middleware/isUser');
const hackParticipantDetails = require('../models/hackathon_participants_schema');
const hackathonProjectsModel = require('../models/hackathon_projects_schema');

hack_project.route('/hackathonProject/:name')
    .get(isUser, async(req,res) => {
        const email = req.email;
        const {name} = req.params;
        
        try {
            const data = await hackParticipantDetails.findOne({email: email, hackathonName: name}).select('teamCode');
            const response = await hackathonProjectsModel.findOne({hackathonName: name, teamCode: data.teamCode});
            if(response) 
                return res.status(200).json({flag: true});
            else
                return res.status(200).json({flag: false});
        } catch (e) {
            res.status(400).json({Error: e});
        }
    })
    .post(isUser,async(req,res) => {
        const email = req.email;
        const {name} = req.params;
        let formData = req.body;

        console.log(formData);

        try {

            formData.hackathonName = name;
            const data = await hackParticipantDetails.findOne({email: email, hackathonName: name}).select('teamCode');
            formData.teamCode = data.teamCode;

            const response = await hackathonProjectsModel.findOne({hackathonName: name, teamCode: data.teamCode});
            if(!response) {
                const newHackathonProjects = await hackathonProjectsModel(formData);
                await newHackathonProjects.save();
                return res.status(200).json({msg: "successful"});                
            }
            else {
                return res.status(400).json({msg: "Project already submitted!"});     
            }
            
        } catch (e) {
            
            res.status(400).json({Error: e});
        }
    })

module.exports = hack_project