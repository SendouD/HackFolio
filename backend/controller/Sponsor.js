const express = require('express');
const Sponsor = require('../models/sponser_Schema');
const isUser = require('../middleware/isUser');
const User = require('../models/user_Schema');
const jwt = require('jsonwebtoken');
const isAdmin = require('../middleware/isAdmin');
const redisClient = require('../middleware/redisClient');

const router = express.Router();

// Helper: Cache setter
const cacheData = async (key, data, ttl = 3600) => {
  await redisClient.set(key, JSON.stringify(data), { EX: ttl });
};

// POST - Create sponsor
router.post('/', isUser, async (req, res) => {
  try {
    const userName = req.username;
    const sponsorData = { ...req.body, userName };
    const sponsor = new Sponsor(sponsorData);
    await sponsor.save();

    // Invalidate relevant cache
    await redisClient.del('verifiedSponsors');
    await redisClient.del('pendingSponsors');

    res.status(201).json({
      message: 'Sponsor created successfully',
      sponsor,
    });
  } catch (error) {
    console.error('Error creating sponsor:', error);
    res.status(400).json({
      message: 'Error creating sponsor',
      error: error.message,
    });
  }
});

// GET - Get sponsor by company name
router.get('/user/:companyName', async (req, res) => {
  const { companyName } = req.params;
  try {
    const sponsor = await Sponsor.findOne({
      companyName: { $regex: new RegExp(companyName, "i") }
    });

    if (!sponsor) return res.status(202).json({ message: 'Sponsor not found' });
    res.status(200).json(sponsor);
  } catch (error) {
    console.error('Error fetching sponsor:', error);
    res.status(500).json({ message: 'Error fetching sponsor', error: error.message });
  }
});

// GET - Admin Dashboard (Pending sponsors)
router.get('/adminDash', async (req, res) => {
  try {
    const cacheKey = 'pendingSponsors';
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.status(200).json(JSON.parse(cached));

    const sponsors = await Sponsor.find({ verificationStatus: 'Pending' });

    await cacheData(cacheKey, sponsors);
    res.status(200).json(sponsors);
  } catch (error) {
    console.error('Error fetching sponsor details:', error);
    res.status(500).json({ message: 'Error fetching sponsor details', error: error.message });
  }
});

// PATCH - Admin verify sponsor
router.patch('/admin/verify/:companyName', isAdmin, async (req, res) => {
  const { companyName } = req.params;
  try {
    const sponsor = await Sponsor.findOneAndUpdate(
      { companyName },
      { verificationStatus: req.body.verificationStatus },
      { new: true }
    );

    if (!sponsor) return res.status(202).json({ message: 'Sponsor not found' });

    const user = await User.findOneAndUpdate(
      { username: sponsor.userName },
      { $addToSet: { roles: "Sponsor" } },
      { new: true }
    );

    if (!user) return res.status(202).json({ message: 'User not found' });

    // Invalidate relevant cache
    await redisClient.del('verifiedSponsors');
    await redisClient.del('pendingSponsors');

    res.status(200).json(sponsor);
  } catch (error) {
    console.error('Error verifying sponsor:', error);
    res.status(500).json({ message: 'Error verifying sponsor', error: error.message });
  }
});

// PATCH - Admin decline sponsor
router.patch('/admin/decline/:companyName', isAdmin, async (req, res) => {
  const { companyName } = req.params;
  try {
    const sponsor = await Sponsor.findOneAndUpdate(
      { companyName },
      { verificationStatus: req.body.verificationStatus },
      { new: true }
    );

    if (!sponsor) return res.status(202).json({ message: 'Sponsor not found' });

    // Invalidate relevant cache
    await redisClient.del('verifiedSponsors');
    await redisClient.del('pendingSponsors');

    res.status(200).json(sponsor);
  } catch (error) {
    console.error('Error declining sponsor:', error);
    res.status(500).json({ message: 'Error declining sponsor', error: error.message });
  }
});

// GET - Public verified sponsors
router.get('/', async (req, res) => {
  try {
    const cacheKey = 'verifiedSponsors';
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.status(200).json(JSON.parse(cached));

    const sponsors = await Sponsor.find({ verificationStatus: 'Verified' });

    await cacheData(cacheKey, sponsors);
    res.status(200).json(sponsors);
  } catch (error) {
    console.error('Error fetching verified sponsors:', error);
    res.status(500).json({
      message: 'Error fetching verified sponsors',
      error: error.message,
    });
  }
});

// GET - Fetch sponsor details by logged in user
router.get('/updateSponsorDetails', isUser, async (req, res) => {
  const email = req.email;
  try {
    const cacheKey = `sponsorByEmail:${email}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.status(200).json({ data: JSON.parse(cached) });

    const data = await Sponsor.findOne({ email: email });

    await cacheData(cacheKey, data);
    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching sponsor details:', error);
    res.status(500).json({ message: 'Error fetching sponsor details', error: error.message });
  }
});

// POST - Update sponsor details
router.post('/updateSponsorDetails', isUser, async (req, res) => {
  const email = req.email;
  const { formData } = req.body;
  try {
    formData.email = email;

    const data = await Sponsor.findOneAndUpdate({ email: email }, formData, { new: true });

    // Invalidate relevant cache
    await redisClient.del(`sponsorByEmail:${email}`);
    await redisClient.del('verifiedSponsors');
    await redisClient.del('pendingSponsors');

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Error saving to database." });
  }
});

module.exports = router;
