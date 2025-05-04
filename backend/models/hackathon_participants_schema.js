const mongoose = require("mongoose");

const hackParticipantDetailsSchema = new mongoose.Schema({
    hackathonName: {
        type: String,
        required: true,
        maxlength: 40,
        index: true, // frequently filtered
    },
    email: {
        type: String,
        required: true,
        unique: true, // each email must be unique
    },
    aliasname: {
        type: String,
        required: true,
        index: true, // for quick lookup by alias
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phoneno: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    githubprofile: {
        type: String,
        required: true,
    },
    linkednprofile: {
        type: String,
        required: true,
    },
    portfoliowebsite: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    reviewed: {
        type: Boolean,
        required: true,
        index: true, // for filtering reviewed/unreviewed
    },
    teamCode: {
        type: String,
        default: '',
        index: true, // useful for team-based queries
    },
    teamName: {
        type: String,
        default: '',
    }
});

// Optional: Compound index if you often filter by hackathon + reviewed
hackParticipantDetailsSchema.index({ hackathonName: 1, reviewed: 1 });

module.exports = mongoose.model("HackathonParticipantsDetails", hackParticipantDetailsSchema);
