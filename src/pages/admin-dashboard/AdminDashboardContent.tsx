
import { StatsCards, StatCardDef } from "./StatsCards";
import { QuickActions, QuickActionDef } from "./QuickActions";
import { RecentActivity, ActivityItem } from "./RecentActivity";

interface AdminDashboardContentProps {
  stats: StatCardDef[];
  quickActions: QuickActionDef[];
  recentActivity: ActivityItem[];
}

export const AdminDashboardContent = ({
  stats,
  quickActions,
  recentActivity
}: AdminDashboardContentProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completion": return "✅";
      case "creation": return "📄";
      case "start": return "🚀";
      case "invite": return "📧";
      case "ready": return "✨";
      default: return "📝";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <StatsCards stats={stats} />
      <QuickActions actions={quickActions} />
      <RecentActivity activities={recentActivity} getActivityIcon={getActivityIcon} />
    </div>
  );
};
