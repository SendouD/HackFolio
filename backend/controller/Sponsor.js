const express = require('express');
const Sponsor = require('../models/sponser_Schema'); // Ensure this path is correct
const isUser = require('../middleware/isUser');

const router = express.Router();

// POST request to create a new sponsor
router.post('/', async (req, res) => {
  try {
    // Create a new sponsor instance with the request body
    const sponsor = new Sponsor(req.body);

    // Save the sponsor to the database
    await sponsor.save();

    // Respond with success message and the created sponsor
    res.status(201).json({
      message: 'Sponsor created successfully',
      sponsor,
    });
  } catch (error) {
    // Handle validation or server errors
    console.error('Error creating sponsor:', error);
    res.status(400).json({
      message: 'Error creating sponsor',
      error: error.message,
    });
  }
});

// GET request to fetch all sponsors or filter by company name
router.get('/', async (req, res) => {
  try {
    const { companyName } = req.query; // Optionally filter by company name
    const filter = companyName ? { companyName: { $regex: companyName, $options: 'i' } } : {};

    // Fetch sponsors from the database
    const sponsors = await Sponsor.find(filter);

    // Respond with the list of sponsors
    res.status(200).json(sponsors);
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    res.status(500).json({
      message: 'Error fetching sponsors',
      error: error.message,
    });
  }
});

module.exports = router;
