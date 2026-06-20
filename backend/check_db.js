require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const res = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'pending_requests'");
  console.log(res.rows);
  process.exit(0);
}
check();
