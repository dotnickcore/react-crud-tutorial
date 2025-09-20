const pool = require('../db');

const getAllPositions = async (req, res) => {
  try {
    // Get optional query parameters from the URL
    const { isActive } = req.query;
    let query = 'SELECT * FROM positions';
    let queryParams = [];
    let whereClauses = [];

    // Build the query dynamically based on provided filters
    if (isActive !== undefined) {
      // Convert the string 'true'/'false' to a boolean
      const isActiveBool = isActive === 'true';
      queryParams.push(isActiveBool);
      whereClauses.push(`isActive = $${queryParams.length}`);
    }

    // Add WHERE clause if any filters exist
    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    query += ' ORDER BY name;'; // Always sort

    // Execute the query with parameters
    const result = await pool.query(query, queryParams);

    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rowCount,
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve teams',
      error: error.message,
    });
  }
};

module.exports = {
  getAllPositions,
};
