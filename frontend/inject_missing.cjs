const fs = require('fs');

const missingCode = fs.readFileSync('missing.jsx', 'utf8');
let dashboardContent = fs.readFileSync('src/shared/components/DashboardContent.jsx', 'utf8');

const targetToReplace = `                  setRejectReason={setRejectReason}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* MODALS */}
`;

if (dashboardContent.includes(targetToReplace)) {
  dashboardContent = dashboardContent.replace(targetToReplace, missingCode);
  fs.writeFileSync('src/shared/components/DashboardContent.jsx', dashboardContent);
  console.log('Successfully injected missing code back into DashboardContent.jsx!');
} else {
  console.log('Could not find the target code to replace in DashboardContent.jsx');
}
