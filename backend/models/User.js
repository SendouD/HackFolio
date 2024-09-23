const mongoose = require('mongoose');
const joi =require('joi')
const passwordComplexity =require('joi-password-complexity')

// Define the schema for the User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // Unique username
  firstName: { type: String, required: true },               // First name field
  lastName: { type: String, required: true },                // Last name field
  email: { type: String, required: true, unique: true },     // Unique email field
  password: { type: String, required: true },                // Password field
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: null },  // Gender field with enum
  education: { type: String, default: null },                // Education field
  githubProfile: { type: String, default: null },            // GitHub profile link
  linkedinProfile: { type: String, default: null },          // LinkedIn profile link
  skills: { type: [String], default: null },                 // Array of skills
  phoneNumber: { type: String, default: null },              // Phone number field
  bio: { type: String, default: null },                      // Bio field
}, { timestamps: true });                                    // Adds createdAt and updatedAt timestamps

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

const validate = (data) =>{
  const schema = joi.object({
      username:joi.string().required().label('username'),
      firstName:joi.string().required().label('firstName'),
      lastName:joi.string().required().label('lastName'),
      email:joi.string().email().required().label('email'),
      password:joi.passwordComplexity().required().label('password'),
  })
  return schema.validate(data)
}

module.exports = User;
