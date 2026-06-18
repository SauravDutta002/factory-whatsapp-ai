const fs = require('fs');

const backup = fs.readFileSync('app_jsx_backup.txt', 'utf8');
const lines = backup.split('\n');

const startIdx = lines.findIndex(l => l.includes('</header>'));
const endIdx = lines.findIndex((l, i) => l.trim() === '</main>' && lines[i+1].includes('</div>'));

let content = lines.slice(startIdx + 1, endIdx).join('\n');

// 1. Fix stray </table> in DashboardContent.jsx
content = content.replace('                />\r\n                </table>', '                />');
content = content.replace('                />\n                </table>', '                />');

const header = `import React from 'react';
import ApproverMetrics from './ApproverMetrics';
import Filters from './Filters';
import DemandTable from './DemandTable';
import PendingCard from './PendingCard';
import RequestCard from './RequestCard';
import { FiRefreshCw, FiAlertTriangle, FiInfo, FiTrash2, FiClipboard, FiInbox, FiUser, FiDownload, FiPrinter } from 'react-icons/fi';

export default function DashboardContent(props) {
  const { activeTab, kpiData, filteredRequests, viewMode, currentPendingIndex, setCurrentPendingIndex, handleApprove, handleReject, handleForward, rejectingId, setRejectingId, rejectReason, setRejectReason, currentUserRole, inventoryItems, selectedInventoryMachine, setSelectedInventoryMachine, uniqueInventoryMachines, inventoryLoading, handleReceive, editingRowId, setEditingRowId, editFormData, setEditFormData, handleSaveInlineEdit, handlePartNameChange, handleSkuChange, searchQuery, setSearchQuery, selectedMachine, setSelectedMachine, selectedVendor, setSelectedVendor, uniqueMachines, uniqueVendors, whatsappStatus, whatsappGroups, setWhatsappGroups, fetchWhatsappStatus, fetchWhatsappGroups, showCustomDemandModal, setShowCustomDemandModal, customDemandData, setCustomDemandData, submitCustomDemand, globalModal, setGlobalModal, handleClearFilters, filteredInventory, hasNoActiveGroups, setActiveTab, pendingRequests, apiLimitCount, apiLimitMax, setCurrentUserRole, setViewMode, fetchData, refreshing, globalUniquePartNames, globalUniqueVendors, globalUniqueMachines, globalUniqueMaterials, globalUniqueSKUs, globalUniqueRegNos, handleCustomDemandPartNameChange, handleCustomDemandSkuChange, handleCustomDemandRegNoChange, voiceNotes, exportStartDate, setExportStartDate, exportEndDate, setExportEndDate, exportToExcel, exportToPDF, printDemandList, customConfirm, availableGroups, handleToggleGroupActive } = props;

  return (
    <>
`;

const footer = `
    </>
  );
}
`;

fs.writeFileSync('src/shared/components/DashboardContent.jsx', header + content + footer);
console.log('Restored DashboardContent.jsx accurately.');
