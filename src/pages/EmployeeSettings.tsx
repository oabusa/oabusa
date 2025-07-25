
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EmployeeProfileForm } from "@/components/employee-settings/EmployeeProfileForm";
import { EmployeePasswordForm } from "@/components/employee-settings/EmployeePasswordForm";
import { useEmployeeSettings } from "@/hooks/useEmployeeSettings";

const EmployeeSettings = () => {
  const navigate = useNavigate();

  // Custom hook for all settings logic and state
  const {
    profile,
    setFirstName,
    setLastName,
    setEmail,
    isDirty,
    handleSaveSettings,
    password,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    handleUpdatePassword,
  } = useEmployeeSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/employee-dashboard")} className="text-blue-700 hover:bg-blue-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-semibold text-blue-900">Employee Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Alert variant="default" className="mb-6 border-blue-200 bg-blue-50">
          <Info className="h-5 w-5 text-blue-600" />
          <AlertTitle className="text-sm font-medium text-blue-800">Session only</AlertTitle>
          <AlertDescription className="text-blue-700">
            These settings are saved for this browser session only and will reset when you clear site data or log out.
          </AlertDescription>
        </Alert>
        <Card className="border-blue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              Personal Settings
            </CardTitle>
            <CardDescription className="text-blue-600">
              Manage your personal information and preferences for this session.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            {/* Personal Information Section */}
            <EmployeeProfileForm
              firstName={profile.firstName}
              lastName={profile.lastName}
              email={profile.email}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setEmail={setEmail}
            />

            {/* Password Section */}
            <EmployeePasswordForm
              currentPassword={password.currentPassword}
              newPassword={password.newPassword}
              confirmPassword={password.confirmPassword}
              setCurrentPassword={setCurrentPassword}
              setNewPassword={setNewPassword}
              setConfirmPassword={setConfirmPassword}
              handleUpdatePassword={handleUpdatePassword}
            />

            {/* Save Button */}
            <div className="pt-6 border-t border-blue-200 flex justify-start">
              <Button
                variant="default"
                onClick={handleSaveSettings}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!isDirty}
              >
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeSettings;
