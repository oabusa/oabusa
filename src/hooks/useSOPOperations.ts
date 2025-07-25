
import { useCallback } from 'react';
import { SOP, SessionData } from '@/types/sessionData';
import { saveToSessionStorage } from '@/utils/sessionStorage';

export const useSOPOperations = (
  sessionData: SessionData,
  updateSessionData: (updater: (prev: SessionData) => SessionData) => void
) => {
  const addSOP = useCallback((sop: SOP) => {
    console.log('Adding SOP:', sop);
    updateSessionData(prev => {
      const newData = {
        ...prev,
        sops: [...prev.sops, sop]
      };
      console.log('SOP added, new session data:', newData);
      // Force immediate save to session storage
      saveToSessionStorage(newData);
      return newData;
    });
  }, [updateSessionData]);

  const updateSOP = useCallback((sopId: string, updates: Partial<SOP>) => {
    console.log('Updating SOP:', sopId, updates);
    updateSessionData(prev => {
      const newData = {
        ...prev,
        sops: prev.sops.map(sop => 
          sop.id === sopId ? { ...sop, ...updates, updatedAt: new Date().toISOString() } : sop
        )
      };
      console.log('SOP updated, new session data:', newData);
      return newData;
    });
  }, [updateSessionData]);

  const assignSOPToRole = useCallback((sopId: string, roleName: string) => {
    updateSessionData(prev => ({
      ...prev,
      sops: prev.sops.map(sop =>
        sop.id === sopId 
          ? { ...sop, roles: [...sop.roles.filter(r => r !== roleName), roleName], updatedAt: new Date().toISOString() }
          : sop
      )
    }));
  }, [updateSessionData]);

  const removeSOPFromRole = useCallback((sopId: string, roleName: string) => {
    updateSessionData(prev => ({
      ...prev,
      sops: prev.sops.map(sop =>
        sop.id === sopId 
          ? { ...sop, roles: sop.roles.filter(r => r !== roleName), updatedAt: new Date().toISOString() }
          : sop
      )
    }));
  }, [updateSessionData]);

  const deleteSOP = useCallback((sopId: string) => {
    updateSessionData(prev => ({
      ...prev,
      sops: prev.sops.filter(sop => sop.id !== sopId)
    }));
  }, [updateSessionData]);

  return {
    addSOP,
    updateSOP,
    assignSOPToRole,
    removeSOPFromRole,
    deleteSOP
  };
};
