
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface StatCardDef {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

interface StatsCardsProps {
  stats: StatCardDef[];
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-col items-center justify-center space-y-3 pb-0">
            <div className={`flex items-center justify-center ${stat.color} rounded-full p-2 mb-1`}>
              <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <CardTitle className="text-base md:text-xl font-semibold text-blue-900 text-center w-full leading-tight">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center pt-0 pb-4">
            <div className="text-blue-700 text-lg md:text-2xl font-semibold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

