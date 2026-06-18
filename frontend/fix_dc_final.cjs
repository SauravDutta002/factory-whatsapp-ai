const fs = require('fs');

const backup = fs.readFileSync('app_jsx_backup.txt', 'utf8');
const dc = fs.readFileSync('src/shared/components/DashboardContent.jsx', 'utf8');

// Find the modal in backup
const modalStart = backup.indexOf('{/* Custom Demand Modal */}');
const clearFiltersIdx = backup.indexOf('function handleClearFilters()');
const modalEnd = backup.lastIndexOf('      )}', clearFiltersIdx) + '      )}'.length;

const modalContent = backup.substring(modalStart, modalEnd);

// Cut DC where the garbage started
const garbageIdx = dc.indexOf('\nimport React, { useState, useEffect }');
let cleanDc = dc;
if (garbageIdx !== -1) {
    cleanDc = dc.substring(0, garbageIdx);
} else {
    // maybe it has the unclosed modal from previous attempt
    const dcModalStart = dc.indexOf('{/* Custom Demand Modal */}');
    if (dcModalStart !== -1) {
        cleanDc = dc.substring(0, dcModalStart);
    }
}

// Assemble
const finalDc = cleanDc.trimEnd() + '\n\n      ' + modalContent + '\n    </>\n  );\n}\n';

fs.writeFileSync('src/shared/components/DashboardContent.jsx', finalDc);
console.log('Fixed DC permanently');
