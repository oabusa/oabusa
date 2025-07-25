
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrainingProgressRow } from "./TrainingProgressRow";

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

interface TrainingProgressTableProps {
  employees: Employee[];
  onSendReminder: (employeeName: string) => void;
}

export const TrainingProgressTable = ({ employees, onSendReminder }: TrainingProgressTableProps) => {
  return (
    <Card className="border-blue-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-blue-900">Employee Training Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {employees.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-blue-200">
                <TableHead className="text-blue-800 text-center">Name</TableHead>
                <TableHead className="text-blue-800 text-center">Role</TableHead>
                <TableHead className="text-blue-800 text-center">Assigned SOPs</TableHead>
                <TableHead className="text-blue-800 text-center">Completion %</TableHead>
                <TableHead className="text-blue-800 text-center">Last Active</TableHead>
                <TableHead className="text-blue-800 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee, index) => (
                <TrainingProgressRow
                  key={index}
                  employee={employee}
                  onSendReminder={onSendReminder}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-blue-500">
            No employees match the current filters.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
