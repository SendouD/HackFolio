const express = require("express");
const router = express.Router();
const Hackathon = require("../models/hackathon_full_details"); // Main Hackathon model
const Participants = require("../models/hackathon_participants_schema"); // Participant model

// Utility to compute status
const getHackathonStatus = (hackathon) => {
  const today = new Date().toISOString().split("T")[0];
  return new Date(hackathon.toDate) >= new Date(today) ? "ongoing" : "completed";
};

// API Endpoint: Fetch Admin Stats
router.get("/admin", async (req, res) => {
  try {
    const allHackathons = await Hackathon.find();
    const participants = await Participants.find();

    let ongoing = 0, completed = 0;
    const domainStats = {};

    allHackathons.forEach((h) => {
      const status = getHackathonStatus(h);
      if (status === "ongoing") ongoing++;
      else completed++;

      const domain = h.tech.replace("/", "_").toLowerCase();
      if (!domainStats[domain]) {
        domainStats[domain] = { ongoing: 0, completed: 0, total: 0 };
      }

      domainStats[domain].total += 1;
      if (status === "ongoing") domainStats[domain].ongoing += 1;
      else domainStats[domain].completed += 1;
    });

    res.json({
      ongoingCount: ongoing,
      completedCount: completed,
      totalParticipants: participants.length,
      domainStats,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
