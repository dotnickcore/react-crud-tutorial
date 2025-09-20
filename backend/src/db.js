// db.js
const pg = require('pg');
require('dotenv').config(); // Load environment variables

// Destructure Pool from pg
const { Pool } = pg;

// Create a new POOL instance
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Optional: Listen for pool events
pool.on('connect', () => {
    console.log('Database connected');
});

pool.on('error', (err) => {
    console.error('Unexpected database error', err);
});

// Export the pool for use in other files
module.exports = pool;