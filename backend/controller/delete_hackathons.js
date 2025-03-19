const express = require('express');
const delete_hackathon = express.Router();
const isAdmin = require('../middleware/isAdmin');
const HackathonTeamCodes = require('../models/team_code_schema');
const Project = require('../models/projectForm_Schema');
const OrgForm = require('../models/org_form_Schema');
const HackathonWebpageDetails = require('../models/hackathon_webpage_details');
const HackathonParticipantsDetails = require('../models/hackathon_participants_schema');
const HackathonDetails = require('../models/hackathon_full_details');

delete_hackathon.route('/:name').delete(isAdmin, async (req, res) => {
    const { name } = req.params;
    try {
      await HackathonTeamCodes.deleteMany({ hackathonName: name });
      await Project.deleteMany({ hackathonName: name });
      await OrgForm.deleteMany({ hackathonName: name });
      await HackathonWebpageDetails.deleteMany({ hackathonName: name });
      await HackathonParticipantsDetails.deleteMany({ hackathonName: name });
      await HackathonDetails.deleteMany({ hackathonName: name });
      
      res.status(200).json({ message: 'Hackathon deleted successfully' });
    } catch (error) {
      console.error('Error deleting hackathon:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = delete_hackathon;