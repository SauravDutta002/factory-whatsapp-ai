const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');
const functions = `  function handleClearFilters() {
    setSearchQuery('');
    setSelectedMachine('');
    setSelectedVendor('');
    setSelectedInventoryMachine('');
  }

  const handlePartNameChange = (e) => setEditFormData({...editFormData, partName: e.target.value});
  const handleSkuChange = (e) => setEditFormData({...editFormData, sku: e.target.value});
`;
content = content.replace('  const dashboardProps = ', functions + '\n  const dashboardProps = ');
fs.writeFileSync('src/App.jsx', content);
console.log('Fixed missing functions');
