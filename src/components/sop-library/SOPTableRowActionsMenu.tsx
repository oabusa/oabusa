
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreVertical, Settings, Trash2 } from "lucide-react";

interface SOPTableRowActionsMenuProps {
  sopId: string;
  sopStatus: "draft" | "published";
  sopTitle: string;
  onEdit: () => void;
  onEmployeePreview: () => void;
  onManageRoles: (sopId: string, sopTitle: string) => void;
  onDelete: (sopId: string) => void;
}

export const SOPTableRowActionsMenu = ({
  sopId,
  sopStatus,
  sopTitle,
  onEdit,
  onEmployeePreview,
  onManageRoles,
  onDelete,
}: SOPTableRowActionsMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-blue-100 cursor-pointer"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="bg-white border border-blue-200 shadow-md">
      <DropdownMenuItem
        onClick={onEdit}
        className="hover:bg-blue-50 cursor-pointer"
      >
        <Edit className="mr-2 h-4 w-4" />
        Edit
      </DropdownMenuItem>
      {sopStatus === 'published' && (
        <DropdownMenuItem
          onClick={onEmployeePreview}
          className="hover:bg-blue-50 cursor-pointer"
        >
          <Eye className="mr-2 h-4 w-4" />
          Employee Preview
        </DropdownMenuItem>
      )}
      <DropdownMenuItem
        onClick={() => onManageRoles(sopId, sopTitle)}
        className="hover:bg-blue-50 cursor-pointer"
      >
        <Settings className="mr-2 h-4 w-4" />
        Manage Roles
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => onDelete(sopId)}
        className="hover:bg-red-50 text-red-600 cursor-pointer"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
