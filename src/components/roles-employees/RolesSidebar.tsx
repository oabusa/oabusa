import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export const RolesSidebar = ({
  roles,
  selectedRole,
  onRoleSelect,
  onNewRole,
  onDeleteRole,
  getSOPsForRole
}: {
  roles: Array<{ name: string, description?: string }>;
  selectedRole: string;
  onRoleSelect: (roleName: string) => void;
  onNewRole: () => void;
  onDeleteRole: (roleName: string) => void;
  getSOPsForRole: (roleName: string) => any[];
}) => (
  <Card className="border-blue-200 shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-blue-900">Job Roles</CardTitle>
      <Button size="sm" onClick={onNewRole} className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-1" />
        New Role
      </Button>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {roles.map((role) => (
          <div
            key={role.name}
            className={`p-3 rounded-lg cursor-pointer transition-colors border ${
              selectedRole === role.name
                ? "bg-blue-100 border-blue-300"
                : "hover:bg-blue-50 border-blue-100"
            }`}
            onClick={() => onRoleSelect(role.name)}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0">
                <span className="block font-medium text-blue-900 truncate">{role.name}</span>
                <div className="text-xs text-blue-600">{getSOPsForRole(role.name).length} SOPs</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteRole(role.name);
                }}
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        {roles.length === 0 && (
          <div className="text-center py-4 text-blue-500">
            No roles created yet. Create your first role to get started.
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
