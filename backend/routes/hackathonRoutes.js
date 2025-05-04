const express = require("express");
const HackathonDetails = require("../models/hackathon_full_details"); // Main Hackathon model
const HackathonParticipantsDetails = require("../models/hackathon_participants_schema"); // Participant model
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hackathons
 *   description: API endpoints for managing hackathons
 *
 * components:
 *   schemas:
 *     Hackathon:
 *       type: object
 *       required:
 *         - hackathonName
 *         - uniName
 *         - fromDate
 *         - toDate
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         hackathonName:
 *           type: string
 *           description: Name of the hackathon
 *         uniName:
 *           type: string
 *           description: University or organization name
 *         eventMode:
 *           type: string
 *           description: Mode of event (online/offline/hybrid)
 *         tech:
 *           type: string
 *           description: Technology domain
 *         teamSize:
 *           type: string
 *           description: Maximum team size allowed
 *         participantsProfile:
 *           type: string
 *           description: Target participant profile
 *         contactLinks:
 *           type: array
 *           description: Contact information and links
 *         fromDate:
 *           type: string
 *           format: date
 *           description: Start date of hackathon
 *         toDate:
 *           type: string
 *           format: date
 *           description: End date of hackathon
 *         prizesDesc:
 *           type: string
 *           description: Description of prizes
 *     Participant:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         hackathonId:
 *           type: string
 *         hackathonName:
 *           type: string
 *         email:
 *           type: string
 *         teamCode:
 *           type: string
 *         teamName:
 *           type: string
 */

// Utility function to check hackathon status
const getHackathonStatus = (hackathon) => {
  const today = new Date().toISOString().split("T")[0];
  return new Date(hackathon.toDate) >= new Date(today)
    ? "ongoing"
    : "completed";
};

/**
 * @swagger
 * /hackathons/all:
 *   get:
 *     summary: Get all hackathons
 *     description: Retrieve a list of hackathons with optional status filtering
 *     tags: [Hackathons]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ongoing, completed]
 *         description: Filter hackathons by status
 *     responses:
 *       200:
 *         description: A list of hackathons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hackathon'
 *       500:
 *         description: Server error
 */
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
/**
 * @swagger
 * /hackathons/domain/{tech}:
 *   get:
 *     summary: Get hackathons by technology domain
 *     description: Retrieve hackathons filtered by technology domain with optional status filtering
 *     tags: [Hackathons]
 *     parameters:
 *       - in: path
 *         name: tech
 *         required: true
 *         schema:
 *           type: string
 *         description: Technology domain to filter by
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ongoing, completed, all]
 *         description: Filter hackathons by status
 *     responses:
 *       200:
 *         description: A list of hackathons in the specified domain
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hackathon'
 *       404:
 *         description: No hackathons found for the specified domain
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /hackathons/participants/{hackathonId}:
 *   get:
 *     summary: Get participants for a specific hackathon
 *     description: Retrieve all participants registered for a given hackathon
 *     tags: [Hackathons]
 *     parameters:
 *       - in: path
 *         name: hackathonId
 *         required: true
 *         schema:
 *           type: string
 *         description: Hackathon ID
 *     responses:
 *       200:
 *         description: List of participants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Participant'
 *       404:
 *         description: No participants found for this hackathon
 *       500:
 *         description: Server error
 */
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
/**
 * @swagger
 * /hackathons/stats:
 *   get:
 *     summary: Get hackathon statistics
 *     description: Retrieve overall statistics for hackathons
 *     tags: [Hackathons]
 *     responses:
 *       200:
 *         description: Hackathon statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalHackathons:
 *                   type: integer
 *                 totalOngoing:
 *                   type: integer
 *                 completedHackathons:
 *                   type: integer
 *                 totalParticipants:
 *                   type: integer
 *                 domains:
 *                   type: object
 *       500:
 *         description: Server error
 */
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
