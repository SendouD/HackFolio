const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Simple email regex
  password: { type: String, required: true, minlength: 6 }, // Minimum password length
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  education: { type: String, default: '' },
  githubProfile: { type: String, default: '' },
  linkedinProfile: { type: String, default: '' },
  skills: { type: [String], default: [] }, // Default to an empty array
  phoneNumber: { type: String, default: '' },
  bio: { type: String, default: '' },
  roles: { type: [String], default: ['User'] }, // Array of roles, default to 'User'
}, { timestamps: true });

// Password hashing before saving the user

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
