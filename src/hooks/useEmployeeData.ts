
import { useCallback } from 'react';
import { Employee, SessionData } from '@/types/sessionData';

export const useEmployeeOperations = (
  sessionData: SessionData,
  updateSessionData: (updater: (prev: SessionData) => SessionData) => void
) => {
  const addEmployee = useCallback((employee: Employee) => {
    updateSessionData(prev => ({
      ...prev,
      employees: [...prev.employees, employee]
    }));
  }, [updateSessionData]);

  // Updated to accept firstName and lastName for new employees
  const inviteEmployee = useCallback((email: string, firstName?: string, lastName?: string) => {
    const name = firstName && lastName ? `${firstName} ${lastName}` : '';
    const newEmployee: Employee = {
      name,
      email: email,
      roles: [],
      completedSOPs: 0,
      assignedSOPs: 0,
      status: 'invited'
    };

    updateSessionData(prev => ({
      ...prev,
      employees: [...prev.employees, newEmployee]
    }));
  }, [updateSessionData]);

  const assignEmployeeToRole = useCallback((employeeEmail: string, roleName: string) => {
    updateSessionData(prev => ({
      ...prev,
      employees: prev.employees.map(emp => 
        emp.email === employeeEmail 
          ? { 
              ...emp, 
              roles: [...emp.roles, roleName],
              status: 'active' as const,
              name: emp.name || emp.email.split('@')[0]
            }
          : emp
      ),
      roles: prev.roles.map(role => 
        role.name === roleName 
          ? { ...role, employees: [...role.employees, employeeEmail] }
          : role
      )
    }));
  }, [updateSessionData]);

  const removeEmployeeFromRole = useCallback((employeeEmail: string, roleName: string) => {
    updateSessionData(prev => ({
      ...prev,
      employees: prev.employees.map(emp => 
        emp.email === employeeEmail 
          ? { ...emp, roles: emp.roles.filter(role => role !== roleName) }
          : emp
      ),
      roles: prev.roles.map(role => 
        role.name === roleName 
          ? { ...role, employees: role.employees.filter(emp => emp !== employeeEmail) }
          : role
      )
    }));
  }, [updateSessionData]);

  const removeEmployee = useCallback((employeeEmail: string) => {
    updateSessionData(prev => ({
      ...prev,
      employees: prev.employees.filter(emp => emp.email !== employeeEmail),
      roles: prev.roles.map(role => ({
        ...role,
        employees: role.employees.filter(emp => emp !== employeeEmail)
      }))
    }));
  }, [updateSessionData]);

  const addMockEmployees = useCallback(() => {
    const mockEmployees: Employee[] = [
      {
        name: "Sarah Johnson",
        email: "sarah@company.com",
        roles: [],
        completedSOPs: 0,
        assignedSOPs: 0,
        status: 'active'
      },
      {
        name: "Mike Chen", 
        email: "mike@company.com",
        roles: [],
        completedSOPs: 0,
        assignedSOPs: 0,
        status: 'active'
      },
      {
        name: "Lisa Rodriguez",
        email: "lisa@company.com", 
        roles: [],
        completedSOPs: 0,
        assignedSOPs: 0,
        status: 'active'
      }
    ];

    updateSessionData(prev => ({
      ...prev,
      employees: [...prev.employees, ...mockEmployees.filter(mock => 
        !prev.employees.some(emp => emp.email === mock.email)
      )]
    }));
  }, [updateSessionData]);

  return {
    addEmployee,
    inviteEmployee,
    assignEmployeeToRole,
    removeEmployeeFromRole,
    removeEmployee,
    addMockEmployees
  };
};
