// Global teardown file for Jest
const redis = require('redis');
const mongoose = require('mongoose');

module.exports = async () => {
  console.log('Running global teardown...');
  
  // Close all mongoose connections if any are open
  if (mongoose.connection.readyState !== 0) {
    console.log('Closing mongoose connections...');
    await mongoose.connection.close();
  }

  // Add a short delay to ensure connections are fully closed
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('Global teardown complete.');
};
