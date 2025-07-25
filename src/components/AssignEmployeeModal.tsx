
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, UserCheck } from "lucide-react";

interface AssignEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: string;
  onAssignEmployee: (employeeName: string) => void;
  roles: Array<{ name: string; employees: string[] }>;
}

const AssignEmployeeModal = ({ isOpen, onClose, selectedRole, onAssignEmployee, roles }: AssignEmployeeModalProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState("");

  // Get all employees from other roles that are not already in the selected role
  const getAvailableEmployees = () => {
    const currentRoleEmployees = roles.find(role => role.name === selectedRole)?.employees || [];
    const allEmployees: string[] = [];
    
    roles.forEach(role => {
      role.employees.forEach(employee => {
        if (!allEmployees.includes(employee) && !currentRoleEmployees.includes(employee)) {
          allEmployees.push(employee);
        }
      });
    });
    
    return allEmployees;
  };

  const availableEmployees = getAvailableEmployees();

  const handleAssign = () => {
    if (selectedEmployee) {
      onAssignEmployee(selectedEmployee);
      setSelectedEmployee("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="max-w-md w-full mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Assign Employee to {selectedRole}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Employee</label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose an existing employee" />
                </SelectTrigger>
                <SelectContent>
                  {availableEmployees.length > 0 ? (
                    availableEmployees.map((employee) => (
                      <SelectItem key={employee} value={employee}>
                        {employee}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>
                      No available employees
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAssign} disabled={!selectedEmployee}>
                <UserCheck className="w-4 h-4 mr-2" />
                Assign Employee
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignEmployeeModal;
