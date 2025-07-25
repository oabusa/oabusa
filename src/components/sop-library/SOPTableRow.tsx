
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SOPRoleDisplay } from "./SOPRoleDisplay";
import { SOPTitleDisplay } from "./SOPTitleDisplay";
import { SOPTableRowEmployeePreview } from "./SOPTableRowEmployeePreview";
import { SOPTableRowEdit } from "./SOPTableRowEdit";
import { SOPTableRowActionsMenu } from "./SOPTableRowActionsMenu";
import { SOPStatusBadge } from "./SOPStatusBadge";

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

interface SOPTableRowProps {
  sop: SOP;
  onPublish: (sopId: string) => void;
  onDelete: (sopId: string) => void;
  onManageRoles: (sopId: string, sopTitle: string) => void;
}

export const SOPTableRow = ({ sop, onPublish, onDelete, onManageRoles }: SOPTableRowProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <TableRow className="border-blue-100 hover:bg-blue-50/30 transition-colors">
      <TableCell className="text-center">
        <SOPTableRowEmployeePreview sopId={sop.id} sop={sop}>
          {(handleEmployeePreview) => (
            <SOPTitleDisplay sop={sop} onEmployeePreview={handleEmployeePreview} />
          )}
        </SOPTableRowEmployeePreview>
      </TableCell>
      <TableCell className="text-center">
        <div className="hover:bg-blue-50 rounded p-1 transition-colors">
          <SOPRoleDisplay sop={sop} />
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="rounded p-1 inline-block">
          <SOPStatusBadge status={sop.status} />
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="text-blue-600 text-sm hover:bg-blue-50 rounded p-1 transition-colors inline-block">
          {formatDate(sop.updatedAt || sop.createdAt)}
        </div>
      </TableCell>
      <TableCell className="text-center">
        <SOPTableRowEdit sopId={sop.id} sop={sop}>
          {(handleEdit) => (
            <SOPTableRowEmployeePreview sopId={sop.id} sop={sop}>
              {(handleEmployeePreview) => (
                <SOPTableRowActionsMenu
                  sopId={sop.id}
                  sopStatus={sop.status}
                  sopTitle={sop.title}
                  onEdit={handleEdit}
                  onEmployeePreview={handleEmployeePreview}
                  onManageRoles={onManageRoles}
                  onDelete={onDelete}
                />
              )}
            </SOPTableRowEmployeePreview>
          )}
        </SOPTableRowEdit>
      </TableCell>
    </TableRow>
  );
};

