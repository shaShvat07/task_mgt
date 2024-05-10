const dotenv = require('dotenv');
dotenv.config();
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

pool.connect((err) => {
  if(err) throw err;
  console.log("Connected to PostgreSQL successfully!");
});

module.exports = { pool };