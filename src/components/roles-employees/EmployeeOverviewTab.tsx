
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Trash2, User, Mail } from "lucide-react";

export const EmployeeOverviewTab = ({
  employees,
  onInvite,
  onRemove,
  onRoleClick,
}: {
  employees: Array<{ name: string; email: string; roles: string[]; status: string; }>;
  onInvite: () => void;
  onRemove: (emp: { name: string; email: string }) => void;
  onRoleClick: (role: string) => void;
}) => (
  <Card className="border-blue-200 shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="flex items-center text-blue-900">
        <Users className="w-5 h-5 mr-2" />
        Employee Overview
      </CardTitle>
      <Button onClick={onInvite} className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-2" />
        Invite New Employee
      </Button>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {employees.map((employee, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-white hover:shadow-sm transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-900">{employee.name}</p>
                <p className="text-sm text-blue-600 flex items-center">
                  <Mail className="w-3 h-3 mr-1" />
                  {employee.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex flex-wrap gap-1">
                {employee.roles.length > 0 ? employee.roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => onRoleClick(role)}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200 hover:bg-blue-200 cursor-pointer transition-colors"
                  >
                    {role}
                  </button>
                )) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    No Role
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  employee.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {employee.status === 'active' ? 'Active' : 'Invited'}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemove({ name: employee.name, email: employee.email })}
                  className="text-red-600 hover:text-red-800 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
        {employees.length === 0 && (
          <div className="text-center py-8 text-blue-500">
            No employees found. Start by inviting employees to the platform.
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
