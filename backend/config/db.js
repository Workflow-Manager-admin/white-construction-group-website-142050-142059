import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
});

pool.on("error", (err) => {
  console.error("PostgreSQL connection error", err);
  process.exit(-1);
});

export default pool;
