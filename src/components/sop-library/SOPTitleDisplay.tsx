
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SOP {
  id: string;
  title: string;
  description: string;
  roles: string[];
  status: 'draft' | 'published';
  steps: string[];
  createdAt: string;
  updatedAt?: string;
}

interface SOPTitleDisplayProps {
  sop: SOP;
  onEmployeePreview: (sopId: string) => void;
}

export const SOPTitleDisplay = ({ sop, onEmployeePreview }: SOPTitleDisplayProps) => {
  if (sop.status === 'published') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => onEmployeePreview(sop.id)}
            className="font-medium text-blue-900 hover:text-blue-700 underline text-left transition-colors hover:bg-blue-50 rounded px-1 py-0.5"
          >
            {sop.title}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-xs">
            <p className="font-medium mb-1">{sop.title}</p>
            <p className="text-sm text-gray-600">{sop.description}</p>
            <p className="text-xs text-blue-600 mt-1">Click to view employee preview</p>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="font-medium text-blue-900 cursor-help">
          {sop.title}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <div className="max-w-xs">
          <p className="font-medium mb-1">{sop.title}</p>
          <p className="text-sm text-gray-600">{sop.description}</p>
          <p className="text-xs text-yellow-600 mt-1">Draft - use Actions menu to edit</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
