const express = require('express');
const hack_project = express.Router();
const isUser = require('../middleware/isUser');
const hackParticipantDetails = require('../models/hackathon_participants_schema');
const projectSchema = require('../models/projectForm_Schema');
const { CostExplorer } = require('aws-sdk');

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API endpoints for managing hackathon projects
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectSubmission:
 *       type: object
 *       required:
 *         - projectName
 *         - tagline
 *         - problem
 *         - technologies
 *       properties:
 *         projectName:
 *           type: string
 *           description: Name of the project
 *         tagline:
 *           type: string
 *           description: Brief description or tagline for the project
 *         problem:
 *           type: string
 *           description: Problem statement the project addresses
 *         challenges:
 *           type: string
 *           description: Challenges faced during development
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *           description: Technologies used in the project
 *         links:
 *           type: object
 *           description: Related links (GitHub, demo, etc.)
 *         coverUrl:
 *           type: string
 *           description: URL to project cover image
 *         logoUrl:
 *           type: string
 *           description: URL to project logo
 */


/**
 * @swagger
 * /project/hackathonProject/{name}:
 *   get:
 *     summary: Check if a project is submitted
 *     description: Checks if the user has already submitted a project for the specified hackathon
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the hackathon
 *     responses:
 *       200:
 *         description: Returns whether a project is submitted or not
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 flag:
 *                   type: boolean
 *                   description: Whether a project is submitted (true) or not (false)
 *       400:
 *         description: Error occurred
 */
hack_project.route('/hackathonProject/:name')
    .get(isUser, async(req,res) => {
        const email = req.email;
        const {name} = req.params;
        
        try {
            const data = await hackParticipantDetails.findOne({email: email, hackathonName: name}).select('teamCode');
            if(!data) return res.status(200).json({flag: false});
            const response = await projectSchema.findOne({hackathonName: name, teamCode: data.teamCode});
            if(response) 
                return res.status(200).json({flag: true});
            else
                return res.status(200).json({flag: false});
        } catch (e) {
            res.status(400).json({Error: e});
        }
    })
    /**
     * @swagger
     * /project/hackathonProject/{name}:
     *   post:
     *     summary: Submit a project
     *     description: Submit a project for the specified hackathon
     *     tags: [Projects]
     *     security:
     *       - cookieAuth: []
     *     parameters:
     *       - in: path
     *         name: name
     *         required: true
     *         schema:
     *           type: string
     *         description: Name of the hackathon
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ProjectSubmission'
     *     responses:
     *       200:
     *         description: Project submitted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 msg:
     *                   type: string
     *                   example: successful
     *       400:
     *         description: Project already submitted or error occurred
     */
    .post(isUser,async(req,res) => {
        const email = req.email;
        const username = req.username;
        const {name} = req.params;
        let formData = req.body;


        try {
            formData.hackathonName = name;
            const data = await hackParticipantDetails.findOne({email: email, hackathonName: name}).select('teamCode');
            if(!data) return res.status(200).json({msg: "participant is not in team or not a participant!"});
            formData.teamCode = data.teamCode;

            const response = await projectSchema.findOne({hackathonName: name, teamCode: data.teamCode});
            if(!response) {
                const newHackathonProjects = await projectSchema({...formData,username});
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
    
/**
 * @swagger
 * /project/hackathonProject/getallprojects/{name}:
 *   get:
 *     summary: Get all projects for a hackathon
 *     description: Retrieve all projects submitted for a specified hackathon
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the hackathon
 *     responses:
 *       200:
 *         description: List of projects
 *       404:
 *         description: No projects found
 *       500:
 *         description: Server error
 */
hack_project.route('/hackathonProject/getallprojects/:name')
    .get(isUser,async(req,res)=>{
        const {name} = req.params;
        const response = await projectSchema.findOne({hackathonName: name});
 

    })
    
/**
 * @swagger
 * /project/hackathonProject/judge/projects/{teamCode}:
 *   get:
 *     summary: Get project ID by team code
 *     description: Retrieve the project ID for a specified team code
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: teamCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Team code to look up
 *     responses:
 *       200:
 *         description: Project ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The project ID
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server error
 */
hack_project.route('/hackathonProject/judge/projects/:teamCode')
    .get(isUser, async (req, res) => {
        try {
            const {teamCode} = req.params;
            
            // Query to find the document by teamCode and only return the _id field
            const response = await projectSchema.findOne({ teamCode: teamCode }, '_id');
            
            
            if (response) {
                res.json({ id: response._id }); // Send only the object id
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });



module.exports = hack_project