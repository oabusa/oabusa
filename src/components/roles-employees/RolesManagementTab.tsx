
import { RolesSidebar } from "./RolesSidebar";
import { RoleDetailsPanel } from "./RoleDetailsPanel";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export const RolesManagementTab = ({
  sessionData,
  selectedRole,
  setSelectedRole,
  onNewRole,
  onDeleteRole,
  getSOPsForRole,
  onAssignEmployees,
  onRemoveEmployeeFromRole,
  onSOPReorder,
}: {
  sessionData: any;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  onNewRole: () => void;
  onDeleteRole: (role: string) => void;
  getSOPsForRole: (roleName: string) => any[];
  onAssignEmployees: () => void;
  onRemoveEmployeeFromRole: (data: { employeeName: string; employeeEmail: string; roleName: string }) => void;
  onSOPReorder: (sops: any[]) => void;
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Left Panel */}
    <RolesSidebar
      roles={sessionData.roles}
      selectedRole={selectedRole}
      onRoleSelect={setSelectedRole}
      onNewRole={onNewRole}
      onDeleteRole={onDeleteRole}
      getSOPsForRole={getSOPsForRole}
    />

    {/* Right Panel */}
    <div className="lg:col-span-2 space-y-6">
      {selectedRole && sessionData.roles.length > 0 ? (
        <RoleDetailsPanel
          selectedRole={selectedRole}
          selectedRoleData={sessionData.roles.find(r => r.name === selectedRole)}
          employees={sessionData.employees}
          onAssignEmployees={onAssignEmployees}
          onRemoveEmployee={onRemoveEmployeeFromRole}
          getSOPsForRole={getSOPsForRole}
          onReorderSOPs={onSOPReorder}
        />
      ) : (
        <Card className="border-blue-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center py-8 text-blue-500">
              {sessionData.roles.length === 0 
                ? "Create your first role to get started with employee management."
                : "Select a role from the left panel to view details."
              }
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  </div>
)
