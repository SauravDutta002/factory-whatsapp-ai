require('dotenv').config();
const { Client } = require('pg');

async function checkQty() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const result = await client.query("SELECT id, part_name, qty, unit FROM pending_requests WHERE part_name ILIKE '%Bearing%'");
    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

checkQty();
