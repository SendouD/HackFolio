const mongoose = require("mongoose");

const teamCodeSchema = new mongoose.Schema({
    hackathonName: {
        type: String,
        required: true,
    },
    teamCode: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("HackathonTeamCodes", teamCodeSchema);