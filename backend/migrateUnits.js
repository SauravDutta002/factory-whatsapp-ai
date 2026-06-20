require('dotenv').config();
const { Client } = require('pg');
const standardizeUnit = require('./src/utils/unitStandardizer');

async function migrateUnits() {
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL is not defined in your .env file!');
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to DB for migration.');

    // 1. Add unit column to pending_requests if it doesn't exist
    await client.query(`
      ALTER TABLE pending_requests ADD COLUMN IF NOT EXISTS unit VARCHAR(50);
    `);
    console.log('Added unit column to pending_requests.');

    // 2. Fetch all pending_requests
    const res = await client.query('SELECT id, qty, unit FROM pending_requests');
    const rows = res.rows;
    console.log(`Found ${rows.length} pending_requests to process.`);

    let updateCount = 0;

    for (const row of rows) {
      const originalQty = row.qty || '';
      // Regex to extract numbers (including decimals) and text separately
      const match = originalQty.match(/^([\d.]+)\s*(.*)$/);
      
      let newQty = originalQty;
      let newUnit = row.unit || '';

      if (match) {
        newQty = match[1]; // The numeric part
        const extractedUnit = match[2]; // The rest
        if (extractedUnit && !row.unit) {
          newUnit = extractedUnit;
        }
      }

      newUnit = standardizeUnit(newUnit);

      // Update the row
      await client.query(`
        UPDATE pending_requests
        SET qty = $1, unit = $2
        WHERE id = $3
      `, [newQty, newUnit, row.id]);

      updateCount++;
    }

    console.log(`Successfully migrated ${updateCount} rows.`);

  } catch (err) {
    console.error('Error during migration:', err);
  } finally {
    await client.end();
    console.log('DB connection closed.');
  }
}

migrateUnits();
