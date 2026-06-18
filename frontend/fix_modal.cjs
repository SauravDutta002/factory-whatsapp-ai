const fs = require('fs');
const backup = fs.readFileSync('app_jsx_backup.txt', 'utf8');

const modalStartIdx = backup.indexOf('{/* Custom Demand Modal */}');
let modalEndIdx = backup.indexOf('    </div>\r\n  );');
if (modalEndIdx === -1) modalEndIdx = backup.indexOf('    </div>\n  );');

const modalContent = backup.substring(modalStartIdx, modalEndIdx);

let dc = fs.readFileSync('src/shared/components/DashboardContent.jsx', 'utf8');
const dcModalStart = dc.indexOf('{/* Custom Demand Modal */}');

if (dcModalStart !== -1) {
    dc = dc.substring(0, dcModalStart) + modalContent + '\n    </>\n  );\n}\n';
    fs.writeFileSync('src/shared/components/DashboardContent.jsx', dc);
    console.log('Fixed Modal');
} else {
    console.log('Modal start not found in DC');
}
