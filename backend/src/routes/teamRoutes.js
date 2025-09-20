const express = require('express');
const { getAllTeams } = require('../controllers/teamController');

const teamRouter = express.Router();

// GET/api/v1/teams
teamRouter.get('/', getAllTeams);

module.exports = teamRouter;
