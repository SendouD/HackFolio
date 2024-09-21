const mongoose = require("mongoose");

const hackWebDetails = new mongoose.Schema({
    hackathonName: {
        type: String,
        required: true,
        maxlength: 40,
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