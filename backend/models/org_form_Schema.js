const mongoose = require("mongoose");

const orgFormSchema = new mongoose.Schema({
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
    completelyFilled: {
        type: Boolean,
    }
});

module.exports = mongoose.model("OrgForm", orgFormSchema);