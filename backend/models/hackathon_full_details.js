const mongoose = require("mongoose");

const hackFullDetails = new mongoose.Schema({
    hackathonName: {
        type: String,
        required: true,
        maxlength: 40,
        index: true, // frequently queried
    },
    uniName: {
        type: String,
        required: true,
        maxlength: 40,
        index: true, // filter by university
    },
    eventMode: {
        type: String,
        required: true,
        default: "",
        index: true, // optional, if you filter online/offline
    },
    tech: {
        type: String,
        required: true,
        default: "",
        index: true, // optional, useful for tech filters
    },
    teamSize: {
        type: Number,
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
        index: true, // for sorting/filtering by date
    },
    toDate: {
        type: String,
        required: true,
        default: "",
        index: true, // for filtering date range
    },
    prizesDesc: {
        type: String,
        required: true,
        default: "",
    },
    judges: { type: [String], default: [''] },
    criteria: {
        type: [
            {
                name: { type: String, required: true },
                maxMarks: { type: Number, required: true }
            }
        ],
        default: []
    },
    completelyFilled: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("HackathonDetails", hackFullDetails);
