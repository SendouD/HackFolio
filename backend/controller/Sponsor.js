/**
 * @swagger
 * tags:
 *   name: Sponsors
 *   description: Sponsor management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Sponsor:
 *       type: object
 *       required:
 *         - companyName
 *         - email
 *         - userName
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated MongoDB ID
 *         companyName:
 *           type: string
 *           description: Name of the sponsoring company
 *         email:
 *           type: string
 *           description: Contact email for the sponsor
 *         userName:
 *           type: string
 *           description: Username of the account owner
 *         verificationStatus:
 *           type: string
 *           enum: [Pending, Verified, Declined]
 *           default: Pending
 *           description: Verification status of the sponsor
 *         logo:
 *           type: string
 *           description: URL to the sponsor's logo
 *       example:
 *         companyName: Acme Inc
 *         email: contact@acme.com
 *         userName: acmeuser
 *         verificationStatus: Pending
 */

const express = require('express');
const Sponsor = require('../models/sponser_Schema');
const isUser = require('../middleware/isUser');
const User = require('../models/user_Schema');
const jwt = require('jsonwebtoken');
const isAdmin = require('../middleware/isAdmin');
const redisClient = require('../middleware/redisClient');

const router = express.Router();

/**
 * Helper function to cache data in Redis
 * @param {string} key - Redis cache key
 * @param {Object} data - Data to cache
 * @param {number} ttl - Time to live in seconds (default: 3600)
 */
const cacheData = async (key, data, ttl = 3600) => {
  await redisClient.set(key, JSON.stringify(data), { EX: ttl });
};

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

/**
 * @swagger
 * /sponsors/user/{companyName}:
 *   get:
 *     summary: Get sponsor by company name
 *     tags: [Sponsors]
 *     parameters:
 *       - in: path
 *         name: companyName
 *         required: true
 *         schema:
 *           type: string
 *         description: The company name to search for (case insensitive)
 *     responses:
 *       200:
 *         description: Returns sponsor details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sponsor'
 *       202:
 *         description: Sponsor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sponsor not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * /sponsors/adminDash:
 *   get:
 *     summary: Get pending sponsors for admin dashboard
 *     tags: [Sponsors]
 *     responses:
 *       200:
 *         description: Returns list of pending sponsors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sponsor'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching sponsor details
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * /sponsors/admin/verify/{companyName}:
 *   patch:
 *     summary: Admin verifies a sponsor
 *     tags: [Sponsors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyName
 *         required: true
 *         schema:
 *           type: string
 *         description: Company name of the sponsor to verify
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - verificationStatus
 *             properties:
 *               verificationStatus:
 *                 type: string
 *                 enum: [Verified]
 *                 example: Verified
 *     responses:
 *       200:
 *         description: Sponsor verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sponsor'
 *       202:
 *         description: Sponsor or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sponsor not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error verifying sponsor
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * /sponsors/admin/decline/{companyName}:
 *   patch:
 *     summary: Admin declines a sponsor
 *     tags: [Sponsors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyName
 *         required: true
 *         schema:
 *           type: string
 *         description: Company name of the sponsor to decline
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - verificationStatus
 *             properties:
 *               verificationStatus:
 *                 type: string
 *                 enum: [Declined]
 *                 example: Declined
 *     responses:
 *       200:
 *         description: Sponsor declined successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sponsor'
 *       202:
 *         description: Sponsor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sponsor not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error declining sponsor
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * /sponsors:
 *   get:
 *     summary: Get all verified sponsors
 *     tags: [Sponsors]
 *     responses:
 *       200:
 *         description: Returns list of verified sponsors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sponsor'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching verified sponsors
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * /sponsors/updateSponsorDetails:
 *   get:
 *     summary: Get sponsor details for the logged in user
 *     tags: [Sponsors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the sponsor details for the logged in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Sponsor'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching sponsor details
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * /sponsors/updateSponsorDetails:
 *   post:
 *     summary: Update sponsor details for the logged in user
 *     tags: [Sponsors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - formData
 *             properties:
 *               formData:
 *                 type: object
 *                 properties:
 *                   companyName:
 *                     type: string
 *                   logo:
 *                     type: string
 *     responses:
 *       200:
 *         description: Sponsor details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sponsor'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error saving to database.
 */
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
