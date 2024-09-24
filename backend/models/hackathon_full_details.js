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
        default: "",
    },
    tech: {
        type: String,
        required: true,
        default: "",
    },
    teamSize: {
        type: String,
        required: true,
        default: "",
    },
    participantsProfile: {
        type: String,
        required: true,
        default: "",
    },
    contactLinks: {
        type: [String],
        required: true,
        default: [],
    },
    fromDate: {
        type: String,
        required: true,
        default: "",
    },
    toDate: {
        type: String,
        required: true,
        default: "",
    },
    prizesDesc: {
        type: String,
        required: true,
        default: "",
    },
});

module.exports = mongoose.model("HackathonDetails", hackFullDetails);