const fs = require('fs');
const backup = fs.readFileSync('app_jsx_backup.txt', 'utf8');
const startIdx = backup.indexOf('function DemandTable(');
if (startIdx === -1) {
  console.log('DemandTable not found in backup');
  process.exit(1);
}
// Find the end of DemandTable
let braceCount = 0;
let endIdx = -1;
let started = false;
for (let i = startIdx; i < backup.length; i++) {
  if (backup[i] === '{') {
    braceCount++;
    started = true;
  } else if (backup[i] === '}') {
    braceCount--;
    if (started && braceCount === 0) {
      endIdx = i + 1;
      break;
    }
  }
}
let demandTableCode = backup.substring(startIdx, endIdx);
// Add imports at top
demandTableCode = "import React from 'react';\nimport { FiRefreshCw } from 'react-icons/fi';\n\nexport default " + demandTableCode;
fs.writeFileSync('src/shared/components/DemandTable.jsx', demandTableCode);
console.log('Restored DemandTable.jsx from backup');
