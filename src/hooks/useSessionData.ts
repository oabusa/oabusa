
import { useState, useCallback, useEffect } from 'react';
import { SessionData } from '@/types/sessionData';
import { saveToSessionStorage, loadFromSessionStorage, clearSessionStorage } from '@/utils/sessionStorage';
import { useEmployeeOperations } from '@/hooks/useEmployeeData';
import { useSOPOperations } from '@/hooks/useSOPOperations';
import { useRoleOperations } from '@/hooks/useRoleOperations';

export const useSessionData = () => {
  // Initialize state from session storage or empty data
  const [sessionData, setSessionData] = useState<SessionData>(() => loadFromSessionStorage());

  // Save to session storage whenever data changes
  useEffect(() => {
    saveToSessionStorage(sessionData);
  }, [sessionData]);

  const updateSessionData = useCallback((updater: (prev: SessionData) => SessionData) => {
    setSessionData(updater);
  }, []);

  const clearAllData = useCallback(() => {
    const emptyData = {
      employees: [],
      sops: [],
      roles: []
    };
    setSessionData(emptyData);
    clearSessionStorage();
  }, []);

  // Get operation hooks
  const employeeOps = useEmployeeOperations(sessionData, updateSessionData);
  const sopOps = useSOPOperations(sessionData, updateSessionData);
  const roleOps = useRoleOperations(sessionData, updateSessionData);

  return {
    sessionData,
    ...employeeOps,
    ...sopOps,
    ...roleOps,
    clearAllData,
    updateSessionData, // Expose this!
  };
};
