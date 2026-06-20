const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'server.js');
let content = fs.readFileSync(file, 'utf8');

// Chunk 1: savePendingRequest
content = content.replace(
`            INSERT INTO pending_requests (
                id, part_name, qty, unit, size, material, machine, vendor, requested_by, 
                demand_timestamp, received_at, rate, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10, $11, $12)`,
`            INSERT INTO pending_requests (
                id, part_name, qty, unit, size, material, machine, vendor, requested_by, 
                demand_timestamp, received_at, rate, status, category
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10, $11, $12, $13)`
);

content = content.replace(
`            receivedAt,
            item["Price"] || item.price || '',
            'pending_review'
        ];`,
`            receivedAt,
            item["Price"] || item.price || '',
            'pending_review',
            item["Category"] || item.category || ''
        ];`
);

// Chunk 2: edit
content = content.replace(
`        const queryText = \`
            UPDATE pending_requests 
            SET part_name = $1, qty = $2, size = $3, material = $4, machine = $5, vendor = $6, rate = $7, 
                sku = $8, reg_no = $9, edited_by = $10, edited_at = NOW(), unit = $12
            WHERE id = $11
            RETURNING *
        \`;`,
`        const queryText = \`
            UPDATE pending_requests 
            SET part_name = $1, qty = $2, size = $3, material = $4, machine = $5, vendor = $6, rate = $7, 
                sku = $8, reg_no = $9, edited_by = $10, edited_at = NOW(), unit = $12, category = $13
            WHERE id = $11
            RETURNING *
        \`;`
);

content = content.replace(
`            editorRoleName,
            id,
            editData.unit || ''
        ];`,
`            editorRoleName,
            id,
            editData.unit || '',
            editData.category || ''
        ];`
);

// Chunk 3: custom demand
content = content.replace(
`            INSERT INTO pending_requests (
                id, part_name, qty, unit, size, material, machine, vendor, requested_by, 
                demand_timestamp, received_at, rate, sku, reg_no, status, edited_by, edited_at, forwarded_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10, $11, $12, $13, 'reviewed', $14, NOW(), NOW())`,
`            INSERT INTO pending_requests (
                id, part_name, qty, unit, size, material, machine, vendor, requested_by, 
                demand_timestamp, received_at, rate, sku, reg_no, status, edited_by, edited_at, forwarded_at, category
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10, $11, $12, $13, 'reviewed', $14, NOW(), NOW(), $15)`
);

content = content.replace(
`            item.price || item.rate || '',
            item.sku || '',
            item.regNo || '',
            editorName
        ];`,
`            item.price || item.rate || '',
            item.sku || '',
            item.regNo || '',
            editorName,
            item.category || ''
        ];`
);

// Chunk 4: forward
content = content.replace(
`        const queryText = \`
            UPDATE pending_requests 
            SET part_name = $1, qty = $2, size = $3, material = $4, machine = $5, vendor = $6, rate = $7,
                sku = $8, reg_no = $9, status = 'reviewed', edited_by = 'Reviewer', edited_at = NOW(), forwarded_at = NOW(), unit = $11
            WHERE id = $10
            RETURNING *
        \`;`,
`        const queryText = \`
            UPDATE pending_requests 
            SET part_name = $1, qty = $2, size = $3, material = $4, machine = $5, vendor = $6, rate = $7,
                sku = $8, reg_no = $9, status = 'reviewed', edited_by = 'Reviewer', edited_at = NOW(), forwarded_at = NOW(), unit = $11, category = $12
            WHERE id = $10
            RETURNING *
        \`;`
);

content = content.replace(
`            editData.sku || '',
            editData.regNo || '',
            id,
            editData.unit || ''
        ];`,
`            editData.sku || '',
            editData.regNo || '',
            id,
            editData.unit || '',
            editData.category || ''
        ];`
);

// Chunk 5: approve
content = content.replace(
`        const queryText = \`
            UPDATE pending_requests 
            SET part_name = $1, qty = $2, size = $3, material = $4, machine = $5, vendor = $6, rate = $7,
                sku = $8, reg_no = $9, status = 'approved', approved_by = 'Manager', approved_at = NOW()
            WHERE id = $10
            RETURNING *
        \`;`,
`        const queryText = \`
            UPDATE pending_requests 
            SET part_name = $1, qty = $2, size = $3, material = $4, machine = $5, vendor = $6, rate = $7,
                sku = $8, reg_no = $9, status = 'approved', approved_by = 'Manager', approved_at = NOW(), unit = $11, category = $12
            WHERE id = $10
            RETURNING *
        \`;`
);

content = content.replace(
`            approvedData.price || approvedData.rate || '',
            approvedData.sku || '',
            approvedData.regNo || '',
            id
        ];`,
`            approvedData.price || approvedData.rate || '',
            approvedData.sku || '',
            approvedData.regNo || '',
            id,
            approvedData.unit || '',
            approvedData.category || ''
        ];`
);

fs.writeFileSync(file, content);
console.log('Updated server.js');
