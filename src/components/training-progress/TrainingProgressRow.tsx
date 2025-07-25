import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail } from "lucide-react";
import { EmployeeRoleDisplay } from "./EmployeeRoleDisplay";
import { AssignedSOPsDisplay } from "./AssignedSOPsDisplay";
import { CompletionPercentageDisplay } from "./CompletionPercentageDisplay";
import { EmployeeNameDisplay } from "./EmployeeNameDisplay";

interface Employee {
  name: string;
  email: string;
  roles: string[];
  assignedSOPs: number;
  completedSOPs: number;
  completionPercentage: number;
  lastActive: string;
  status: string;
  assignedSOPsList: any[];
}

interface TrainingProgressRowProps {
  employee: Employee;
  onSendReminder: (employeeName: string) => void;
}

export const TrainingProgressRow = ({ employee, onSendReminder }: TrainingProgressRowProps) => {
  return (
    <TableRow className="border-blue-100 hover:bg-blue-50/30">
      <TableCell className="font-medium text-blue-900 text-center">
        <EmployeeNameDisplay name={employee.name} email={employee.email} />
      </TableCell>
      <TableCell className="text-center">
        <EmployeeRoleDisplay roles={employee.roles} />
      </TableCell>
      {/* Add flex and items-center/justify-center for vertical and horizontal centering */}
      <TableCell className="text-center flex items-center justify-center h-full">
        <AssignedSOPsDisplay 
          assignedSOPs={employee.assignedSOPs}
          assignedSOPsList={employee.assignedSOPsList}
        />
      </TableCell>
      <TableCell className="text-center">
        <CompletionPercentageDisplay 
          completionPercentage={employee.completionPercentage}
          assignedSOPsList={employee.assignedSOPsList}
        />
      </TableCell>
      <TableCell className="text-sm text-blue-600 text-center">{employee.lastActive}</TableCell>
      <TableCell className="text-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onSendReminder(employee.name)}
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <Mail className="w-4 h-4 mr-1" />
          Reminder
        </Button>
      </TableCell>
    </TableRow>
  );
};
