const express = require("express");
const HackathonDetails = require("../models/hackathon_full_details"); // Main Hackathon model
const HackathonParticipantsDetails = require("../models/hackathon_participants_schema"); // Participant model
const router = express.Router();

// Utility function to check hackathon status
const getHackathonStatus = (hackathon) => {
  const today = new Date().toISOString().split("T")[0];
  return new Date(hackathon.toDate) >= new Date(today)
    ? "ongoing"
    : "completed";
};

router.get("/all", async (req, res) => {
  try {
    const { status } = req.query; // Get the filter query from the request
    const today = new Date().toISOString().split("T")[0];

    let query = {};
    if (status === "ongoing") {
      query.toDate = { $gte: today }; // Hackathons that are still ongoing
    } else if (status === "completed") {
      query.toDate = { $lt: today }; // Hackathons that are already completed
    }

    // Fetch hackathons based on query
    const hackathons = await HackathonDetails.find(query).lean();

    const hackathonIds = hackathons.map((h) => h._id);
    const participants = await HackathonParticipantsDetails.find({
      hackathonId: { $in: hackathonIds },
    }).lean();

    // Merge hackathons with participant details
    const hackathonDetails = hackathons.map((hackathon) => ({
      ...hackathon,
      participants: participants.filter(
        (p) => p.hackathonId.toString() === hackathon._id.toString()
      ),
    }));

    res.json(hackathonDetails);
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch hackathons by domain (tech) with participant details and optional status filtering
router.get("/domain/:tech", async (req, res) => {
  try {
    let tech = req.params.tech.toLowerCase().trim().replace("_", "/");
    const { status } = req.query;

    let hackathons = await HackathonDetails.find({
      tech: { $regex: tech, $options: "i" }, // Case-insensitive partial match
    })
      .select(
        "hackathonName uniName eventMode tech teamSize participantsProfile contactLinks fromDate toDate prizesDesc"
      )
      .lean();

    if (hackathons.length === 0) {
      return res
        .status(404)
        .json({ message: `No hackathons found for '${tech}'` });
    }

    // Filter based on status if provided
    if (status && status !== "all") {
      hackathons = hackathons.filter(
        (hackathon) => getHackathonStatus(hackathon) === status
      );
    }

    // Fetch and attach participant details for each filtered hackathon
    const hackathonsWithParticipants = await Promise.all(
      hackathons.map(async (hackathon) => {
        const participants = await HackathonParticipantsDetails.find({
          hackathonName: hackathon.hackathonName,
        }).lean();
        return {
          ...hackathon,
          participants,
          status: getHackathonStatus(hackathon),
        };
      })
    );

    res.status(200).json(hackathonsWithParticipants);
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Add this route below your existing routes

router.get("/participants/:hackathonId", async (req, res) => {
  const { hackathonId } = req.params;

  try {
    const participants = await HackathonParticipantsDetails.find({
      hackathonId,
    }).lean();

    if (!participants || participants.length === 0) {
      return res
        .status(404)
        .json({ message: "No participants found for this hackathon." });
    }

    res.status(200).json(participants);
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ message: "Failed to fetch participants." });
  }
});
// GET /api/hackathons/stats - Admin Dashboard Stats
router.get("/stats", async (req, res) => {
    try {
      // 1. Fetch all hackathons
      const allHackathons = await HackathonDetails.find().lean();
      const today = new Date();
  
      // 2. Count all participant documents
      const totalParticipants = await HackathonParticipantsDetails.countDocuments();
  
      // 3. Initialize stats object with the names your frontend uses:
      const stats = {
        totalHackathons: 0,
        totalOngoing: 0,
        completedHackathons: 0,
        totalParticipants,
        domains: {},
      };
  
      // 4. Build up per-domain counts, and overall totals
      allHackathons.forEach(hack => {
        // fallback to tech if domain is missing
        const rawDomain = hack.domain || hack.tech || "other";
        const domainKey = rawDomain.toLowerCase().replace(/\s+/g, "_").replace("/", "_");
  
        // determine if ongoing
        const isOngoing = new Date(hack.toDate) >= today;
  
        // ensure domain bucket exists
        if (!stats.domains[domainKey]) {
          stats.domains[domainKey] = { total: 0, ongoing: 0, completed: 0 };
        }
  
        // increment counts
        stats.domains[domainKey].total++;
        stats.totalHackathons++;
  
        if (isOngoing) {
          stats.domains[domainKey].ongoing++;
          stats.totalOngoing++;
        } else {
          stats.domains[domainKey].completed++;
          stats.completedHackathons++;
        }
      });
  
      // 5. Return in one shot
      res.json(stats);
  
    } catch (error) {
      console.error("Error computing stats:", error);
      res.status(500).json({ error: "Failed to compute statistics" });
    }
  });
  
module.exports = router;
