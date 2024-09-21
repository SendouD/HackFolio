const mongoose = require("mongoose");

const hackFullDetails = new mongoose.Schema({
    hackathonName: {
        type: String,
        required: true,
        maxlength: 40,
    },
    uniName: {
        type: String,
        required: true,
        maxlength: 40,
    },
    eventMode: {
        type: String,
        required: true,
    },
    tech: {
        type: String,
        required: true,
    },
    teamSize: {
        type: String,
        required: true,
    },
    participantsProfile: {
        type: String,
        required: true,
    },
    contactLinks: {
        type: [String],
        required: true,
    },
    fromDate: {
        type: String,
        required: true,
    },
    toDate: {
        type: String,
        required: true,
    },
    prizesDesc: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("HackathonDetails", hackFullDetails);