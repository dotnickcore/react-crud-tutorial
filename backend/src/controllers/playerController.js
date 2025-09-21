const pool = require('../db');

// GET ALL PLAYERS (with optional filtering)
const getAllPlayers = async (req, res) => {
  try {
    const { isActive, team_id, position_id } = req.query;
    let query = `
      SELECT 
        p.id, 
        p.name AS player_name, 
        t.name AS team_name,
        pos.name AS position_name,
        p.contractValue,
        p.contractYears,
        p.isActive
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      LEFT JOIN positions pos ON p.position_id = pos.id
    `;
    let queryParams = [];
    let whereClauses = [];

    // Build filters dynamically
    if (isActive !== undefined) {
      const isActiveBool = isActive === 'true';
      queryParams.push(isActiveBool);
      whereClauses.push(`p.isActive = $${queryParams.length}`);
    }

    if (team_id) {
      queryParams.push(parseInt(team_id));
      whereClauses.push(`p.team_id = $${queryParams.length}`);
    }

    if (position_id) {
      queryParams.push(parseInt(position_id));
      whereClauses.push(`p.position_id = $${queryParams.length}`);
    }

    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    query += ' ORDER BY p.id;';

    const result = await pool.query(query, queryParams);

    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rowCount,
    });
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve players',
      error: error.message,
    });
  }
};

// GET SINGLE PLAYER BY ID
const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        p.id, 
        p.name AS player_name, 
        t.name AS team_name,
        pos.name AS position_name,
        p.contractValue,
        p.contractYears,
        p.isActive
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      LEFT JOIN positions pos ON p.position_id = pos.id
      WHERE p.id = $1;
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Player not found',
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve player',
      error: error.message,
    });
  }
};

// CREATE NEW PLAYER
const createPlayer = async (req, res) => {
  try {
    const {
      name,
      team_id,
      position_id,
      contractValue,
      contractYears,
    } = req.body;

    const query = `
      INSERT INTO players (name, team_id, position_id, contractValue, contractYears)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      name,
      team_id || null,
      position_id || null,
      contractValue,
      contractYears
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: 'Player created successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create player',
      error: error.message,
    });
  }
};

// UPDATE PLAYER
const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      team_id,
      position_id,
      contractValue,
      contractYears,
    } = req.body;

    const query = `
      UPDATE players 
      SET name = $1, team_id = $2, position_id = $3, contractValue = $4, contractYears = $5
      WHERE id = $6
      RETURNING *;
    `;
    const values = [
      name,
      team_id || null,
      position_id || null,
      contractValue,
      contractYears,
      id,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Player not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Player updated successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update player',
      error: error.message,
    });
  }
};

// DELETE PLAYER (HARD DELETE - Permanent removal from database)
const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    // First, check if the player exists (optional but good practice)
    const checkQuery = 'SELECT * FROM players WHERE id = $1;';
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Player not found',
      });
    }

    // Perform the hard delete
    const deleteQuery = `
      DELETE FROM players 
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(deleteQuery, [id]);

    res.status(200).json({
      success: true,
      message: 'Player permanently deleted successfully',
      data: result.rows[0], // This returns the deleted player record
    });
  } catch (error) {
    console.error('Error deleting player:', error);

    // Handle foreign key constraint errors specifically
    if (error.code === '23503') {
      // PostgreSQL foreign key violation code
      return res.status(409).json({
        success: false,
        message:
          'Cannot delete player. This player may be referenced by other records in the system.',
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete player',
      error: error.message,
    });
  }
};

// TOGGLE PLAYER ACTIVE STATUS
const togglePlayerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const query = `
      UPDATE players 
      SET isActive = $1
      WHERE id = $2
      RETURNING *;
    `;

    const result = await pool.query(query, [isActive, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Player not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `Player ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error toggling player status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update player status',
      error: error.message,
    });
  }
};

// SEARCH PLAYERS BY NAME (with partial matching)
// SEARCH PLAYERS BY NAME (with better space handling and multiple search terms)
const searchPlayersByName = async (req, res) => {
  try {
    const { name, isActive, team_id, position_id, exact } = req.query;
    
    // Check if name is provided AND has non-space content
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name parameter is required and cannot be empty',
        data: null
      });
    }

    const trimmedName = name.trim();
    let query = `
      SELECT 
        p.id, 
        p.name AS player_name, 
        t.name AS team_name,
        pos.name AS position_name,
        p.contractValue,
        p.contractYears,
        p.isActive
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      LEFT JOIN positions pos ON p.position_id = pos.id
    `;
    
    let queryParams = [];
    let whereClauses = [];

    // Handle name search
    if (exact === 'true') {
      // Exact match
      queryParams.push(trimmedName);
      whereClauses.push(`p.name ILIKE $${queryParams.length}`);
    } else {
      // Partial match with space handling
      const searchTerms = trimmedName.split(/\s+/).filter(term => term.length > 0);
      
      if (searchTerms.length > 0) {
        const nameConditions = [];
        searchTerms.forEach(term => {
          queryParams.push(`%${term}%`);
          nameConditions.push(`p.name ILIKE $${queryParams.length}`);
        });
        whereClauses.push(`(${nameConditions.join(' AND ')})`);
      } else {
        // This handles case where trimmedName is empty after split (shouldn't happen due to earlier check)
        return res.status(400).json({
          success: false,
          message: 'Valid name parameter is required',
          data: null
        });
      }
    }

    // Add optional filters
    if (isActive !== undefined) {
      const isActiveBool = isActive === 'true';
      queryParams.push(isActiveBool);
      whereClauses.push(`p.isActive = $${queryParams.length}`);
    }

    if (team_id) {
      queryParams.push(parseInt(team_id));
      whereClauses.push(`p.team_id = $${queryParams.length}`);
    }

    if (position_id) {
      queryParams.push(parseInt(position_id));
      whereClauses.push(`p.position_id = $${queryParams.length}`);
    }

    // Add WHERE clause if any conditions exist
    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    } else {
      // This should not happen due to our earlier checks, but as a safety net
      query += ' WHERE 1=0'; // Return no results
    }

    query += ' ORDER BY p.name;';

    console.log('Final query:', query); // DEBUG
    console.log('Query params:', queryParams); // DEBUG

    const result = await pool.query(query, queryParams);

    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rowCount,
      searchTerm: trimmedName,
      searchMode: exact === 'true' ? 'exact' : 'partial'
    });

  } catch (error) {
    console.error('Error searching players:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search players',
      error: error.message,
      data: null
    });
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  togglePlayerStatus,
  searchPlayersByName
};
