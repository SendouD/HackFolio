const express = require('express');
const judges = express.Router();
const HackathonDetails = require('../models/hackathon_full_details');
const isUser = require('../middleware/isUser');

// Route to add judges to a hackathon
judges.post('/addjudge', async (req, res) => {
    const { name, judges } = req.body;
    if (!name || !judges || !Array.isArray(judges)) {
        return res.status(400).json({ message: "Invalid request data" });
    }
    try {
        const updatedHackathon = await HackathonDetails.findOneAndUpdate(
            { hackathonName: name }, // Find by hackathon name
            { $addToSet: { judges: { $each: judges } } }, // Add judges without duplicates
            { new: true } // Return the updated document
        );

        if (!updatedHackathon) {
            return res.status(404).json({ message: "Hackathon not found" });
        }

        res.status(200).json({ message: "Judges added successfully", hackathon: updatedHackathon });
    } catch (error) {
        console.error("Error adding judges:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to get all judges for a specific hackathon
judges.get('/getjudges/:name', async (req, res) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({ message: "Hackathon name is required" });
    }

    try {
        const hackathon = await HackathonDetails.findOne({ hackathonName: name }, 'judges'); // Only retrieve judges field

        if (!hackathon) {
            return res.status(404).json({ message: "Hackathon not found" });
        }

        res.status(200).json({ judges: hackathon.judges });
    } catch (error) {
        console.error("Error retrieving judges:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Check if the user is a judge for a specific hackathon
judges.get('/isjudge/:name', isUser, async (req, res) => {
    const { name } = req.params;
    const email = req.email; // Extracted from the JWT token (assuming isUser middleware sets this)

    try {
        // Find the hackathon and its judges
        const hackathon = await HackathonDetails.findOne({ hackathonName: name }, 'judges');

        if (!hackathon) {
            return res.status(404).json({ message: "Hackathon not found" });
        }

        // Check if the user's email is in the list of judges
        const isJudge = hackathon.judges.includes(email);

        if (isJudge) {
            return res.status(200).json({ message: "User is a judge" });
        } else {
            return res.status(403).json({ message: "User is not a judge" });
        }
    } catch (error) {
        console.error("Error checking judge status:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Route to add judging criteria for a hackathon
judges.post('/addcriteria', async (req, res) => {
    const { name, criteria } = req.body;

    // Log the incoming criteria for debugging

    // Check for valid input
    if (!name || !criteria || !Array.isArray(criteria)) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    // Convert maxMarks to a number for each criteria
    const formattedCriteria = criteria.map(criterion => ({
        name: criterion.name,
        maxMarks: Number(criterion.maxMarks) // Convert to number
    }));

    try {
        // Find and update the hackathon document
        const updatedHackathon = await HackathonDetails.findOneAndUpdate(
            { hackathonName: name }, // Find by hackathon name
            { $push: { criteria: { $each: formattedCriteria } } }, // Add criteria
            { new: true } // Return the updated document
        );

        if (!updatedHackathon) {
            return res.status(404).json({ message: "Hackathon not found" });
        }

        res.status(200).json({ message: "Criteria added successfully", hackathon: updatedHackathon });
    } catch (error) {
        console.error("Error adding criteria:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Route to get all criteria for a specific hackathon
judges.get('/getcriteria/:name', async (req, res) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({ message: "Hackathon name is required" });
    }

    try {
        const hackathon = await HackathonDetails.findOne({ hackathonName: name }, 'criteria'); // Only retrieve criteria field

        if (!hackathon) {
            return res.status(404).json({ message: "Hackathon not found" });
        }

        res.status(200).json({ criteria: hackathon.criteria });
    } catch (error) {
        console.error("Error retrieving criteria:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = judges;
