
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessionData } from "@/hooks/useSessionData";
import { AdminDashboardHeader } from "./admin-dashboard/AdminDashboardHeader";
import { AdminDashboardContent } from "./admin-dashboard/AdminDashboardContent";
import { useAdminSettings } from "./admin-dashboard/useAdminSettings";
import { useAdminStats } from "./admin-dashboard/useAdminStats";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { sessionData, clearAllData } = useSessionData();
  const { adminSettings, changesCount, updateChangesCount } = useAdminSettings();
  const { stats, quickActions, recentActivity } = useAdminStats(sessionData, changesCount, navigate);

  // Track data changes to update activity and changes count
  useEffect(() => {
    const totalItems = sessionData.sops.length + sessionData.roles.length + sessionData.employees.length;
    if (totalItems > changesCount) {
      updateChangesCount(totalItems);
    }
  }, [sessionData.sops.length, sessionData.roles.length, sessionData.employees.length, changesCount, updateChangesCount]);

  const handleLogout = () => {
    clearAllData();
    // Clear changes count on logout
    sessionStorage.removeItem("tasklane_admin_changes_count");
    navigate("/login");
  };

  // Fix the display name logic
  const companyDisplayName = adminSettings.companyName ? adminSettings.companyName : "Admin";
  const adminDisplayName =
    (adminSettings.firstName || adminSettings.lastName)
      ? `${adminSettings.firstName} ${adminSettings.lastName}`.trim()
      : "Admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <AdminDashboardHeader
        companyDisplayName={companyDisplayName}
        adminDisplayName={adminDisplayName}
        onSettings={() => navigate("/settings")}
        onLogout={handleLogout}
      />
      
      <AdminDashboardContent
        stats={stats}
        quickActions={quickActions}
        recentActivity={recentActivity}
      />
    </div>
  );
};

export default AdminDashboard;
