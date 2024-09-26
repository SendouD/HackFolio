const express = require('express');
const hack_project = express.Router();
const isUser = require('../middleware/isUser');
const hackParticipantDetails = require('../models/hackathon_participants_schema');
const projectSchema = require('../models/projectForm_Schema');


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
        const username = req.username;
        const {name} = req.params;
        let formData = req.body;
        console.log(username)

        try {


            formData.hackathonName = name;
            const data = await hackParticipantDetails.findOne({email: email, hackathonName: name}).select('teamCode');
            if(!data) return res.status(200).json({msg: "participant is not in team or not a participant!"});
            formData.teamCode = data.teamCode;

            const response = await projectSchema.findOne({hackathonName: name, teamCode: data.teamCode});
            if(!response) {
                const newHackathonProjects = await projectSchema({...formData,username});
                console.log(newHackathonProjects);
                await newHackathonProjects.save();
                return res.status(200).json({msg: "successful"});                
            }
            else {
                console.log("submitted lready");
                return res.status(400).json({msg: "Project already submitted!"});     
            }
            
        } catch (e) {
            console.log(e);
            res.status(400).json({Error: e});
        }
    })
    
hack_project.route('/hackathonProject/getallprojects/:name')
    .get(isUser,async(req,res)=>{
        const {name} = req.params;
        const response = await hackathonProjectsModel.findOne({hackathonName: name});
        console.log(response)
 

    })

module.exports = hack_project