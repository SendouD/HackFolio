// Jest configuration
module.exports = {
  // The test environment
  testEnvironment: 'node',
  
  // Timeout setting for tests (in milliseconds)
  testTimeout: 15000,
  
  // Global teardown script
  globalTeardown: './jest.teardown.js',
  
  // Set to true to force shutdown after tests complete
  forceExit: true,
  
  // Add a timeout for the entire test suite
  testRunner: 'jest-circus/runner',
  
  // Detect open handles
  detectOpenHandles: true,
  
  // Verbosity
  verbose: true,
  
  // Add a custom reporter for better error reporting
  reporters: ['default']
};
