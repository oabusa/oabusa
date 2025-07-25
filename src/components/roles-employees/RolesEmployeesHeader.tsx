
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RolesEmployeesHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin-dashboard")} className="text-blue-700 hover:bg-blue-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-xl font-semibold text-blue-900">Roles & Employees</h1>
        </div>
      </div>
    </header>
  );
};
