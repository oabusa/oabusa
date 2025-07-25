
import { clearSessionStorage } from './sessionStorage';

export const performLogout = () => {
  // Clear session storage keys
  clearSessionStorage();

  // Explicitly remove admin settings from session storage
  sessionStorage.removeItem('tasklane_admin_settings_v1');

  // Explicitly remove session data
  sessionStorage.removeItem('tasklane_session_data');

  // Remove SOPs from localStorage if any remain from previous session (key: sop_*)
  const sopKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('sop_')) {
      sopKeys.push(key);
    }
  }
  sopKeys.forEach(k => localStorage.removeItem(k));

  // Also clear all tasklane related items
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (
      key &&
      (key.startsWith('sop_completion_') ||
        key.startsWith('tasklane_') ||
        key.startsWith('admin_') ||
        key.startsWith('settings_') ||
        key.includes('company') ||
        key.includes('admin') ||
        key.includes('user'))
    ) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });

  // Also clear any form data or cached user information
  const formKeys = ['companyName', 'adminName', 'adminEmail', 'userSettings'];
  formKeys.forEach(key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });

  // As a last resort, clear all session storage (catches any missed keys)
  sessionStorage.clear();

  console.log('All session, personal info and SOP data cleared on logout');
};
