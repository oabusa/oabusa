import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { UserPlus, Search, User, Mail } from "lucide-react";

interface Employee {
  name: string;
  email: string;
  roles: string[];
  status: 'invited' | 'active';
}

interface AssignEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (employeeEmails: string[]) => void;
  availableEmployees: Employee[];
  roleName: string;
}

export const AssignEmployeeModal = ({ 
  isOpen, 
  onClose, 
  onAssign, 
  availableEmployees, 
  roleName 
}: AssignEmployeeModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const filteredEmployees = useMemo(() => {
    return availableEmployees.filter(employee => {
      const name = employee.name || employee.email.split('@')[0];
      const email = employee.email;
      const searchLower = searchTerm.toLowerCase();
      
      return name.toLowerCase().includes(searchLower) || 
             email.toLowerCase().includes(searchLower);
    });
  }, [availableEmployees, searchTerm]);

  const handleEmployeeToggle = (employeeEmail: string, checked: boolean) => {
    setSelectedEmployees(prev => {
      if (checked) {
        return prev.includes(employeeEmail) ? prev : [...prev, employeeEmail];
      } else {
        return prev.filter(email => email !== employeeEmail);
      }
    });
  };

  const handleCardClick = (e: React.MouseEvent, employeeEmail: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isSelected = selectedEmployees.includes(employeeEmail);
    handleEmployeeToggle(employeeEmail, !isSelected);
  };

  const handleCheckboxChange = (employeeEmail: string, checked: boolean | string | undefined) => {
    // Safely convert to boolean
    const isChecked = checked === true || checked === "true";
    handleEmployeeToggle(employeeEmail, isChecked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (selectedEmployees.length > 0) {
      onAssign(selectedEmployees);
      handleClose();
    }
  };

  const handleClose = () => {
    setSearchTerm("");
    setSelectedEmployees([]);
    onClose();
  };

  const RoleDisplay = ({ roles }: { roles: string[] }) => {
    if (roles.length === 0) {
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
          No Role
        </span>
      );
    }

    if (roles.length === 1) {
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200">
          {roles[0]}
        </span>
      );
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200 cursor-help hover:bg-blue-200 transition-colors">
              {roles.length} roles
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <div className="space-y-1">
              <p className="font-medium">Current roles:</p>
              {roles.map((role, index) => (
                <div key={index} className="text-sm px-2 py-1 bg-blue-100 rounded text-blue-800">
                  {role}
                </div>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg border-blue-200">
        <DialogHeader>
          <DialogTitle className="text-blue-900 flex items-center">
            <UserPlus className="w-5 h-5 mr-2" />
            Assign Employees to {roleName}
          </DialogTitle>
          <DialogDescription className="text-blue-600">
            Search and select employees to assign to this role. You can select multiple employees.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search" className="text-blue-800">
              Search Employees
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
              <Input
                id="search"
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-blue-800">Available Employees</Label>
            {selectedEmployees.length > 0 && (
              <p className="text-sm text-blue-600">
                {selectedEmployees.length} employee(s) selected
              </p>
            )}
            <div className="max-h-60 overflow-y-auto border border-blue-200 rounded-lg bg-blue-50/20">
              {filteredEmployees.length > 0 ? (
                <div className="space-y-1 p-2">
                  {filteredEmployees.map((employee) => {
                    const displayName = employee.name || employee.email.split('@')[0];
                    const isSelected = selectedEmployees.includes(employee.email);
                    
                    return (
                      <div
                        key={employee.email}
                        className={`p-3 rounded-lg transition-colors border cursor-pointer hover:shadow-sm select-none ${
                          isSelected
                            ? "bg-blue-100 border-blue-300"
                            : "bg-white hover:bg-blue-50 border-blue-100"
                        }`}
                        onClick={(e) => handleCardClick(e, employee.email)}
                      >
                        <div className="flex items-center space-x-3">
                          <div onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => 
                                handleCheckboxChange(employee.email, checked)
                              }
                              aria-label={`Select ${displayName} for assignment`}
                              className="border-blue-800 text-blue-900 data-[state=checked]:bg-blue-800 data-[state=checked]:text-white"
                            />
                          </div>
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-blue-900 truncate">{displayName}</p>
                            <p className="text-sm text-blue-600 flex items-center truncate">
                              <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                              {employee.email}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <RoleDisplay roles={employee.roles} />
                            <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                              employee.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {employee.status === 'active' ? 'Active' : 'Invited'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-blue-500">
                  {availableEmployees.length === 0 
                    ? "No employees available. Invite employees from the Employee Overview tab."
                    : "No employees found matching your search."
                  }
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={selectedEmployees.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Assign {selectedEmployees.length > 0 ? `${selectedEmployees.length} ` : ''}Employee{selectedEmployees.length !== 1 ? 's' : ''} to Role
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
