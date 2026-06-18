const fs = require('fs');
const backup = fs.readFileSync('app_jsx_backup.txt', 'utf8');

// Find the start of the return statement
const marker = '  return (\r\n    <div className="app-container">';
const marker2 = '  return (\n    <div className="app-container">';
let idx = backup.indexOf(marker);
if (idx === -1) idx = backup.indexOf(marker2);

if (idx === -1) {
  console.log('MARKER NOT FOUND');
  process.exit(1);
}

const topPart = backup.substring(0, idx);

const dashboardProps = `  const dashboardProps = { activeTab, kpiData, filteredRequests, viewMode, currentPendingIndex, setCurrentPendingIndex, handleApprove, handleReject, handleForward, rejectingId, setRejectingId, rejectReason, setRejectReason, currentUserRole, inventoryItems, selectedInventoryMachine, setSelectedInventoryMachine, uniqueInventoryMachines, inventoryLoading, handleReceive, editingRowId, setEditingRowId, editFormData, setEditFormData, handleSaveInlineEdit, handlePartNameChange, handleSkuChange, searchQuery, setSearchQuery, selectedMachine, setSelectedMachine, selectedVendor, setSelectedVendor, uniqueMachines, uniqueVendors, whatsappStatus, whatsappGroups, setWhatsappGroups, fetchWhatsappStatus, fetchWhatsappGroups, showCustomDemandModal, setShowCustomDemandModal, customDemandData, setCustomDemandData, submitCustomDemand, globalModal, setGlobalModal, handleClearFilters, filteredInventory, hasNoActiveGroups, setActiveTab, pendingRequests, apiLimitCount, apiLimitMax, setCurrentUserRole, setViewMode, fetchData, refreshing };\n`;

const router = `  return (
    <>
      {currentUserRole === 'observer' && <ManagerDashboard {...dashboardProps} />}
      {currentUserRole === 'reviewer' && <EditorDashboard {...dashboardProps} />}
      {currentUserRole === 'manager' && <ApproverDashboard {...dashboardProps} />}
      {currentUserRole === 'receiver' && <ReceiverDashboard {...dashboardProps} />}
    </>
  );
}
`;

const imports = `import ManagerDashboard from './users/manager/ManagerDashboard';
import EditorDashboard from './users/editor/EditorDashboard';
import ApproverDashboard from './users/approver/ApproverDashboard';
import ReceiverDashboard from './users/receiver/ReceiverDashboard';\n`;

fs.writeFileSync('src/App.jsx', imports + topPart + dashboardProps + router);
console.log('SUCCESS');
