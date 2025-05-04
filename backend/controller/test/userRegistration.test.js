const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Mocking modules
jest.mock('nodemailer');
jest.mock('../../models/user_Schema');
jest.mock('../../models/chat_status_model');
jest.mock('../../models/chat_user_schema');
jest.mock('redis');

// Mock Redis client
const mockRedisClient = {
  set: jest.fn().mockImplementation((key, value, options) => Promise.resolve('OK')),
  get: jest.fn(),
  del: jest.fn().mockResolvedValue(1),
  connect: jest.fn().mockResolvedValue(undefined),
  quit: jest.fn().mockResolvedValue(undefined),
  on: jest.fn()
};

// Mock Redis module before controller import
jest.mock('../../middleware/redisClient', () => mockRedisClient, { virtual: true });

// Import the user controller after mocks are set up
const authController = require('../userRegistration');

// Import models after mocks are set up
const User = require('../../models/user_Schema');
const chatStatusModel = require('../../models/chat_status_model');
const chatUserSchema = require('../../models/chat_user_schema');

describe('User Registration Controller', () => {
  // Setup Express app with the auth controller
  const app = express();
  app.use(express.json());
  app.use('/userlogin', authController);

  // Setup before tests
  beforeAll(async () => {
    // Mock JWT sign
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'test-token');
    
    // Mock bcrypt
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password');
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
  });

  // Clean up after tests
  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  // Reset mocks between tests
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup common mocks
    User.findOne = jest.fn();
    chatStatusModel.prototype.save = jest.fn();
    chatUserSchema.prototype.save = jest.fn();
    User.prototype.save = jest.fn();
    mockRedisClient.get.mockReset();
  });

  describe('POST /userlogin/signup', () => {
    test('should create a new user successfully', async () => {
      // Mock user doesn't exist
      User.findOne.mockResolvedValue(null);
      
      // Mock saving operations
      User.prototype.save.mockResolvedValue({
        _id: 'test-id',
        username: 'testuser',
        email: 'test@example.com'
      });

      chatStatusModel.prototype.save.mockResolvedValue({});
      chatUserSchema.prototype.save.mockResolvedValue({});

      // Test request body
      const userData = {
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123'
      };

      // Make request to signup endpoint
      const response = await request(app)
        .post('/userlogin/signup')
        .send(userData);

      // Assertions
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('username', 'testuser');
      expect(response.body).toHaveProperty('email', 'test@example.com');
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
      expect(User.prototype.save).toHaveBeenCalled();
      expect(chatStatusModel.prototype.save).toHaveBeenCalled();
      expect(chatUserSchema.prototype.save).toHaveBeenCalled();
    });

    test('should return 400 if user already exists', async () => {
      // Mock user exists
      User.findOne.mockResolvedValue({
        email: 'test@example.com',
        username: 'testuser'
      });

      const userData = {
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/userlogin/signup')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('Error', 'User already exists');
      expect(User.prototype.save).not.toHaveBeenCalled();
    });
  });

  describe('POST /userlogin/signin', () => {
    test('should sign in successfully with valid credentials', async () => {
      // Mock user found
      User.findOne.mockResolvedValue({
        _id: 'test-id',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashed-password'
      });

      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/userlogin/signin')
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Success');
      expect(response.body).toHaveProperty('username', 'testuser');
      expect(response.body).toHaveProperty('email', 'test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password');
      expect(jwt.sign).toHaveBeenCalled();
    });

    test('should return 404 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/userlogin/signin')
        .send(loginData);

      expect(response.status).toBe(404);
      // Fixed error message to match actual implementation
      expect(response.body).toHaveProperty('Error', 'User not found!');
    });

    test('should return 400 with invalid password', async () => {
      User.findOne.mockResolvedValue({
        _id: 'test-id',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashed-password'
      });

      // Mock password comparison failure
      bcrypt.compare.mockResolvedValueOnce(false);

      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/userlogin/signin')
        .send(loginData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('Error', 'Invalid credentials');
    });
  });

  describe('POST /userlogin/sendotp', () => {
    test('should send OTP successfully', async () => {
      // Mock user exists
      User.findOne.mockResolvedValue({
        email: 'test@example.com'
      });

      const response = await request(app)
        .post('/userlogin/sendotp')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'OTP sent successfully');
      expect(mockRedisClient.set).toHaveBeenCalled();
    });

    test('should return 404 if user not found', async () => {
      // Mock user doesn't exist
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/userlogin/sendotp')
        .send({ email: 'nonexistent@example.com' });

      expect(response.status).toBe(404);
      // Adjusted to match actual implementation
      expect(response.body).toHaveProperty('Error', 'User not found!');
    });
  });

  describe('POST /userlogin/verifyotp', () => {
    test('should verify OTP successfully', async () => {
      // Mock Redis get to return an OTP
      mockRedisClient.get.mockResolvedValue('123456');

      const response = await request(app)
        .post('/userlogin/verifyotp')
        .send({ email: 'test@example.com', otp: '123456' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'OTP verified successfully');
    });

    test('should return 400 with invalid OTP', async () => {
      // Mock Redis get to return a different OTP
      mockRedisClient.get.mockResolvedValue('123456');

      const response = await request(app)
        .post('/userlogin/verifyotp')
        .send({ email: 'test@example.com', otp: '654321' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('Error', 'Invalid OTP');
    });

    test('should return 404 if OTP not found', async () => {
      // Mock Redis get to return null (OTP not found or expired)
      mockRedisClient.get.mockResolvedValue(null);

      const response = await request(app)
        .post('/userlogin/verifyotp')
        .send({ email: 'test@example.com', otp: '123456' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('Error', 'User not found! or expired');
    });
  });
});
