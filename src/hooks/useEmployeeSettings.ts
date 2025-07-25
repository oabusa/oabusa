
import { useState, useEffect } from "react";
import { useAutoToast } from "@/hooks/useAutoToast";

const EMPLOYEE_SESSION_KEY = "tasklane_employee_profile";

export interface EmployeeProfile {
  firstName: string;
  lastName: string;
  email: string;
}

export interface EmployeePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const useEmployeeSettings = () => {
  const { showAutoToast } = useAutoToast();

  // Profile State
  const [profile, setProfile] = useState<EmployeeProfile>({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [original, setOriginal] = useState<EmployeeProfile>({
    firstName: "",
    lastName: "",
    email: ""
  });

  // Password State
  const [password, setPassword] = useState<EmployeePassword>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Load from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem(EMPLOYEE_SESSION_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
        });
        setOriginal({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
        });
      } catch (e) {
        setOriginal({ firstName: "", lastName: "", email: "" });
      }
    } else {
      setOriginal({ firstName: "", lastName: "", email: "" });
    }
  }, []);

  // "Dirty" check
  const isDirty =
    profile.firstName !== original.firstName ||
    profile.lastName !== original.lastName ||
    profile.email !== original.email;

  // Save handler
  const handleSaveSettings = () => {
    sessionStorage.setItem(EMPLOYEE_SESSION_KEY, JSON.stringify(profile));
    setOriginal(profile); // reset dirty state after save
    showAutoToast({
      title: "Settings updated successfully!",
      description: "Your personal settings have been saved.",
    });
  };

  // Password update handler
  const handleUpdatePassword = () => {
    if (password.newPassword !== password.confirmPassword) {
      showAutoToast({
        title: "Password mismatch",
        description: "New passwords do not match!",
        variant: "destructive",
      });
      return;
    }
    if (password.newPassword.length < 6) {
      showAutoToast({
        title: "Password too short",
        description: "Password must be at least 6 characters long!",
        variant: "destructive",
      });
      return;
    }
    setPassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
    showAutoToast({
      title: "Password updated successfully!",
      description: "Your password has been changed.",
    });
  };

  // Profile field setters
  const setFirstName = (val: string) => setProfile((old) => ({ ...old, firstName: val }));
  const setLastName = (val: string) => setProfile((old) => ({ ...old, lastName: val }));
  const setEmail = (val: string) => setProfile((old) => ({ ...old, email: val }));

  // Password field setters
  const setCurrentPassword = (val: string) => setPassword((old) => ({ ...old, currentPassword: val }));
  const setNewPassword = (val: string) => setPassword((old) => ({ ...old, newPassword: val }));
  const setConfirmPassword = (val: string) => setPassword((old) => ({ ...old, confirmPassword: val }));

  return {
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
  };
};
