const fs = require('fs');
const backup = fs.readFileSync('app_jsx_backup.txt', 'utf8');

const str1 = ") : activeTab === 'whatsapp_settings' ? (";
const str2 = "      {showCustomDemandModal && (";

const idx1 = backup.indexOf(str1);
const idx2 = backup.indexOf(str2);

if (idx1 > -1 && idx2 > -1) {
  // Extract the missing block, and prepend the closing tags of DemandTable
  const missingCode = `
                  setRejectReason={setRejectReason}
                />
              </div>
            )}
          </div>
        ` + backup.substring(idx1, idx2) + `
      {/* MODALS */}
`;
  fs.writeFileSync('missing.jsx', missingCode);
  console.log('Successfully extracted missing code to missing.jsx');
} else {
  console.log('Could not find boundaries', idx1, idx2);
}