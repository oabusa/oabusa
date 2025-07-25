
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export interface QuickActionDef {
  title: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  color: string;
  iconColor: string;
}

interface QuickActionsProps {
  actions: QuickActionDef[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {actions.map((action, index) => (
        <Card
          key={index}
          className="cursor-pointer hover:shadow-md transition-all duration-200 border-blue-200 hover:border-blue-300"
          onClick={action.action}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${action.color} shadow-sm`}>
                <action.icon className={`h-6 w-6 ${action.iconColor}`} />
              </div>
              <div>
                <CardTitle className="text-xl md:text-2xl text-blue-900">{action.title}</CardTitle>
                <CardDescription className="text-blue-600">{action.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
