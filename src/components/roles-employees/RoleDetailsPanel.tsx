import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users, FileText, Trash2 } from "lucide-react";
import { SOPReorderSection } from "@/components/roles/SOPReorderSection";

export const RoleDetailsPanel = ({
  selectedRole,
  selectedRoleData,
  employees,
  onAssignEmployees,
  onRemoveEmployee,
  getSOPsForRole,
  onReorderSOPs,
}: {
  selectedRole: string;
  selectedRoleData: { employees: string[]; description?: string } | undefined;
  employees: Array<{ email: string; name?: string }>;
  onAssignEmployees: () => void;
  onRemoveEmployee: (employee: { employeeName: string; employeeEmail: string; roleName: string }) => void;
  getSOPsForRole: (roleName: string) => any[];
  onReorderSOPs: (sops: any[]) => void;
}) => {
  return (
    <Card className="border-blue-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex-1 min-w-0">
          <CardTitle className="text-blue-900">{selectedRole}</CardTitle>
          {selectedRoleData?.description && (
            <div className="text-blue-700 mt-1 text-sm">{selectedRoleData.description}</div>
          )}
        </div>
        <div className="flex space-x-2">
          <Button onClick={onAssignEmployees} className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Assign Employees
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assigned Employees */}
          <div className="flex flex-col h-full">
            <h3 className="font-medium mb-3 flex items-center text-blue-900">
              <Users className="w-4 h-4 mr-2" />
              Assigned Employees ({selectedRoleData?.employees.length ?? 0})
            </h3>
            <div className="space-y-2 flex-1 min-h-[200px] overflow-y-auto">
              {(selectedRoleData?.employees ?? []).map((employeeEmail, idx) => {
                const employee = employees.find(e => e.email === employeeEmail);
                return (
                  <div key={idx} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div>
                      <p className="font-medium text-blue-900">{employee?.name || employeeEmail.split('@')[0]}</p>
                      <p className="text-sm text-blue-600">{employeeEmail}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveEmployee({
                        employeeName: employee?.name || employeeEmail.split('@')[0],
                        employeeEmail,
                        roleName: selectedRole,
                      })}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )
              })}
              {(selectedRoleData?.employees.length ?? 0) === 0 && (
                <div className="text-center py-8 text-blue-500 flex-1 flex items-center justify-center">
                  No employees assigned to this role
                </div>
              )}
            </div>
          </div>
          {/* Assigned SOPs */}
          <div className="flex flex-col h-full">
            <h3 className="font-medium mb-3 flex items-center text-blue-900">
              <FileText className="w-4 h-4 mr-2" />
              Assigned SOPs ({getSOPsForRole(selectedRole).length})
            </h3>
            <div className="flex-1 min-h-[200px] overflow-y-auto">
              <SOPReorderSection
                sops={getSOPsForRole(selectedRole)}
                onReorder={onReorderSOPs}
                roleName={selectedRole}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
