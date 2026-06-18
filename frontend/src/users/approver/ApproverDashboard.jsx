import React from 'react';
import DashboardLayout from '../../shared/layouts/DashboardLayout';
import DashboardContent from '../../shared/components/DashboardContent';

export default function ApproverDashboard(props) {
  return (
    <DashboardLayout {...props}>
      <DashboardContent {...props} />
    </DashboardLayout>
  );
}
