import React from 'react';
import DashboardLayout from '../../shared/layouts/DashboardLayout';
import DashboardContent from '../../shared/components/DashboardContent';

export default function EditorDashboard(props) {
  return (
    <DashboardLayout {...props}>
      <DashboardContent {...props} />
    </DashboardLayout>
  );
}
