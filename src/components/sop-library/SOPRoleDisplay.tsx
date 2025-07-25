
import { Badge } from "@/components/ui/badge";
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

interface SOPRoleDisplayProps {
  sop: SOP;
}

export const SOPRoleDisplay = ({ sop }: SOPRoleDisplayProps) => {
  if (sop.roles.length === 0) {
    return (
      <div className="text-blue-500 text-sm px-3 py-1 bg-blue-50 rounded-full border border-blue-200 text-center">
        No roles assigned
      </div>
    );
  }

  if (sop.roles.length === 1) {
    return (
      <div className="flex justify-center">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
          {sop.roles[0]}
        </Badge>
      </div>
    );
  }

  if (sop.roles.length === 2) {
    return (
      <div className="flex flex-wrap gap-1 justify-center">
        {sop.roles.map((role) => (
          <Badge key={role} variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
            {role}
          </Badge>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-150 transition-colors px-3 py-1">
              {sop.roles.length} roles
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">All assigned roles:</p>
            {sop.roles.map((role) => (
              <div key={role} className="text-sm px-2 py-1 bg-blue-100 rounded text-blue-800">{role}</div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
