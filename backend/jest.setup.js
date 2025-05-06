// Mock Redis client
const mockRedisClient = {
  set: jest.fn().mockImplementation((key, value, options) => Promise.resolve('OK')),
  get: jest.fn().mockResolvedValue(null),
  del: jest.fn().mockResolvedValue(1),
  connect: jest.fn().mockResolvedValue(undefined),
  quit: jest.fn().mockResolvedValue(undefined),
  on: jest.fn()
};

// Mock Redis module
jest.mock('redis', () => ({
  createClient: jest.fn().mockReturnValue(mockRedisClient)
}));

// Mock Redis client module directly
jest.mock('./middleware/redisClient', () => mockRedisClient, { virtual: true });
