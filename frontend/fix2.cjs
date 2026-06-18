const fs = require('fs');
const backup = fs.readFileSync('app_jsx_backup.txt', 'utf8');

const marker = '  return (\r\n    <div className="app-container">';
const marker2 = '  return (\n    <div className="app-container">';
let idx = backup.indexOf(marker);
if (idx === -1) idx = backup.indexOf(marker2);

const topPartRaw = backup.substring(0, idx);
let topPart = topPartRaw.replace("  const [rejectReason, setRejectReason] = useState('');\n", '');
topPart = topPart.replace("  const [rejectReason, setRejectReason] = useState('');\r\n", '');

topPart = topPart.replace("  const [currentPendingIndex, setCurrentPendingIndex] = useState(0);", "  const [currentPendingIndex, setCurrentPendingIndex] = useState(0);\n  const [rejectReason, setRejectReason] = useState('');");

const dashboardProps = `  const setCurrentUserRole = () => {};

  const dashboardProps = { loading, voiceNotes, exportStartDate, setExportStartDate, exportEndDate, setExportEndDate, exportToExcel, exportToPDF, printDemandList, customConfirm, availableGroups, handleToggleGroupActive,  activeTab, kpiData, filteredRequests, viewMode, currentPendingIndex, setCurrentPendingIndex, handleApprove, handleReject, handleForward, rejectingId, setRejectingId, rejectReason, setRejectReason, currentUserRole, inventoryItems, selectedInventoryMachine, setSelectedInventoryMachine, uniqueInventoryMachines, inventoryLoading, handleReceive, editingRowId, setEditingRowId, editFormData, setEditFormData, handleSaveInlineEdit, handlePartNameChange, handleSkuChange, searchQuery, setSearchQuery, selectedMachine, setSelectedMachine, selectedVendor, setSelectedVendor, uniqueMachines, uniqueVendors, whatsappStatus, whatsappGroups, setWhatsappGroups, fetchWhatsappStatus, fetchWhatsappGroups, showCustomDemandModal, setShowCustomDemandModal, customDemandData, setCustomDemandData, submitCustomDemand, globalModal, setGlobalModal, handleClearFilters, filteredInventory, hasNoActiveGroups, setActiveTab, pendingRequests, apiLimitCount, apiLimitMax, setCurrentUserRole, setViewMode, fetchData, refreshing, globalUniquePartNames, globalUniqueMaterials, globalUniqueMachines, globalUniqueVendors, globalUniqueSKUs, globalUniqueRegNos, globalUniqueSizes, handleCustomDemandPartNameChange, handleCustomDemandSkuChange, handleCustomDemandRegNoChange };
`;

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
import ReceiverDashboard from './users/receiver/ReceiverDashboard';
`;

fs.writeFileSync('src/App.jsx', imports + topPart + dashboardProps + router);
console.log('RESTORED App.jsx successfully!');
