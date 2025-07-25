
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Role } from "@/types/sessionData";

interface SOPDetailsFormProps {
  sopTitle: string;
  setSopTitle: (title: string) => void;
  sopDescription: string;
  setSopDescription: (description: string) => void;
  selectedRoles: string[];
  onRoleToggle: (role: string, checked: boolean) => void;
  roles: Role[];
  isOptional?: boolean;
  onSelectAll?: () => void;
  allRolesSelected?: boolean;
}

export const SOPDetailsForm = ({
  sopTitle,
  setSopTitle,
  sopDescription,
  setSopDescription,
  selectedRoles,
  onRoleToggle,
  roles,
  isOptional = false,
  onSelectAll,
  allRolesSelected = false
}: SOPDetailsFormProps) => {
  return (
    <Card className="border-blue-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-blue-900">SOP Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="sop-title" className="text-blue-800">
            SOP Title <span className="text-red-600">*</span>
          </Label>
          <Input
            id="sop-title"
            value={sopTitle}
            onChange={(e) => setSopTitle(e.target.value)}
            placeholder="Enter SOP title"
            className="border-blue-200 focus:border-blue-400"
          />
        </div>
        
        <div>
          <Label htmlFor="sop-description" className="text-blue-800">
            Description <span className="text-red-600">*</span>
          </Label>
          <Textarea
            id="sop-description"
            value={sopDescription}
            onChange={(e) => setSopDescription(e.target.value)}
            placeholder="Describe what this SOP covers"
            className="border-blue-200 focus:border-blue-400"
            rows={3}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-blue-800">
              Assign to Roles {isOptional && "(Optional)"}
            </Label>
            {onSelectAll && roles.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onSelectAll}
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                {allRolesSelected ? "Deselect All" : "Select All"}
              </Button>
            )}
          </div>
          {roles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {roles.map((role) => (
                <div key={role.name} className="flex items-center space-x-2 p-2 border border-blue-100 rounded-lg bg-blue-50/30">
                  <Checkbox
                    id={`role-${role.name}`}
                    checked={selectedRoles.includes(role.name)}
                    onCheckedChange={(checked) => onRoleToggle(role.name, checked as boolean)}
                    className="border-blue-800 text-blue-900 data-[state=checked]:bg-blue-800 data-[state=checked]:text-white"
                  />
                  <Label htmlFor={`role-${role.name}`} className="text-blue-800 cursor-pointer flex-1">
                    {role.name}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-blue-500 text-sm">No roles available. Create roles first to assign SOPs.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
