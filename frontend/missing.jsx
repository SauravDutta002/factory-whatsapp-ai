
                  setRejectReason={setRejectReason}
                />
              </div>
            )}
          </div>
        ) : activeTab === 'whatsapp_settings' ? (
          /* WHATSAPP INTEGRATION SETTINGS VIEW */
          (currentUserRole !== 'manager' && currentUserRole !== 'observer') ? (
            <div className="empty-state">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3>Access Denied</h3>
              <p>You do not have administrative privileges to access WhatsApp Settings.</p>
            </div>
          ) : (
            <div className="whatsapp-settings-container">
              <div className="whatsapp-settings-card">
                <div className="whatsapp-settings-header">
                  <div>
                    <h2>WhatsApp Integration Control Panel</h2>
                    <p>Monitor status, scan pairing QR codes, and manage active sessions entirely from the dashboard.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {/* Status Badge */}
                    <span 
                      className="whatsapp-status-badge"
                      style={{
                        backgroundColor: 
                          whatsappStatus.status === 'connected' ? 'var(--accent-green-bg)' :
                          whatsappStatus.status === 'authenticating' ? 'var(--accent-blue-bg)' :
                          whatsappStatus.status === 'qr' ? 'var(--accent-amber-bg)' : 'var(--accent-rose-bg)',
                        color:
                          whatsappStatus.status === 'connected' ? 'var(--accent-green-text)' :
                          whatsappStatus.status === 'authenticating' ? 'var(--accent-blue-text)' :
                          whatsappStatus.status === 'qr' ? 'var(--accent-amber-text)' : 'var(--accent-rose-text)'
                      }}
                    >
                      <span className={`status-dot status-dot-${whatsappStatus.status}`}></span>
                      {whatsappStatus.status === 'connected' ? 'Connected' :
                       whatsappStatus.status === 'authenticating' ? 'Authenticating...' :
                       whatsappStatus.status === 'qr' ? 'Awaiting Scan' : 'Disconnected'}
                    </span>

                    {/* Moved Action Buttons */}
                    {whatsappStatus.status === 'connected' && (
                      <button 
                        className="btn-whatsapp-action btn-whatsapp-action-danger"
                        style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                        onClick={async () => {
                          if (await customConfirm('Disconnect WhatsApp', 'Are you sure you want to disconnect WhatsApp? This will log out the active session.')) {
                            try {
                              setRefreshing(true);
                              const res = await fetch('/api/whatsapp/logout', { method: 'POST' });
                              if (res.ok) {
                                await fetchWhatsappStatus();
                              }
                            } catch (err) {
                              console.error('Logout error:', err);
                            } finally {
                              setRefreshing(false);
                              setGlobalModal(prev => ({ ...prev, isOpen: false }));
                            }
                          }
                        }}
                        disabled={refreshing}
                      >
                        <svg style={{ width: '16px', height: '16px', marginRight: '0.35rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Disconnect Session
                      </button>
                    )}

                    {(whatsappStatus.status === 'disconnected' || whatsappStatus.status === 'qr') && (
                      <button 
                        className="btn-whatsapp-action"
                        style={{ 
                          backgroundColor: '#2563eb', 
                          color: 'white', 
                          border: 'none',
                          padding: '0.6rem 1.25rem',
                          fontSize: '0.9rem',
                          boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2), 0 2px 4px -1px rgba(37, 99, 235, 0.1)'
                        }}
                        onClick={async () => {
                          try {
                            setRefreshing(true);
                            await fetch('/api/whatsapp/reconnect', { method: 'POST' });
                            await fetchWhatsappStatus();
                          } catch (err) {
                            console.error('Reconnect error:', err);
                          } finally {
                            setRefreshing(false);
                          }
                        }}
                        disabled={refreshing}
                      >
                        <FiRefreshCw 
                          size={16} 
                          style={{ 
                            marginRight: '0.35rem',
                            animation: refreshing ? 'spin 1s linear infinite' : 'none' 
                          }} 
                        />
                        {refreshing ? 'Relaunching...' : 'Relaunch Client'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="whatsapp-settings-body">
                  {/* Warning Alert Banner inside settings page if connected but no active groups */}
                  {hasNoActiveGroups && (
                    <div 
                      style={{
                        backgroundColor: 'var(--accent-amber-bg)',
                        border: '1px solid #fde047',
                        color: 'var(--accent-amber-text)',
                        padding: '1rem 1.25rem',
                        borderRadius: '12px',
                        marginBottom: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <svg style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <strong style={{ display: 'block', marginBottom: '0.15rem' }}>No Active WhatsApp Groups Configured!</strong>
                        The AI demand parser will ignore incoming messages until at least one target group below is set to active.
                      </div>
                    </div>
                  )}

                  {/* Account detail grid if connected */}
                  {whatsappStatus.status === 'connected' && (
                    <div className="whatsapp-details-grid">
                      <div className="whatsapp-detail-item">
                        <span className="whatsapp-detail-label">Linked Number</span>
                        <span className="whatsapp-detail-value">+{whatsappStatus.phone || 'N/A'}</span>
                      </div>
                      <div className="whatsapp-detail-item">
                        <span className="whatsapp-detail-label">Display Name</span>
                        <span className="whatsapp-detail-value">{whatsappStatus.pushname || 'WhatsApp Client'}</span>
                      </div>
                      <div className="whatsapp-detail-item" style={{ gridColumn: 'span 2' }}>
                        <span className="whatsapp-detail-label">Last Connected Time</span>
                        <span className="whatsapp-detail-value">
                          {whatsappStatus.lastConnected 
                            ? new Date(whatsappStatus.lastConnected).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) 
                            : 'N/A'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* QR code scanner section if awaiting scan */}
                  {whatsappStatus.status === 'qr' && whatsappStatus.qr && (
                    <div className="whatsapp-qr-section">
                      <div className="whatsapp-qr-frame">
                        <img 
                          src={whatsappStatus.qrDataUrl || `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(whatsappStatus.qr)}`} 
                          alt="WhatsApp pairing QR code"
                          className="whatsapp-qr-image"
                        />
                      </div>

                      <div className="whatsapp-instructions">
                        <h3>Scan to reconnect WhatsApp</h3>
                        <ol className="whatsapp-steps">
                          <li className="whatsapp-step-item">
                            <span className="whatsapp-step-num">1</span>
                            <span>Open <strong>WhatsApp</strong> on your mobile phone.</span>
                          </li>
                          <li className="whatsapp-step-item">
                            <span className="whatsapp-step-num">2</span>
                            <span>Tap <strong>Menu</strong> (three vertical dots on Android) or <strong>Settings</strong> (gear icon on iOS).</span>
                          </li>
                          <li className="whatsapp-step-item">
                            <span className="whatsapp-step-num">3</span>
                            <span>Select <strong>Linked Devices</strong>, and then tap <strong>Link a Device</strong>.</span>
                          </li>
                          <li className="whatsapp-step-item">
                            <span className="whatsapp-step-num">4</span>
                            <span>Point your phone camera to this screen to capture and scan the QR code.</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* Loading placeholder when initializing or authenticating (checking session) */}
                  {(whatsappStatus.status === 'disconnected' || whatsappStatus.status === 'authenticating') && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3.5rem 1rem', gap: '1.25rem' }}>
                      <div className="spinner"></div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                          {whatsappStatus.status === 'authenticating' ? 'Connecting & Syncing History...' : 'Initializing WhatsApp Client...'}
                        </p>
                        <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                          {whatsappStatus.status === 'authenticating' ? 'Verifying linked session credentials and checking device connection...' : 'Starting backend browser instance in sandbox mode...'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Group Routing Rules Section */}
                  <div className="whatsapp-groups-section" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', marginTop: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      Group Routing Rules
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                      Select which WhatsApp groups the AI Demand Parser should monitor. Messages from unselected groups will be ignored.
                    </p>

                    {availableGroups.length === 0 ? (
                      <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '12px', textAlign: 'center', border: '1px dashed var(--border-medium)' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                          {whatsappStatus.status === 'connected' 
                            ? 'No active group chats found on this WhatsApp account.' 
                            : 'Connect WhatsApp to fetch available groups.'}
                        </p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {availableGroups.map((group) => (
                          <div 
                            key={group.id} 
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '1rem 1.25rem',
                              backgroundColor: '#f8fafc',
                              borderRadius: '12px',
                              border: '1px solid var(--border-light)',
                              transition: 'background-color var(--transition-fast)'
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.925rem' }}>
                                {group.name}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '0.15rem' }}>
                                ID: {group.id}
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleToggleGroupActive(group)}
                              className="btn-refresh"
                              style={{
                                padding: '0.45rem 1rem',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                backgroundColor: group.active ? 'var(--accent-green-bg)' : '#ffffff',
                                borderColor: group.active ? '#bbf7d0' : 'var(--border-medium)',
                                color: group.active ? 'var(--accent-green-text)' : 'var(--text-secondary)',
                                borderRadius: '9999px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                boxShadow: 'var(--shadow-sm)'
                              }}
                            >
                              {group.active ? (
                                <>
                                  <span style={{ width: '6px', height: '6px', backgroundColor: '#16a34a', borderRadius: '50%' }}></span>
                                  Active
                                </>
                              ) : 'Inactive'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>


                </div>
              </div>
            </div>
          )
        ) : (
          <>
            {/* KPI Summary Panels */}
            <ApproverMetrics
              newWorkerDemands={kpiData.newWorkerDemands}
              pendingApproval={kpiData.pendingApproval}
              approvedNotReceived={kpiData.approvedNotReceived}
            />

            {/* Quick Filters */}
            <Filters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedMachine={selectedMachine}
              setSelectedMachine={setSelectedMachine}
              selectedVendor={selectedVendor}
              setSelectedVendor={setSelectedVendor}
              uniqueMachines={uniqueMachines}
              uniqueVendors={uniqueVendors}
            />

            {/* Export Toolbar */}
            {activeTab === 'approved' && (
              <div className="export-toolbar no-print" style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Export Demand List</h3>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Start Date</label>
                    <input type="date" value={exportStartDate} onChange={e => setExportStartDate(e.target.value)} className="filter-select" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>End Date</label>
                    <input type="date" value={exportEndDate} onChange={e => setExportEndDate(e.target.value)} className="filter-select" />
                  </div>
                  </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  <button onClick={exportToExcel} className="btn-refresh" style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '0.5rem 1rem' }}>
                    <FiDownload style={{ marginRight: '0.35rem' }} /> Export Excel
                  </button>
                  <button onClick={exportToPDF} className="btn-refresh" style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem' }}>
                    <FiDownload style={{ marginRight: '0.35rem' }} /> Export PDF
                  </button>
                  <button onClick={printDemandList} className="btn-refresh" style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '0.5rem 1rem' }}>
                    <FiPrinter style={{ marginRight: '0.35rem' }} /> Print Demand List
                  </button>
                </div>
              </div>
            )}

            {filteredRequests.length === 0 ? (
              <div className="empty-state">
                <FiInbox size={56} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.6 }} />
                <h3>No Demands Found</h3>
                <p>
                  {activeTab === 'pending' 
                    ? 'No requests are currently awaiting approval.' 
                    : 'The historical database from Google Sheets is empty or matches no filters.'}
                </p>
              </div>
            ) : viewMode === 'list' ? (
              /* LIST/TABLE VIEW FORMAT FOR PENDING & APPROVED REQUESTS */
              <div className="table-responsive" style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                overflowX: 'auto',
                marginTop: '1rem'
              }}>
                
                <DemandTable
                  filteredRequests={filteredRequests}
                  editingRowId={editingRowId}
                  activeTab={activeTab}
                  currentUserRole={currentUserRole}
                  inventoryItems={inventoryItems}
                  editFormData={editFormData}
                  setEditFormData={setEditFormData}
                  handleSaveInlineEdit={handleSaveInlineEdit}
                                                      setEditingRowId={setEditingRowId}
                  handleReceive={handleReceive}
                  handleReject={handleReject}
                  handleApprove={handleApprove}
                  handleForward={handleForward}
                  rejectingId={rejectingId}
                  setRejectingId={setRejectingId}
                  rejectReason={rejectReason}
                  setRejectReason={setRejectReason}
                />
                </table>
                <datalist id="inventory-parts-list">
                  {globalUniquePartNames.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
                <datalist id="inventory-vendors-list">
                  {globalUniqueVendors.map(ven => (
                    <option key={ven} value={ven} />
                  ))}
                </datalist>
                <datalist id="inventory-machines-list">
                  {globalUniqueMachines.map(mac => (
                    <option key={mac} value={mac} />
                  ))}
                </datalist>
                <datalist id="inventory-materials-list">
                  {globalUniqueMaterials.map(mat => (
                    <option key={mat} value={mat} />
                  ))}
                </datalist>
              </div>
            ) : (activeTab === 'pending' || activeTab === 'receiving') ? (
              /* SLIDESHOW / CAROUSEL FORMAT FOR PENDING APPROVALS & RECEIVING QUEUE */
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '2rem' }}>
                  {/* Left Chevron Button */}
                  <button 
                    className="btn-refresh" 
                    disabled={currentPendingIndex === 0} 
                    onClick={() => setCurrentPendingIndex(p => Math.max(0, p - 1))}
                    style={{ 
                      width: '46px', 
                      height: '46px', 
                      padding: 0, 
                      borderRadius: '50%', 
                      justifyContent: 'center', 
                      flexShrink: 0,
                      opacity: currentPendingIndex === 0 ? 0.3 : 1,
                      cursor: currentPendingIndex === 0 ? 'not-allowed' : 'pointer',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Focused Central Card */}
                  <div style={{ flexGrow: 1, maxWidth: '440px' }}>
                    {filteredRequests[currentPendingIndex] && (
                      <PendingCard
                        key={filteredRequests[currentPendingIndex].id}
                        item={filteredRequests[currentPendingIndex]}
                        voiceNotes={voiceNotes}
                        currentUserRole={currentUserRole}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onForward={handleForward}
                        activeTab={activeTab}
                        onReceive={handleReceive}
                        inventoryItems={inventoryItems}
                        rejectingId={rejectingId}
                      />
                    )}
                  </div>

                  {/* Right Chevron Button */}
                  <button 
                    className="btn-refresh" 
                    disabled={currentPendingIndex === filteredRequests.length - 1} 
                    onClick={() => setCurrentPendingIndex(p => Math.min(filteredRequests.length - 1, p + 1))}
                    style={{ 
                      width: '46px', 
                      height: '46px', 
                      padding: 0, 
                      borderRadius: '50%', 
                      justifyContent: 'center', 
                      flexShrink: 0,
                      opacity: currentPendingIndex === filteredRequests.length - 1 ? 0.3 : 1,
                      cursor: currentPendingIndex === filteredRequests.length - 1 ? 'not-allowed' : 'pointer',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Progress Indicators */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    Demand {currentPendingIndex + 1} of {filteredRequests.length}
                  </span>
                  
                  {/* Slider Progress Bar */}
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {filteredRequests.map((_, i) => (
                      <span 
                        key={i} 
                        onClick={() => setCurrentPendingIndex(i)}
                        style={{
                          display: 'inline-block',
                          width: i === currentPendingIndex ? '20px' : '6px',
                          height: '6px',
                          borderRadius: '9999px',
                          backgroundColor: i === currentPendingIndex ? 'var(--text-primary)' : 'var(--border-medium)',
                          transition: 'all var(--transition-fast)',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* STANDARD GRID FORMAT FOR APPROVED LOGS */
              <div className="demands-grid">
                {filteredRequests.map((item) => (
                  <RequestCard 
                    key={item.id} 
                    item={item} 
                    voiceNotes={voiceNotes} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Custom Demand Modal */}

      {/* MODALS */}
