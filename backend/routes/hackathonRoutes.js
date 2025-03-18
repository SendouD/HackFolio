const express = require("express");
const HackathonDetails = require("../models/hackathon_full_details"); // Main Hackathon model
const HackathonParticipantsDetails = require("../models/hackathon_participants_schema"); // Participant model
const router = express.Router();

// Fetch all hackathons with participant details
router.get("/all", async (req, res) => {
  try {
    const hackathons = await HackathonDetails.find().lean();

    // Fetch and attach participant details for each hackathon
    const hackathonsWithParticipants = await Promise.all(
      hackathons.map(async (hackathon) => {
        const participants = await HackathonParticipantsDetails.find({
          hackathonName: hackathon.hackathonName,
        }).lean();
        return { ...hackathon, participants };
      })
    );

    res.status(200).json(hackathonsWithParticipants);
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    res.status(500).json({ message: "Error fetching hackathons", error });
  }
});

// Fetch hackathons by domain (tech) with participant details
router.get("/domain/:tech", async (req, res) => {
  try {
    let tech = req.params.tech.toLowerCase().trim().replace("_", "/");

    const hackathons = await HackathonDetails.find({
      tech: { $regex: tech, $options: "i" }, // Case-insensitive partial match
    })
      .select(
        "hackathonName uniName eventMode tech teamSize participantsProfile contactLinks fromDate toDate prizesDesc"
      )
      .lean();

    if (hackathons.length === 0) {
      return res.status(404).json({ message: `No hackathons found for '${tech}'` });
    }

    // Fetch and attach participant details for each filtered hackathon
    const hackathonsWithParticipants = await Promise.all(
      hackathons.map(async (hackathon) => {
        const participants = await HackathonParticipantsDetails.find({
          hackathonName: hackathon.hackathonName,
        }).lean();
        return { ...hackathon, participants };
      })
    );

    res.status(200).json(hackathonsWithParticipants);
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
