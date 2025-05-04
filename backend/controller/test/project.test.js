const request = require('supertest');
const express = require('express');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

// Mocking modules
jest.mock('../../middleware/isUser', () => (req, res, next) => {
  req.email = 'test@example.com';
  req.username = 'testuser';
  next();
});
jest.mock('../../models/hackathon_participants_schema');
jest.mock('../../models/projectForm_Schema');

// Import project controller
const hack_project = require('../project');
const hackParticipantDetails = require('../../models/hackathon_participants_schema');
const projectSchema = require('../../models/projectForm_Schema');

describe('Project Controller', () => {
  // Setup Express app with the project controller
  const app = express();
  app.use(express.json());
  app.use('/project', hack_project);

  // Reset mocks between tests
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup common mocks
    hackParticipantDetails.findOne = jest.fn();
    projectSchema.findOne = jest.fn();
    projectSchema.prototype.save = jest.fn();
  });

  // Clean up after tests
  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('GET /project/hackathonProject/:name', () => {
    test('should return flag=true when project exists', async () => {
      // Mock user is a participant with a team code
      hackParticipantDetails.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue({ 
          teamCode: 'TEAM123' 
        })
      });
      
      // Mock project exists
      projectSchema.findOne.mockResolvedValue({
        projectName: 'Test Project',
        teamCode: 'TEAM123'
      });

      const response = await request(app)
        .get('/project/hackathonProject/testhackathon');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('flag', true);
      expect(hackParticipantDetails.findOne).toHaveBeenCalledWith({
        email: 'test@example.com', 
        hackathonName: 'testhackathon'
      });
      expect(projectSchema.findOne).toHaveBeenCalledWith({
        hackathonName: 'testhackathon', 
        teamCode: 'TEAM123'
      });
    });

    test('should return flag=false when project does not exist', async () => {
      // Mock user is a participant with a team code
      hackParticipantDetails.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue({ 
          teamCode: 'TEAM123' 
        })
      });
      
      // Mock project doesn't exist
      projectSchema.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/project/hackathonProject/testhackathon');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('flag', false);
    });

    test('should return flag=false when user is not a participant', async () => {
      // Mock user is not a participant
      hackParticipantDetails.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });

      const response = await request(app)
        .get('/project/hackathonProject/testhackathon');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('flag', false);
      expect(projectSchema.findOne).not.toHaveBeenCalled();
    });

    test('should return 400 on database error', async () => {
      // Mock database error
      hackParticipantDetails.findOne.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      const response = await request(app)
        .get('/project/hackathonProject/testhackathon');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('Error');
    });
  });

  describe('POST /project/hackathonProject/:name', () => {
    test('should successfully submit a project', async () => {
      // Mock user is a participant with a team code
      hackParticipantDetails.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue({ 
          teamCode: 'TEAM123' 
        })
      });
      
      // Mock project doesn't exist yet
      projectSchema.findOne.mockResolvedValue(null);
      
      // Mock successful project save
      projectSchema.prototype.save.mockResolvedValue({
        projectName: 'Test Project',
        teamCode: 'TEAM123',
        hackathonName: 'testhackathon'
      });

      const projectData = {
        projectName: 'Test Project',
        tagline: 'A cool project for testing',
        problem: 'Testing problems',
        technologies: ['Node.js', 'Express', 'Jest']
      };

      const response = await request(app)
        .post('/project/hackathonProject/testhackathon')
        .send(projectData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('msg', 'successful');
      expect(hackParticipantDetails.findOne).toHaveBeenCalledWith({
        email: 'test@example.com', 
        hackathonName: 'testhackathon'
      });
      expect(projectSchema.findOne).toHaveBeenCalledWith({
        hackathonName: 'testhackathon', 
        teamCode: 'TEAM123'
      });
      expect(projectSchema.prototype.save).toHaveBeenCalled();
    });

    test('should return 400 if project already exists', async () => {
      // Mock user is a participant with a team code
      hackParticipantDetails.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue({ 
          teamCode: 'TEAM123' 
        })
      });
      
      // Mock project already exists
      projectSchema.findOne.mockResolvedValue({
        projectName: 'Existing Project',
        teamCode: 'TEAM123'
      });

      const projectData = {
        projectName: 'Test Project',
        tagline: 'A cool project for testing',
        problem: 'Testing problems',
        technologies: ['Node.js', 'Express', 'Jest']
      };

      const response = await request(app)
        .post('/project/hackathonProject/testhackathon')
        .send(projectData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('msg', 'Project already submitted!');
      expect(projectSchema.prototype.save).not.toHaveBeenCalled();
    });

    test('should return 200 with message if user is not a participant', async () => {
      // Mock user is not a participant
      hackParticipantDetails.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });

      const projectData = {
        projectName: 'Test Project',
        tagline: 'A cool project for testing',
        problem: 'Testing problems',
        technologies: ['Node.js', 'Express', 'Jest']
      };

      const response = await request(app)
        .post('/project/hackathonProject/testhackathon')
        .send(projectData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('msg', 'participant is not in team or not a participant!');
      expect(projectSchema.findOne).not.toHaveBeenCalled();
      expect(projectSchema.prototype.save).not.toHaveBeenCalled();
    });

    test('should return 400 on database error', async () => {
      // Mock database error
      hackParticipantDetails.findOne.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      const projectData = {
        projectName: 'Test Project',
        tagline: 'A cool project for testing',
        problem: 'Testing problems',
        technologies: ['Node.js', 'Express', 'Jest']
      };

      const response = await request(app)
        .post('/project/hackathonProject/testhackathon')
        .send(projectData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('Error');
    });
  });
});
