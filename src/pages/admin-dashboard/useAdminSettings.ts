
import { useState, useEffect } from "react";

const SETTINGS_KEY = "tasklane_admin_settings_v1";
const CHANGES_COUNT_KEY = "tasklane_admin_changes_count";
const defaultAdminSettings = { companyName: "", firstName: "", lastName: "" };

export const useAdminSettings = () => {
  const [adminSettings, setAdminSettings] = useState(defaultAdminSettings);
  const [changesCount, setChangesCount] = useState(0);

  // Load from settings storage
  const loadSettings = () => {
    try {
      const raw = sessionStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const settings = JSON.parse(raw);
        setAdminSettings({
          companyName: settings.companyName || "",
          firstName: settings.firstName || "",
          lastName: settings.lastName || "",
        });
        return;
      }
    } catch {}
    setAdminSettings(defaultAdminSettings);
  };

  // Load and track changes count
  const loadChangesCount = () => {
    try {
      const count = sessionStorage.getItem(CHANGES_COUNT_KEY);
      if (count) {
        setChangesCount(parseInt(count, 10));
      }
    } catch {}
  };

  // Update changes count
  const updateChangesCount = (newCount: number) => {
    setChangesCount(newCount);
    sessionStorage.setItem(CHANGES_COUNT_KEY, newCount.toString());
  };

  // Load on mount and when page is shown (handles navigation back)
  useEffect(() => {
    loadSettings();
    loadChangesCount();

    // When storage changes (multi-tabs)
    const storageHandler = (e: StorageEvent) => {
      if (e.key === SETTINGS_KEY) {
        loadSettings();
      }
      if (e.key === CHANGES_COUNT_KEY) {
        loadChangesCount();
      }
    };
    window.addEventListener("storage", storageHandler);

    // When the user comes back to this tab or page
    const focusHandler = () => {
      loadSettings();
      loadChangesCount();
    };
    window.addEventListener('focus', focusHandler);

    return () => {
      window.removeEventListener("storage", storageHandler);
      window.removeEventListener('focus', focusHandler);
    };
  }, []);

  return {
    adminSettings,
    changesCount,
    updateChangesCount
  };
};
