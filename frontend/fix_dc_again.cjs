const fs = require('fs');

const dc = fs.readFileSync('src/shared/components/DashboardContent.jsx', 'utf8');
const backup = fs.readFileSync('app_jsx_backup.txt', 'utf8');

// Find where the garbage starts in DC
const garbageIdx = dc.indexOf('\nimport React, { useState, useEffect }');
let cleanDc = dc;
if (garbageIdx !== -1) {
    cleanDc = dc.substring(0, garbageIdx);
}

// Find the modal in backup
const modalStart = backup.indexOf('{/* Custom Demand Modal */}');
const modalEnd = backup.indexOf('    </div>\r\n  );\r\n\r\n  function handleClearFilters()');
let modalContent = '';

if (modalStart !== -1) {
    if (modalEnd !== -1) {
        modalContent = backup.substring(modalStart, modalEnd + '    </div>'.length);
    } else {
        const modalEnd2 = backup.indexOf('    </div>\n  );\n\n  function handleClearFilters()');
        modalContent = backup.substring(modalStart, modalEnd2 + '    </div>'.length);
    }
}

cleanDc = cleanDc + '\n\n      ' + modalContent + '\n    </>\n  );\n}\n';

fs.writeFileSync('src/shared/components/DashboardContent.jsx', cleanDc);
console.log('Fixed DC again');
