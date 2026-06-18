import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function DashboardLayout({
  // Sidebar props
  currentUserRole,
  activeTab,
  setActiveTab,
  handleClearFilters,
  pendingRequests,
  apiLimitCount,
  apiLimitMax,
  
  // Topbar props
  searchQuery,
  setSearchQuery,
  setCurrentUserRole,
  viewMode,
  setViewMode,
  setShowCustomDemandModal,
  fetchData,
  refreshing,
  
  // Content
  children
}) {
  return (
    <div className="app-container">
      <Sidebar 
        currentUserRole={currentUserRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleClearFilters={handleClearFilters}
        pendingRequests={pendingRequests}
        apiLimitCount={apiLimitCount}
        apiLimitMax={apiLimitMax}
      />
      <main className="main-workspace">
        <Topbar 
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentUserRole={currentUserRole}
          setCurrentUserRole={setCurrentUserRole}
          setActiveTab={setActiveTab}
          viewMode={viewMode}
          setViewMode={setViewMode}
          setShowCustomDemandModal={setShowCustomDemandModal}
          fetchData={fetchData}
          refreshing={refreshing}
        />
        <div className="workspace-content">
          {children}
        </div>
      </main>
    </div>
  );
}
