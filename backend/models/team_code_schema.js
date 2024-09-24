const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamCodeSchema = new mongoose.Schema({
    hackathonName: {
        type: String,
        required: true,
    },
    teamName: {
        type: String,
        required: true,
    },
    teamCode: {
        type: String,
        required: true,
    },
    members: {
        type: Schema.Types.Mixed,
        required: true,
    }
});

module.exports = mongoose.model("HackathonTeamCodes", teamCodeSchema);