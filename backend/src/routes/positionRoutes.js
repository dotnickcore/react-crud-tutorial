const express = require('express');
const { getAllPositions } = require('../controllers/positionController');

const positionRouter = express.Router();

// GET/api/v1/position
positionRouter.get('/', getAllPositions);

module.exports = positionRouter;
