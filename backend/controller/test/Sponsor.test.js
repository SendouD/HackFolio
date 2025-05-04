const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Create Redis mock BEFORE importing any modules that use Redis
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
jest.mock('../../middleware/redisClient', () => mockRedisClient, { virtual: true });

// Now we can import other dependencies
jest.mock('../../middleware/isUser', () => (req, res, next) => {
  req.email = 'test@example.com';
  req.username = 'testuser';
  next();
});

jest.mock('../../middleware/isAdmin', () => (req, res, next) => {
  req.email = 'admin@example.com';
  req.username = 'admin';
  req.isAdmin = true;
  next();
});

jest.mock('../../models/sponser_Schema');
jest.mock('../../models/user_Schema');

// Import models
const Sponsor = require('../../models/sponser_Schema');

// Import the router after all mocks are set up
const router = require('../Sponsor');

describe('Sponsor Controller', () => {
  // Setup Express app
  const app = express();
  app.use(express.json());
  app.use('/sponsors', router);

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup common model mocks
    Sponsor.findOne = jest.fn();
    Sponsor.find = jest.fn();
    Sponsor.findOneAndUpdate = jest.fn();
    Sponsor.findById = jest.fn();
    Sponsor.findByIdAndUpdate = jest.fn();
    Sponsor.prototype.save = jest.fn();
    
    // Reset Redis mock
    mockRedisClient.get.mockReset();
    mockRedisClient.set.mockReset();
    mockRedisClient.del.mockReset();
    
    mockRedisClient.get.mockResolvedValue(null);
    mockRedisClient.set.mockResolvedValue('OK');
    mockRedisClient.del.mockResolvedValue(1);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('POST /sponsors', () => {
    test('should create a new sponsor and invalidate cache', async () => {
      // Mock save operation
      Sponsor.prototype.save.mockResolvedValue({
        _id: 'test-sponsor-id',
        companyName: 'Test Company',
        description: 'Test description',
        userName: 'testuser',
        email: 'test@example.com',
        verified: false
      });

      const sponsorData = {
        companyName: 'Test Company',
        description: 'Test description',
        websiteUrl: 'https://testcompany.com',
        logoUrl: 'https://testcompany.com/logo.png'
      };

      const response = await request(app)
        .post('/sponsors')
        .send(sponsorData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Sponsor created successfully');
      // The sponsor property is included in the response but might be stringified
      expect(Sponsor.prototype.save).toHaveBeenCalled();
      
      // Verify Redis cache invalidation
      expect(mockRedisClient.del).toHaveBeenCalledWith('verifiedSponsors');
      expect(mockRedisClient.del).toHaveBeenCalledWith('pendingSponsors');
    });

    test('should return 400 on error', async () => {
      // Mock error in save operation
      Sponsor.prototype.save.mockRejectedValue(new Error('Database error'));

      const sponsorData = {
        companyName: 'Test Company',
        description: 'Test description'
      };

      const response = await request(app)
        .post('/sponsors')
        .send(sponsorData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Error creating sponsor');
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('GET /sponsors/user/:companyName', () => {
    test('should get sponsor by company name', async () => {
      // Mock findOne to return a sponsor
      Sponsor.findOne.mockResolvedValue({
        _id: 'test-sponsor-id',
        companyName: 'Test Company',
        description: 'Test description',
        verified: true
      });

      const response = await request(app)
        .get('/sponsors/user/Test%20Company');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('companyName', 'Test Company');
      expect(Sponsor.findOne).toHaveBeenCalled();
    });

    test('should return 202 if sponsor not found', async () => {
      // Mock sponsor not found
      Sponsor.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/sponsors/user/Nonexistent');

      expect(response.status).toBe(202);
      expect(response.body).toHaveProperty('message', 'Sponsor not found');
    });
  });

  describe('GET /sponsors/verified', () => {
    test('should get verified sponsors from cache if available', async () => {
      // Mock Redis get to return cached data
      const cachedSponsors = [
        { _id: 'id1', companyName: 'Company 1', verified: true },
        { _id: 'id2', companyName: 'Company 2', verified: true }
      ];
      mockRedisClient.get.mockResolvedValue(JSON.stringify(cachedSponsors));

      const response = await request(app)
        .get('/sponsors');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(mockRedisClient.get).toHaveBeenCalledWith('verifiedSponsors');
      // Ensure DB wasn't queried since cache hit
      expect(Sponsor.find).not.toHaveBeenCalled();
    });

    test('should get verified sponsors from database if not in cache', async () => {
      // Mock Redis cache miss
      mockRedisClient.get.mockResolvedValue(null);
      
      // Mock DB response
      const dbSponsors = [
        { _id: 'id1', companyName: 'Company 1', verificationStatus: 'Verified' },
        { _id: 'id2', companyName: 'Company 2', verificationStatus: 'Verified' }
      ];
      Sponsor.find.mockResolvedValue(dbSponsors);

      const response = await request(app)
        .get('/sponsors');

      expect(response.status).toBe(200);
      expect(mockRedisClient.get).toHaveBeenCalledWith('verifiedSponsors');
      expect(Sponsor.find).toHaveBeenCalledWith({ verificationStatus: 'Verified' });
      expect(mockRedisClient.set).toHaveBeenCalled();
    });
  });

  describe('PUT /sponsors/verify/:id', () => {
    test('should verify a sponsor and invalidate cache', async () => {
      // Mock sponsor verification
      Sponsor.findByIdAndUpdate.mockResolvedValue({
        _id: 'test-sponsor-id',
        companyName: 'Test Company',
        verified: true
      });

      const response = await request(app)
        .put('/sponsors/verify/test-sponsor-id');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Sponsor verified successfully');
      expect(Sponsor.findByIdAndUpdate).toHaveBeenCalledWith(
        'test-sponsor-id',
        { verified: true },
        { new: true }
      );
      
      // Verify Redis cache invalidation
      expect(mockRedisClient.del).toHaveBeenCalledWith('verifiedSponsors');
      expect(mockRedisClient.del).toHaveBeenCalledWith('pendingSponsors');
    });

    test('should return 404 if sponsor not found', async () => {
      // Mock sponsor not found
      Sponsor.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app)
        .put('/sponsors/verify/nonexistent-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Sponsor not found');
    });
  });
});
