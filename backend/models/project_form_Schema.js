const mongoose = require("mongoose");

const projectSubmissionSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  tagline: {
    type: String,
    required: true,
    maxlength: 200,
  },
  problem: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  challenges: {
    type: String,
    maxlength: 2000,
  },
  technologies: {
    type: [String],
    required: true,
  },
  links: {
    type: [String],
  },
  videoDemo: {
    type: String,
  },
  coverImage: {
    type: String, // This would store the file path or URL of the uploaded image
  },
  pictures: {
    type: [String], // Array to store file paths or URLs of uploaded images
  },
  logo: {
    type: String, // This would store the file path or URL of the uploaded logo
  },
  platforms: {
    type: [String],
    enum: ["Web", "Mobile", "Desktop"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ProjectSubmission", projectSubmissionSchema);
