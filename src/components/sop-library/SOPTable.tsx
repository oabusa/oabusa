import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SOPTableRow } from "./SOPTableRow";
import { ManageRolesModalWrapper } from "./ManageRolesModalWrapper";

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

interface SOPTableProps {
  sops: SOP[];
  onPublish: (sopId: string) => void;
  onDelete: (sopId: string) => void;
  onUpdateRoles: (sopId: string, updatedRoles: string[]) => void;
}

export const SOPTable = ({ sops, onPublish, onDelete, onUpdateRoles }: SOPTableProps) => {
  return (
    <TooltipProvider>
      <Card className="border-blue-200 shadow-sm w-full">
        <CardHeader className="text-left">
          <CardTitle className="text-blue-900">SOP Library</CardTitle>
        </CardHeader>
        <CardContent>
          {sops.length > 0 ? (
            <div className="w-full">
              <ManageRolesModalWrapper onRolesUpdated={onUpdateRoles}>
                {handleManageRoles => (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-blue-200">
                        <TableHead className="text-blue-800 text-center">Title</TableHead>
                        <TableHead className="text-blue-800 text-center">Role(s)</TableHead>
                        <TableHead className="text-blue-800 text-center">Status</TableHead>
                        <TableHead className="text-blue-800 text-center">Last Modified</TableHead>
                        <TableHead className="text-blue-800 text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sops.map((sop) => (
                        <SOPTableRow
                          key={sop.id}
                          sop={sop}
                          onPublish={onPublish}
                          onDelete={onDelete}
                          onManageRoles={handleManageRoles}
                        />
                      ))}
                    </TableBody>
                  </Table>
                )}
              </ManageRolesModalWrapper>
            </div>
          ) : (
            <div className="text-center py-8 text-blue-500">
              No SOPs found. Create your first SOP to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
