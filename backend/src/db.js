// db.js
import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

// Destructure Pool from pg, not Client
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

// You don't need to call pool.connect() here.
// The pool will manage connections automatically.

// Optional: Listen for pool events
pool.on('connect', () => {
    console.log('Database connected');
});

pool.on('error', (err) => {
    console.error('Unexpected database error', err);
});

// Export the pool for use in other files
export default pool;