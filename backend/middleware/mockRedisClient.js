// Mock Redis client for tests
const mockRedisClient = {
  set: jest.fn().mockImplementation((key, value, options) => Promise.resolve('OK')),
  get: jest.fn().mockResolvedValue(null),
  del: jest.fn().mockResolvedValue(1),
  connect: jest.fn().mockResolvedValue(undefined),
  quit: jest.fn().mockResolvedValue(undefined),
  on: jest.fn()
};

module.exports = mockRedisClient;
