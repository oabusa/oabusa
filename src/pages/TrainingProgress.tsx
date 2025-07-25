
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessionData } from "@/hooks/useSessionData";
import { SendReminderModal } from "@/components/modals/SendReminderModal";
import { TrainingProgressFilters } from "@/components/training-progress/TrainingProgressFilters";
import { TrainingProgressTable } from "@/components/training-progress/TrainingProgressTable";
import { useToast } from "@/hooks/use-toast";

const TrainingProgress = () => {
  const navigate = useNavigate();
  const { sessionData } = useSessionData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reminderEmployee, setReminderEmployee] = useState<string | null>(null);

  // Generate unique employee progress from session data
  const generateEmployeeProgress = () => {
    const employeeMap = new Map();

    // Helper: build SOP list for an employee in the right order based on sopOrder per role
    function getOrderedRoleSOPs(role, allSOPs) {
      const sopsForRole = allSOPs.filter(sop => sop.roles.includes(role.name));
      if (role.sopOrder && role.sopOrder.length > 0) {
        // ordered first, then unlisted
        const sopMap = new Map(sopsForRole.map(sop => [sop.id, sop]));
        const ordered = role.sopOrder.map(id => sopMap.get(id)).filter(Boolean);
        const extras = sopsForRole.filter(sop => !role.sopOrder.includes(sop.id));
        return [...ordered, ...extras];
      }
      return sopsForRole;
    }

    // First, collect all employees and their SOPs & roles in the desired order
    sessionData.roles.forEach(role => {
      role.employees.forEach(employeeEmail => {
        const employee = sessionData.employees.find(emp => emp.email === employeeEmail);
        if (!employeeMap.has(employeeEmail)) {
          employeeMap.set(employeeEmail, {
            name: employee?.name || employeeEmail.split('@')[0],
            email: employeeEmail,
            roles: [],
            assignedSOPsList: []
          });
        }
        const empData = employeeMap.get(employeeEmail);

        if (!empData.roles.includes(role.name)) {
          empData.roles.push(role.name);
        }
        // Add SOPs for this role in their correct order (no dups across roles)
        const roleOrderedSOPs = getOrderedRoleSOPs(role, sessionData.sops);
        roleOrderedSOPs.forEach(sop => {
          if (!empData.assignedSOPsList.some(existing => existing.id === sop.id)) {
            empData.assignedSOPsList.push({
              id: sop.id,
              title: sop.title,
              completed: Math.random() > 0.5 // Mock completion
            });
          }
        });
      });
    });

    // Convert map to array and calculate completion stats
    const employeeProgress = Array.from(employeeMap.values()).map(employee => {
      const assignedSOPs = employee.assignedSOPsList.length;
      const completedSOPs = employee.assignedSOPsList.filter(sop => sop.completed).length;
      const completionPercentage = assignedSOPs > 0 ? Math.round((completedSOPs / assignedSOPs) * 100) : 0;

      // Mock last active date
      const recentDates = Array.from({ length: Math.min(3, 10) }, (_, i) => 
        new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      ).sort((a, b) => b.getTime() - a.getTime()).slice(0, 3);

      const lastActive = recentDates[0];

      return {
        ...employee,
        assignedSOPs,
        completedSOPs,
        completionPercentage,
        lastActive: lastActive.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        }),
        status: assignedSOPs > 0 ? 
          (completionPercentage === 100 ? "Completed" : 
           completionPercentage > 0 ? "In Progress" : "Not Started") : "No SOPs"
      };
    });

    return employeeProgress;
  };

  const employeeProgress = generateEmployeeProgress();

  const filteredEmployees = employeeProgress.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || employee.roles.includes(roleFilter);
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSendReminder = (employeeName: string) => {
    toast({
      title: "Success",
      description: `Reminder sent to ${employeeName}!`,
    });
    setReminderEmployee(null);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin-dashboard")} className="text-blue-700 hover:bg-blue-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-semibold text-blue-900">Training Progress</h1>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <TrainingProgressFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            availableRoles={sessionData.roles}
          />

          <TrainingProgressTable
            employees={filteredEmployees}
            onSendReminder={setReminderEmployee}
          />

          <SendReminderModal
            isOpen={!!reminderEmployee}
            onClose={() => setReminderEmployee(null)}
            onConfirm={() => reminderEmployee && handleSendReminder(reminderEmployee)}
            employeeName={reminderEmployee || ""}
          />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TrainingProgress;
