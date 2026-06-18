const fs = require('fs');
const backup = fs.readFileSync('app_jsx_backup.txt', 'utf8');

const startString = `    <>
      <main className="main-workspace">


        {hasNoActiveGroups && activeTab !== 'whatsapp_settings' && (`;

const endString = `    </div>
  );

  function handleClearFilters`;

const startIdx = backup.indexOf(startString);
const endIdx = backup.indexOf(endString);

if (startIdx > -1 && endIdx > -1) {
  let jsxBlock = backup.substring(startIdx, endIdx);
  
  // Remove the <main> tag that we originally wanted to remove
  jsxBlock = jsxBlock.replace(`<main className="main-workspace">\n\n\n        {hasNoActiveGroups`, `{hasNoActiveGroups`);
  
  // Also remove the corresponding closing </main> tag
  jsxBlock = jsxBlock.replace(`      )}
      </main>
    </div>`, `      )}
    </div>`);

  const header = `import React, { useState } from 'react';
import ApproverMetrics from './ApproverMetrics';
import Filters from './Filters';
import DemandTable from './DemandTable';
import { FiAlertTriangle, FiInfo, FiRefreshCw, FiClipboard } from 'react-icons/fi';

export default function DashboardContent({
  hasNoActiveGroups,
  activeTab,
  whatsappStatus,
  availableGroups,
  fetchWhatsappStatus,
  handleToggleGroupActive,
  currentUserRole,
  kpiData,
  searchQuery,
  setSearchQuery,
  selectedMachine,
  setSelectedMachine,
  selectedVendor,
  setSelectedVendor,
  uniqueMachines,
  uniqueVendors,
  filteredRequests,
  handleClearFilters,
  editingRowId,
  inventoryItems,
  editFormData,
  setEditFormData,
  handleSaveInlineEdit,
  setEditingRowId,
  handleReceive,
  handleReject,
  handleApprove,
  handleForward,
  rejectingId,
  setRejectingId,
  rejectReason,
  setRejectReason,
  showCustomDemandModal,
  setShowCustomDemandModal,
  customDemandData,
  handleCustomDemandPartNameChange,
  globalUniquePartNames,
  handleCustomDemandSkuChange,
  globalUniqueSKUs,
  handleCustomDemandRegNoChange,
  globalUniqueRegNos,
  setCustomDemandData,
  globalUniqueSizes,
  globalUniqueMaterials,
  globalUniqueMachines,
  globalUniqueVendors,
  submitCustomDemand,
  globalModal
}) {
  return (`;

  const footer = `
  );
}`;

  fs.writeFileSync('src/shared/components/DashboardContent.jsx', header + '\n' + jsxBlock + footer);
  console.log('Successfully recreated DashboardContent.jsx');
} else {
  console.log('Could not find boundaries');
}
