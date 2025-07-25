
import { SessionData } from '@/types/sessionData';

const SESSION_STORAGE_KEY = 'tasklane_session_data';

export const saveToSessionStorage = (data: SessionData) => {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
    console.log('Session data saved:', data);
  } catch (error) {
    console.error('Error saving session data:', error);
  }
};

export const loadFromSessionStorage = (): SessionData => {
  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      console.log('Session data loaded:', data);
      return data;
    }
  } catch (error) {
    console.error('Error loading session data:', error);
  }
  return {
    employees: [],
    sops: [],
    roles: []
  };
};

export const clearSessionStorage = () => {
  try {
    // Clear the specific session storage key
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    
    // Clear all tasklane related items from localStorage
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('tasklane_')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log('All user data cleared from storage');
  } catch (error) {
    console.error('Error clearing session data:', error);
  }
};
