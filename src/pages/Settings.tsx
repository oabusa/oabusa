import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Info } from "lucide-react"; // Removed Settings as SettingsIcon
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AdminSettingsHeader } from "@/components/settings/AdminSettingsHeader";
import { SessionOnlyAlert } from "@/components/settings/SessionOnlyAlert";
import { AdminPersonalInfoSection } from "@/components/settings/AdminPersonalInfoSection";
import { AdminCompanyInfoSection } from "@/components/settings/AdminCompanyInfoSection";
import { AdminPasswordSection } from "@/components/settings/AdminPasswordSection";

const SETTINGS_KEY = "tasklane_admin_settings_v1";

const defaultSettings = {
  companyName: "",
  firstName: "",
  lastName: "",
  email: "",
  emailNotifications: true,
  trainingReminders: true,
};

const getSavedSettings = (): typeof defaultSettings => {
  try {
    const raw = sessionStorage.getItem(SETTINGS_KEY);
    if (raw) {
      return { ...defaultSettings, ...JSON.parse(raw) };
    }
  } catch {}
  return defaultSettings;
};

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load from saved or default
  const [settings, setSettings] = useState(getSavedSettings());
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Track original to detect "dirty"
  const [original, setOriginal] = useState(settings);

  // Sync settings changes to form fields
  useEffect(() => {
    setOriginal(settings);
  }, []);

  // Utility to check if form is dirty
  const isDirty = JSON.stringify(settings) !== JSON.stringify(original);

  const handleSaveSettings = () => {
    sessionStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setOriginal(settings);
    toast({
      title: "Success",
      description: "Settings updated for this session!",
    });
  };

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match!",
        variant: "destructive",
      });
      return;
    }
    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long!",
        variant: "destructive",
      });
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast({
      title: "Success",
      description: "Password updated for this session!",
    });
  };

  // When tab loads, restore saved settings
  useEffect(() => {
    setSettings(getSavedSettings());
    setOriginal(getSavedSettings());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <AdminSettingsHeader />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <SessionOnlyAlert />
        <Card className="border-blue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              Admin Settings
            </CardTitle>
            <CardDescription className="text-blue-600">
              Manage your personal information, company details, and preferences for this session.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            <AdminPersonalInfoSection
              firstName={settings.firstName}
              lastName={settings.lastName}
              email={settings.email}
              onChange={fields =>
                setSettings(s => ({ ...s, ...fields }))
              }
            />
            <AdminCompanyInfoSection
              companyName={settings.companyName}
              onChange={val =>
                setSettings(s => ({ ...s, companyName: val }))
              }
            />
            <AdminPasswordSection
              currentPassword={currentPassword}
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              onCurrentPasswordChange={setCurrentPassword}
              onNewPasswordChange={setNewPassword}
              onConfirmPasswordChange={setConfirmPassword}
              onUpdatePassword={handleUpdatePassword}
              disabled={!currentPassword || !newPassword || !confirmPassword}
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

export default Settings;
