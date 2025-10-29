// db.js
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

// Database connection pool
const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  user: process.env.PGUSER || "ecommerce_user",
  password: process.env.PGPASSWORD || "mousin",
  database: process.env.PGDATABASE || "ecommerce",
  port: process.env.PGPORT || 5432,
});

export default pool;

