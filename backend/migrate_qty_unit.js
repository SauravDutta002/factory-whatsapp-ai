require('dotenv').config();
const { Client } = require('pg');

async function migrateQtyUnit() {
  console.log('--- DATABASE MIGRATION: SEPARATING QTY AND UNIT ---');
  
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL is not defined in your .env file!');
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Neon DB...');
    await client.connect();
    console.log('Connected successfully!');

    console.log('Fetching existing demands from pending_requests...');
    const result = await client.query(`
      SELECT id, qty, unit 
      FROM pending_requests 
      WHERE qty IS NOT NULL AND qty != ''
    `);

    const rows = result.rows;
    console.log(`Found ${rows.length} rows to check.`);

    let updateCount = 0;

    for (const row of rows) {
      const qtyStr = row.qty.trim();
      
      // If unit already exists and is not '—', skip
      if (row.unit && row.unit.trim() !== '' && row.unit.trim() !== '—') {
        continue;
      }

      // Match numbers (including decimals/commas) followed optionally by space and then letters/words
      // e.g. "500 Pcs", "20.5 Kg", "100"
      const match = qtyStr.match(/^([\d.,]+)\s*([a-zA-Z]+.*)?$/);

      if (match) {
        const rawNum = match[1];
        const rawUnit = match[2];

        if (rawUnit) {
          console.log(`Migrating ID ${row.id}: [${qtyStr}] -> Qty: [${rawNum}], Unit: [${rawUnit.trim()}]`);
          
          await client.query(`
            UPDATE pending_requests 
            SET qty = $1, unit = $2
            WHERE id = $3
          `, [rawNum, rawUnit.trim(), row.id]);
          
          updateCount++;
        }
      }
    }

    console.log(`\nMigration completed! Successfully separated qty/unit for ${updateCount} demands.`);

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

migrateQtyUnit();
