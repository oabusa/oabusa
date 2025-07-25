
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CompletionPercentageDisplayProps {
  completionPercentage: number;
  assignedSOPsList: any[];
}

export const CompletionPercentageDisplay = ({ completionPercentage, assignedSOPsList }: CompletionPercentageDisplayProps) => {
  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return "🟢";
    if (percentage >= 40) return "🟡";
    return "🔴";
  };

  const getCompletionBgColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-800";
    if (percentage >= 40) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  if (assignedSOPsList.length === 0) {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompletionBgColor(completionPercentage)}`}>
        {getCompletionColor(completionPercentage)} {completionPercentage}%
      </span>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={`px-2 py-1 rounded-full text-xs font-medium cursor-help ${getCompletionBgColor(completionPercentage)}`}>
          {getCompletionColor(completionPercentage)} {completionPercentage}%
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="space-y-2">
          <p className="font-medium">Training Progress Checklist:</p>
          <div className="space-y-1">
            {assignedSOPsList.map((sop, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                  sop.completed 
                    ? 'bg-green-100 border-green-500 text-green-700' 
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  {sop.completed ? '✓' : ''}
                </div>
                <span className={sop.completed ? "text-green-700" : "text-gray-600"}>
                  {sop.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
