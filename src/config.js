const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRES_USER || "user",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "db",
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
});

module.exports = {pool}