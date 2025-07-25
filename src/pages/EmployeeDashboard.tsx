
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Settings, Play, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { performLogout } from "@/utils/logout";

const EMPLOYEE_SESSION_KEY = "tasklane_employee_profile";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [employeeName, setEmployeeName] = useState<string>("Employee");

  // Extract name from session storage, using latest settings
  const loadEmployeeName = () => {
    const stored = sessionStorage.getItem(EMPLOYEE_SESSION_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.firstName || data.lastName) {
          setEmployeeName(
            [data.firstName, data.lastName].filter(Boolean).join(" ") || "Employee"
          );
        } else {
          setEmployeeName("Employee");
        }
      } catch {
        setEmployeeName("Employee");
      }
    } else {
      setEmployeeName("Employee");
    }
  };

  useEffect(() => {
    loadEmployeeName();

    // Listen for storage and focus events to refresh name live
    const storageHandler = (e: StorageEvent) => {
      if (e.key === EMPLOYEE_SESSION_KEY) {
        loadEmployeeName();
      }
    };
    window.addEventListener("storage", storageHandler);

    const focusHandler = () => {
      loadEmployeeName();
    };
    window.addEventListener("focus", focusHandler);

    return () => {
      window.removeEventListener("storage", storageHandler);
      window.removeEventListener("focus", focusHandler);
    };
  }, []);

  const handleLogout = () => {
    performLogout();
    navigate("/login");
  };

  const trainings = [
    {
      roleTitle: "Barista Training",
      sopCount: 4,
      completedSOPs: 3,
      status: "In Progress",
      progress: 75,
      lastActivity: "2 hours ago"
    },
    {
      roleTitle: "Customer Service",
      sopCount: 2,
      completedSOPs: 0,
      status: "Not Started",
      progress: 0,
      lastActivity: "Never"
    },
    {
      roleTitle: "Equipment Maintenance",
      sopCount: 3,
      completedSOPs: 3,
      status: "Completed",
      progress: 100,
      lastActivity: "1 day ago"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "🟩 Completed";
      case "In Progress":
        return "🟨 In Progress";
      default:
        return "🟥 Not Started";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getActionButton = (training: any) => {
    if (training.status === "Completed") {
      return (
        <Button variant="outline" disabled className="border-green-200 text-green-600">
          <CheckCircle className="w-4 h-4 mr-2" />
          Completed
        </Button>
      );
    }
    
    return (
      <Button 
        onClick={() =>
          navigate(`/role-training/${training.roleTitle.toLowerCase().replace(/\s+/g, '-')}`)
        }
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        <Play className="w-4 h-4 mr-2" />
        {training.status === "Not Started" ? "Start" : "Continue"}
      </Button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-blue-900 font-bold text-3xl tracking-tight">Tasklane</span>
              <div className="ml-6 pl-6 border-l border-blue-200">
                <h1 className="text-2xl font-bold text-blue-900">Welcome, {employeeName}</h1>
                <p className="text-sm text-blue-600">Your training dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/employee-settings")}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Training Overview */}
        <Card className="mb-8 border-blue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900 text-xl flex items-center">
              <span className="font-semibold">Training Overview</span>
            </CardTitle>
            <CardDescription className="text-blue-600">
              Track your progress across all assigned training modules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-600">
                  {trainings.reduce((sum, t) => sum + t.sopCount, 0)}
                </h3>
                <p className="text-sm text-blue-700">Total SOP's</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-600">
                  {trainings.reduce((sum, t) => sum + t.completedSOPs, 0)}
                </h3>
                <p className="text-sm text-blue-700">Completed SOP's</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-600">
                  {Math.round(trainings.reduce((sum, t) => sum + t.progress, 0) / trainings.length)}%
                </h3>
                <p className="text-sm text-blue-700">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Trainings */}
        <Card className="border-blue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900 text-xl flex items-center">
              <span className="font-semibold">Assigned Trainings</span>
            </CardTitle>
            <CardDescription className="text-blue-600">
              Complete your role-based training modules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {trainings.map((training, index) => (
                <div
                  key={index}
                  className="border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        {training.roleTitle}
                      </h3>
                      <p className="text-blue-600 mb-2">
                        {training.completedSOPs} of {training.sopCount} SOP's completed
                      </p>
                      <p className="text-sm text-blue-500">
                        Last activity: {training.lastActivity}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(training.status)}`}
                      >
                        {getStatusBadge(training.status)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-blue-800">Progress</span>
                      <span className="text-sm text-blue-600">{training.progress}%</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${training.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-blue-600">
                      {training.status === "In Progress" && (
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Continue where you left off
                        </span>
                      )}
                    </div>
                    {getActionButton(training)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
// EmployeeDashboard.tsx is 261+ lines long. Consider refactoring into smaller components for better maintainability.

