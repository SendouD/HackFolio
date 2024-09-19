const mongoose = require('mongoose');

// Define the schema for the User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // Unique username
  firstName: { type: String, required: true },               // First name field
  lastName: { type: String, required: true },                // Last name field
  email: { type: String, required: true, unique: true },     // Unique email field
  password: { type: String, required: true },                // Password field
}, { timestamps: true });                                    // Adds createdAt and updatedAt timestamps

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
