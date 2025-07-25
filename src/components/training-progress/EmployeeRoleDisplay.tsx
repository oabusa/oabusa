
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface EmployeeRoleDisplayProps {
  roles: string[];
}

export const EmployeeRoleDisplay = ({ roles }: EmployeeRoleDisplayProps) => {
  if (roles.length === 0) {
    return (
      <span className="text-gray-500 text-center block">No roles</span>
    );
  }

  if (roles.length === 1) {
    return (
      <div className="flex justify-center">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200">
          {roles[0]}
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200 cursor-help hover:bg-blue-200 transition-colors">
            {roles.length} roles
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">Assigned roles:</p>
            {roles.map((role, index) => (
              <div key={index} className="text-sm px-2 py-1 bg-blue-100 rounded text-blue-800">
                {role}
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
