import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';

export default function DemandTable(props) {
  const { filteredRequests, editingRowId, activeTab, currentUserRole, inventoryItems, editFormData, setEditFormData, handleSaveInlineEdit, setEditingRowId, handleReceive, handleReject, handleApprove, handleForward, rejectingId, setRejectingId, rejectReason, setRejectReason } = props;

  // Options extracted dynamically from master inventory catalog for inline editing
  const uniqueUnits = Array.from(new Set([
    editFormData?.unit,
    ...inventoryItems.map(i => i.unit)
  ].filter(Boolean))).sort();

  const uniquePartNames = Array.from(new Set([
    editFormData?.partName,
    ...inventoryItems.map(i => i.partName)
  ].filter(Boolean))).sort();

  const uniqueSKUs = Array.from(new Set([
    editFormData?.sku,
    ...inventoryItems.map(i => i.sku)
  ].filter(Boolean))).sort();

  const uniqueRegNos = Array.from(new Set([
    editFormData?.regNo,
    ...inventoryItems.map(i => i.regNo)
  ].filter(Boolean))).sort();

  const qtyOptions = Array.from(new Set([
    editFormData?.qty,
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '12', '15', '20', '25', '30', '40', '50', '100'
  ].filter(Boolean))).sort((a, b) => {
    const na = parseInt(a.replace(/[^0-9]/g, '')) || 0;
    const nb = parseInt(b.replace(/[^0-9]/g, '')) || 0;
    return na - nb;
  });

  const uniqueSizes = Array.from(new Set([
    editFormData?.size,
    ...inventoryItems.map(i => i.size)
  ].filter(Boolean))).sort();

  const uniqueMaterials = Array.from(new Set([
    editFormData?.material,
    ...inventoryItems.map(i => i.material)
  ].filter(Boolean))).sort();

  const uniqueMachines = Array.from(new Set([
    editFormData?.machine,
    ...inventoryItems.map(i => i.machine)
  ].filter(Boolean))).sort();

  const uniqueVendors = Array.from(new Set([
    editFormData?.vendor,
    ...inventoryItems.map(i => i.vendor)
  ].filter(Boolean))).sort();

  // Master data auto-fill handlers for inline editing
  const handlePartNameChange = (e) => {
    const val = e.target.value;
    console.log('[Console Log - List View Edit] Selected Part Name:', val);
    const matched = inventoryItems.find(i => i.partName === val);
    if (matched) {
      setEditFormData(prev => ({
        ...prev,
        partName: val,
        sku: matched.sku || '',
        regNo: matched.regNo || '',
        size: matched.size !== '—' ? (matched.size || prev.size) : prev.size,
        material: matched.material !== '—' ? (matched.material || prev.material) : prev.material,
        machine: matched.machine !== 'General Compatibility' ? (matched.machine || prev.machine) : prev.machine,
        vendor: matched.vendor !== '—' ? (matched.vendor || prev.vendor) : prev.vendor,
        price: matched.price || prev.price,
        unit: matched.unit || prev.unit
      }));
    } else {
      setEditFormData(prev => ({ ...prev, partName: val }));
    }
  };

  const handleSkuChange = (e) => {
    const val = e.target.value;
    console.log('[Console Log - List View Edit] Selected SKU (P No.):', val);
    const matched = inventoryItems.find(i => i.sku === val);
    if (matched) {
      setEditFormData(prev => ({
        ...prev,
        sku: val,
        partName: matched.partName || prev.partName,
        regNo: matched.regNo || '',
        size: matched.size !== '—' ? (matched.size || prev.size) : prev.size,
        material: matched.material !== '—' ? (matched.material || prev.material) : prev.material,
        machine: matched.machine !== 'General Compatibility' ? (matched.machine || prev.machine) : prev.machine,
        vendor: matched.vendor !== '—' ? (matched.vendor || prev.vendor) : prev.vendor,
        price: matched.price || prev.price,
        unit: matched.unit || prev.unit
      }));
    } else {
      setEditFormData(prev => ({ ...prev, sku: val }));
    }
  };

  const handleRegNoChange = (e) => {
    const val = e.target.value;
    console.log('[Console Log - List View Edit] Selected Reg No.:', val);
    const matched = inventoryItems.find(i => i.regNo === val);
    if (matched) {
      setEditFormData(prev => ({
        ...prev,
        regNo: val,
        partName: matched.partName || prev.partName,
        sku: matched.sku || '',
        size: matched.size !== '—' ? (matched.size || prev.size) : prev.size,
        material: matched.material !== '—' ? (matched.material || prev.material) : prev.material,
        machine: matched.machine !== 'General Compatibility' ? (matched.machine || prev.machine) : prev.machine,
        vendor: matched.vendor !== '—' ? (matched.vendor || prev.vendor) : prev.vendor,
        price: matched.price || prev.price,
        unit: matched.unit || prev.unit
      }));
    } else {
      setEditFormData(prev => ({ ...prev, regNo: val }));
    }
  };

  return (
    <>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border-medium)' }}>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</th>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>P No.</th>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Reg No.</th>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Part Name</th>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Qty</th>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Unit</th>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Size Specs</th>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Material</th>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Machine</th>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Vendor</th>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Requested By</th>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Timestamp</th>
            <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Rate</th>
            {(activeTab === 'pending' || activeTab === 'receiving') && currentUserRole !== 'observer' && (
              <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((item, index) => {
            const isEditingRow = editingRowId === item.id;
            const isApproved = activeTab === 'approved' || item.status === 'approved';
            
            // Status badge style helper
            let statusBg = '#fffbeb';
            let statusColor = '#b45309';
            let statusLabel = 'Awaiting Review';

            if (isApproved) {
              statusBg = '#f0fdf4';
              statusColor = '#15803d';
              statusLabel = 'Approved';
            } else if (item.status === 'reviewed') {
              statusBg = '#eff6ff';
              statusColor = '#1e40af';
              statusLabel = 'Reviewed';
            } else if (item.status === 'rejected') {
              statusBg = '#fff1f2';
              statusColor = '#be123c';
              statusLabel = 'Rejected';
            }

            return (
              <tr 
                key={item.id || index}
                style={{ 
                  borderBottom: index === filteredRequests.length - 1 ? 'none' : '1px solid var(--border-light)',
                  transition: 'background-color var(--transition-fast)'
                }}
                className="inventory-table-row"
              >
                {/* Status Badge */}
                <td style={{ padding: '1rem 1.25rem' }}>
                  <span 
                    className="status-badge"
                    style={{
                      backgroundColor: statusBg,
                      color: statusColor,
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {statusLabel}
                  </span>
                </td>

                {/* P No. / SKU */}
                <td style={{ padding: '1rem 1.25rem', fontFamily: 'monospace', fontWeight: 600, color: '#1d4ed8' }}>
                  {isEditingRow ? (
                    <input 
                      type="text"
                      value={editFormData.sku}
                      onChange={handleSkuChange}
                      placeholder="P No."
                      className="filter-select"
                      style={{ width: '130px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
                    />
                  ) : (
                    item.sku || '—'
                  )}
                </td>

                {/* Reg No. */}
                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                  {isEditingRow ? (
                    <input 
                      type="text"
                      value={editFormData.regNo}
                      onChange={handleRegNoChange}
                      placeholder="Reg No."
                      className="filter-select"
                      style={{ width: '130px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
                    />
                  ) : (
                    item.regNo || '—'
                  )}
                </td>

                {/* Part Name */}
                <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {isEditingRow ? (
                    <input 
                      type="text"
                      list="inventory-parts-list"
                      value={editFormData.partName}
                      onChange={handlePartNameChange}
                      placeholder="Part Name"
                      className="filter-select"
                      style={{ width: '220px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
                    />
                  ) : (
                    item.partName || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Unspecified</span>
                  )}
                </td>

                {/* Quantity */}
                <td style={{ padding: '1rem 1.25rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {isEditingRow ? (
                    <input 
                      type="text"
                      value={editFormData.qty}
                      onChange={(e) => setEditFormData({ ...editFormData, qty: e.target.value })}
                      placeholder="Qty"
                      className="filter-select"
                      style={{ width: '60px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
                    />
                  ) : (
                    item.qty || '—'
                  )}
                </td>

                {/* Unit */}
                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-primary)' }}>
                  {isEditingRow ? (
                    <input 
                      type="text"
                      list="inventory-units-list"
                      value={editFormData.unit || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, unit: e.target.value })}
                      placeholder="Unit"
                      className="filter-select"
                      style={{ width: '70px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
                    />
                  ) : (
                    item.unit || '—'
                  )}
                </td>

                {/* Size Specs */}
                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-primary)' }}>
                  {isEditingRow ? (
                    <input 
                      type="text"
                      value={editFormData.size}
                      onChange={(e) => setEditFormData({ ...editFormData, size: e.target.value })}
                      placeholder="Size specs"
                      className="filter-select"
                      style={{ width: '130px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
                    />
                  ) : (
                    item.size || '—'
                  )}
                </td>

                {/* Material */}
                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                  {isEditingRow ? (
                    <input 
                      type="text"
                      list="inventory-materials-list"
                      value={editFormData.material}
                      onChange={(e) => setEditFormData({ ...editFormData, material: e.target.value })}
                      placeholder="Material"
                      className="filter-select"
                      style={{ width: '130px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
                    />
                  ) : (
                    item.material || '—'
                  )}
                </td>

                {/* Machine */}
                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                  {isEditingRow ? (
                    <input 
                      type="text"
                      list="inventory-machines-list"
                      value={editFormData.machine}
                      onChange={(e) => setEditFormData({ ...editFormData, machine: e.target.value })}
                      placeholder="Machine"
                      className="filter-select"
                      style={{ width: '160px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
                    />
                  ) : (
                    <span style={{ 
                      display: 'inline-block',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      backgroundColor: '#f1f5f9',
                      color: 'var(--text-primary)'
                    }}>
                      {item.machine || 'General'}
                    </span>
                  )}
                </td>

                {/* Vendor */}
                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {isEditingRow ? (
                    <input 
                      type="text"
                      list="inventory-vendors-list"
                      value={editFormData.vendor}
                      onChange={(e) => setEditFormData({ ...editFormData, vendor: e.target.value })}
                      placeholder="Vendor"
                      className="filter-select"
                      style={{ width: '180px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
                    />
                  ) : (
                    item.vendor || '—'
                  )}
                </td>

                {/* Requested By */}
                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {item.requestedBy || 'WhatsApp User'}
                </td>

                {/* Timestamp */}
                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                  {item.receivedAt ? new Date(item.receivedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : '—'}
                </td>

                {/* Rate */}
                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {isEditingRow ? (
                    <input 
                      type="text"
                      value={editFormData.price}
                      onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                      className="filter-select"
                      style={{ width: '80px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
                    />
                  ) : (
                    item.price && parseFloat(item.price) > 0 ? `Rs.${item.price}` : (item.rate ? `Rs.${item.rate}` : '—')
                  )}
                </td>

                {/* Actions Column */}
                {(activeTab === 'pending' || activeTab === 'receiving') && currentUserRole !== 'observer' && (
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    {activeTab === 'receiving' ? (
                      <button 
                        className="btn-refresh" 
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', backgroundColor: 'var(--accent-green-bg)', borderColor: '#bbf7d0', color: 'var(--accent-green-text)', fontWeight: 600 }}
                        onClick={() => handleReceive(item.id)}
                      >
                        Mark as Received
                      </button>
                    ) : isEditingRow ? (
                      <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                        <button 
                          className="btn-refresh" 
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', backgroundColor: 'var(--accent-green-bg)', borderColor: '#bbf7d0', color: 'var(--accent-green-text)' }} 
                          onClick={() => handleSaveInlineEdit(item.id)}
                        >
                          Save
                        </button>
                        <button 
                          className="btn-refresh" 
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderColor: '#fecaca', color: '#dc2626' }} 
                          onClick={() => setEditingRowId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                        {/* Edit Button */}
                        <button 
                          className="btn-refresh" 
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', color: 'var(--accent-blue-text)' }} 
                          onClick={() => {
                            setEditingRowId(item.id);
                            setEditFormData({
                              partName: item.partName || '',
                              qty: item.qty || '',
                              unit: item.unit || '',
                              size: item.size || '',
                              material: item.material || '',
                              machine: item.machine || '',
                              vendor: item.vendor || '',
                              price: item.price || item.rate || ''
                            });
                          }}
                        >
                          Edit
                        </button>

                        {currentUserRole === 'reviewer' ? (
                          <>
                            <button 
                              className="btn-refresh" 
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', backgroundColor: 'var(--accent-green-bg)', borderColor: '#bbf7d0', color: 'var(--accent-green-text)' }}
                              onClick={() => handleForward(item.id, {
                                partName: item.partName,
                                qty: item.qty,
                                unit: item.unit,
                                size: item.size,
                                material: item.material,
                                machine: item.machine,
                                vendor: item.vendor,
                                price: item.price || item.rate
                              })}
                            >
                              Forward
                            </button>
                            <button 
                              className="btn-refresh" 
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', backgroundColor: 'var(--accent-rose-bg)', borderColor: '#fecaca', color: 'var(--accent-rose-text)', opacity: rejectingId === item.id ? 0.7 : 1 }}
                              onClick={() => handleReject(item.id)}
                              disabled={rejectingId === item.id}
                            >
                              {rejectingId === item.id ? 'Rejecting...' : 'Reject'}
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              className="btn-refresh" 
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', backgroundColor: 'var(--accent-green-bg)', borderColor: '#bbf7d0', color: 'var(--accent-green-text)' }}
                              onClick={() => handleApprove(item.id, {
                                partName: item.partName,
                                qty: item.qty,
                                unit: item.unit,
                                size: item.size,
                                material: item.material,
                                machine: item.machine,
                                vendor: item.vendor,
                                price: item.price || item.rate
                              })}
                            >
                              Approve
                            </button>
                            <button 
                              className="btn-refresh" 
                              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.3rem 0.6rem', fontSize: '0.75rem', backgroundColor: 'var(--accent-rose-bg)', borderColor: '#fecaca', color: 'var(--accent-rose-text)', opacity: rejectingId === item.id ? 0.7 : 1 }}
                              onClick={() => handleReject(item.id)}
                              disabled={rejectingId === item.id}
                            >
                              {rejectingId === item.id ? (
                                <><FiRefreshCw size={12} style={{ animation: 'spin 1s linear infinite' }} /> Rejecting</>
                              ) : 'Reject'}
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Autocomplete Lists extracted from DashboardContent */}
      <datalist id="inventory-units-list">
        {uniqueUnits && uniqueUnits.map(u => (
          <option key={u} value={u} />
        ))}
      </datalist>
      <datalist id="inventory-parts-list">
        {uniquePartNames && uniquePartNames.map(name => (
          <option key={name} value={name} />
        ))}
      </datalist>
      <datalist id="inventory-vendors-list">
        {uniqueVendors && uniqueVendors.map(ven => (
          <option key={ven} value={ven} />
        ))}
      </datalist>
      <datalist id="inventory-machines-list">
        {uniqueMachines && uniqueMachines.map(mac => (
          <option key={mac} value={mac} />
        ))}
      </datalist>
      <datalist id="inventory-materials-list">
        {uniqueMaterials && uniqueMaterials.map(mat => (
          <option key={mat} value={mat} />
        ))}
      </datalist>
    </>
  );
}
