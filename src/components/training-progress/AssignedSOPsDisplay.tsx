
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AssignedSOPsDisplayProps {
  assignedSOPs: number;
  assignedSOPsList?: any[];
}

export const AssignedSOPsDisplay = ({ assignedSOPs, assignedSOPsList }: AssignedSOPsDisplayProps) => {
  // Always show blue, even if 0 assigned SOPs
  if (assignedSOPs === 0) {
    return (
      <span className="w-7 h-7 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium border border-blue-200 mx-auto">
        0
      </span>
    );
  }

  if (!assignedSOPsList || assignedSOPsList.length === 0) {
    return (
      <span className="w-7 h-7 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium border border-blue-200 mx-auto">
        {assignedSOPs}
      </span>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="w-7 h-7 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium border border-blue-200 cursor-help hover:bg-blue-200 transition-colors mx-auto">
          {assignedSOPs}
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="space-y-1">
          <p className="font-medium">Assigned SOPs:</p>
          {assignedSOPsList.map((sop, index) => (
            <div key={index} className="text-sm px-2 py-1 bg-blue-100 rounded text-blue-800">
              {sop.title || `SOP ${index + 1}`}
            </div>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
