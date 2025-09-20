const express = require('express');
const router = express.Router();
const {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  togglePlayerStatus,
} = require('../controllers/playersController');

// GET/api/v1/players - Get all players with optional query params: ?isActive=true&team_id=1&position_id=2
router.get('/', getAllPlayers);

// GET/api/v1/players/:id - Get single player by ID
router.get('/:id', getPlayerById);

// POST/api/v1/players - Create new player
router.post('/', createPlayer);

// PUT/api/v1/players/:id - Update player
router.put('/:id', updatePlayer);

// DELETE/api/v1/players/:id - Soft delete player (sets isActive = false)
router.delete('/:id', deletePlayer);

// PATCH/api/v1/api/players/:id/status - Toggle active status (body: { isActive: true/false })
router.patch('/:id/status', togglePlayerStatus);

module.exports = router;
