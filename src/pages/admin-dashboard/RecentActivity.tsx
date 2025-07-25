
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export interface ActivityItem {
  action: string;
  time: string;
  type: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  getActivityIcon: (type: string) => string;
}

export function RecentActivity({ activities, getActivityIcon }: RecentActivityProps) {
  return (
    <Card className="border-blue-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl text-blue-900">Recent Activity</CardTitle>
        <CardDescription className="text-blue-600">Latest updates from your session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 hover:border-slate-200 transition-all duration-200 cursor-default group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                  {getActivityIcon(activity.type)}
                </span>
                <span className="text-sm text-blue-700 group-hover:text-blue-800 transition-colors">
                  {activity.action}
                </span>
              </div>
              <span className="text-xs text-blue-500 group-hover:text-blue-600 transition-colors">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
