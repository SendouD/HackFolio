const mongoose = require("mongoose");

const hackWebDetails = new mongoose.Schema({
    hackathonId: {
        type: String,
        required: true,
    },
    aboutHack: {
        type: String,
        required: true,
    },
    aboutPrize: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("HackathonWebpageDetails", hackWebDetails);