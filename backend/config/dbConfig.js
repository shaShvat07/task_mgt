const dotenv = require('dotenv');
const { Pool } = require('pg');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.connect((err) => {
  if(err) throw err;
  console.log("Connected to PostgreSQL successfully!");
});

module.exports = { pool };