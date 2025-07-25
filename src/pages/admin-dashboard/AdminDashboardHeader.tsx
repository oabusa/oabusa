import { Button } from "@/components/ui/button";
import { LogOut, Settings, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminDashboardHeaderProps {
  companyDisplayName: string;
  adminDisplayName: string;
  onSettings: () => void;
  onLogout: () => void;
}

export const AdminDashboardHeader = ({
  companyDisplayName,
  adminDisplayName,
  onSettings,
  onLogout,
}: AdminDashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-blue-900 font-bold text-3xl tracking-tight">Tasklane</span>
            <div className="ml-6 pl-6 border-l border-blue-200">
              <h1 className="text-2xl font-bold text-blue-900">{companyDisplayName} Dashboard</h1>
              <p className="text-sm text-blue-600">Welcome back, {adminDisplayName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Manage Users Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin-dashboard/users")}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </Button>

            {/* Settings Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onSettings}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>

            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
