
import { useMemo } from "react";
import { FileText, Users, BarChart3, Video, BookOpen, UserCheck } from "lucide-react";
import { SessionData } from "@/types/sessionData";
import { StatCardDef } from "./StatsCards";
import { QuickActionDef } from "./QuickActions";
import { ActivityItem } from "./RecentActivity";

export const useAdminStats = (sessionData: SessionData, changesCount: number, navigate: (path: string) => void) => {
  const stats: StatCardDef[] = useMemo(() => {
    // Calculate completion rate
    const totalAssignments = sessionData.employees.reduce((sum, emp) => sum + emp.assignedSOPs, 0);
    const totalCompletions = sessionData.employees.reduce((sum, emp) => sum + emp.completedSOPs, 0);
    const completionRate = totalAssignments > 0 ? Math.round((totalCompletions / totalAssignments) * 100) : 0;

    return [
      { 
        title: "Total SOPs",
        value: sessionData.sops.length.toString(), 
        icon: FileText, 
        color: "bg-blue-600" 
      },
      { 
        title: "Active Employees", 
        value: sessionData.employees.length.toString(), 
        icon: Users, 
        color: "bg-blue-700" 
      },
      { 
        title: "Completion Rate", 
        value: `${completionRate}%`, 
        icon: BarChart3, 
        color: "bg-blue-800" 
      },
    ];
  }, [sessionData]);

  const quickActions: QuickActionDef[] = useMemo(() => [
    { 
      title: "Create SOP", 
      description: "Upload video to generate AI-powered SOPs",
      icon: Video, 
      action: () => navigate("/create-sop"),
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      iconColor: "text-white"
    },
    { 
      title: "SOP Library", 
      description: "Manage and organize your standard operating procedures",
      icon: BookOpen, 
      action: () => navigate("/sop-library"),
      color: "bg-gradient-to-r from-blue-600 to-blue-700",
      iconColor: "text-white"
    },
    { 
      title: "Roles & Employees", 
      description: "Manage team roles and invite new employees",
      icon: UserCheck, 
      action: () => navigate("/roles-employees"),
      color: "bg-gradient-to-r from-blue-500 to-blue-700",
      iconColor: "text-white"
    },
    { 
      title: "Training Progress", 
      description: "Track employee progress and completion rates",
      icon: BarChart3, 
      action: () => navigate("/training-progress"),
      color: "bg-gradient-to-r from-blue-600 to-blue-800",
      iconColor: "text-white"
    },
  ], [navigate]);

  const recentActivity: ActivityItem[] = useMemo(() => {
    const activities = [];
    
    // Add initial messages only if less than 3 changes have been made
    if (changesCount < 3) {
      activities.push(
        { action: "New session started", time: "Just now", type: "start" },
        { action: "Platform ready for use", time: "Just now", type: "ready" }
      );
    }
    
    // Add recent SOPs
    const recentSOPs = sessionData.sops
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 2)
      .map(sop => ({
        action: `SOP "${sop.title}" created`,
        time: "Recently",
        type: "creation"
      }));
    
    // Add recent roles
    const recentRoles = sessionData.roles
      .slice(-2)
      .map(role => ({
        action: `Role "${role.name}" created`,
        time: "Recently", 
        type: "creation"
      }));

    // Add recent employees
    const recentEmployees = sessionData.employees
      .slice(-2)
      .map(employee => ({
        action: `Employee "${employee.name}" invited`,
        time: "Recently",
        type: "invite"
      }));
    
    activities.push(...recentSOPs, ...recentRoles, ...recentEmployees);
    
    // Return only the 3 most recent activities
    return activities.slice(0, 3);
  }, [sessionData, changesCount]);

  return {
    stats,
    quickActions,
    recentActivity
  };
};
