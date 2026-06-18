const fs = require('fs');
const backup = fs.readFileSync('app_jsx_backup.txt', 'utf8');

// The marker for the start of the <main> block
const headerEndMarker = '</header>';
const startIdx = backup.indexOf(headerEndMarker);

// The marker for the end of the <main> block
const mainEndMarker = '      </main>';
const endIdx = backup.indexOf(mainEndMarker, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.log('MARKERS NOT FOUND');
  process.exit(1);
}

// Extract content
let content = backup.substring(startIdx + headerEndMarker.length, endIdx + mainEndMarker.length);

// Fix stray </table> tag from DemandTable
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
      <main className="main-workspace">
`;

// we also need to append the Custom Demand Modal block after </main>
const modalStartIdx = backup.indexOf('{/* Custom Demand Modal */}');
const modalEndIdx = backup.indexOf('    </div>\r\n  );\r\n}');
let modalContent = '';
if (modalEndIdx !== -1) {
    modalContent = backup.substring(modalStartIdx, modalEndIdx);
} else {
    const modalEndIdx2 = backup.indexOf('    </div>\n  );\n}');
    modalContent = backup.substring(modalStartIdx, modalEndIdx2);
}

const footer = `
    </>
  );
}
`;

fs.writeFileSync('src/shared/components/DashboardContent.jsx', header + content + '\n' + modalContent + footer);
console.log('Restored perfectly!');
