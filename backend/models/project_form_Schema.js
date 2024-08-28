const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: false,
    maxlength: 50
  },
  tagline: {
    type: String,
    required: false,
    maxlength: 200
  },
  problem: {
    type: String,
    required: false,
    maxlength: 2000
  },
  challenges: {
    type: String,
    required: false,
    maxlength: 2000
  },
  technologies: {
    type: String,
    required: false,
    maxlength: 100
  },
  links: {
    type: String,
    required: false,
    maxlength: 1000
  },
  videoDemo: {
    type: String,
    required: false
  },
  coverUrl: {
    type: String,
    required: false
  },
  logoUrl: {
    type: String,
    required: false
  },
  imageUrls: {
    type: [String],
    required: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
