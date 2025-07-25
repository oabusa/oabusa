
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface EmployeeNameDisplayProps {
  name: string;
  email: string;
}

export const EmployeeNameDisplay = ({ name, email }: EmployeeNameDisplayProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-help">
          {name}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{email}</p>
      </TooltipContent>
    </Tooltip>
  );
};
