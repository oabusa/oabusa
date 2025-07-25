
import { useCallback } from 'react';
import { Role, SessionData } from '@/types/sessionData';

export const useRoleOperations = (
  sessionData: SessionData,
  updateSessionData: (updater: (prev: SessionData) => SessionData) => void
) => {
  const addRole = useCallback((role: Role) => {
    updateSessionData(prev => ({
      ...prev,
      roles: [...prev.roles, role]
    }));
  }, [updateSessionData]);

  const updateRole = useCallback((roleName: string, updates: Partial<Role>) => {
    updateSessionData(prev => ({
      ...prev,
      roles: prev.roles.map(role => 
        role.name === roleName ? { ...role, ...updates } : role
      )
    }));
  }, [updateSessionData]);

  const deleteRole = useCallback((roleName: string) => {
    updateSessionData(prev => ({
      ...prev,
      roles: prev.roles.filter(role => role.name !== roleName),
      sops: prev.sops.map(sop => ({
        ...sop,
        roles: sop.roles.filter(role => role !== roleName)
      })),
      employees: prev.employees.map(emp => ({
        ...emp,
        roles: emp.roles.filter(role => role !== roleName)
      }))
    }));
  }, [updateSessionData]);

  return {
    addRole,
    updateRole,
    deleteRole
  };
};
