
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSessionData } from "@/hooks/useSessionData";
import { useAutoToast } from "@/hooks/useAutoToast";
import { RoleCheckboxList } from "./RoleCheckboxList";

interface ManageRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
  sopId: string;
  sopTitle: string;
  onRolesUpdated: (sopId: string, updatedRoles: string[]) => void;
}

export const ManageRolesModal = ({
  isOpen, onClose, sopId, sopTitle, onRolesUpdated
}: ManageRolesModalProps) => {
  const { sessionData } = useSessionData();
  const { showAutoToast } = useAutoToast();

  // Always get latest SOP from sessionData
  const currentSOP = sessionData.sops.find(s => s.id === sopId);

  // Local state for checkboxes, always reset on open
  const [tempRoles, setTempRoles] = useState<string[]>([]);

  // Reset tempRoles from the latest SOP roles each time the modal opens or the SOP's roles change
  useEffect(() => {
    if (isOpen && currentSOP) {
      setTempRoles(currentSOP.roles ? [...currentSOP.roles] : []);
      if (process.env.NODE_ENV !== "production") {
        console.log('[ManageRolesModal/FIX] Modal open/reset, SOP:', currentSOP, 'roles:', currentSOP.roles);
      }
    }
  }, [isOpen, sopId, currentSOP?.roles]);

  if (process.env.NODE_ENV !== "production") {
    console.log("[ManageRolesModal/FIX] Render: tempRoles", tempRoles);
    console.log("[ManageRolesModal/FIX] roles prop", sessionData.roles.map(r => r.name));
    console.log("[ManageRolesModal/FIX] SOP roles (current)", currentSOP?.roles);
  }

  // Checkbox handler
  const handleRoleToggle = (roleName: string, checked: boolean) => {
    setTempRoles(prev =>
      checked
        ? [...prev, roleName]
        : prev.filter(role => role !== roleName)
    );
  };

  // Disable "Save" if nothing has changed
  const rolesChanged = JSON.stringify(tempRoles.sort()) !== JSON.stringify((currentSOP?.roles ?? []).sort());

  const handleSave = () => {
    if (!currentSOP) return;
    onRolesUpdated(sopId, tempRoles);
    showAutoToast({
      title: "Success",
      description: `Roles updated for "${sopTitle}"`,
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md"
        aria-describedby="manage-roles-description"
      >
        <DialogHeader>
          <DialogTitle className="text-blue-900">
            Manage Roles for SOP: {sopTitle}
          </DialogTitle>
        </DialogHeader>
        <div id="manage-roles-description" className="sr-only">
          Select which roles should be assigned to this SOP. Saving will update the SOP immediately.
        </div>
        <div className="space-y-4">
          <RoleCheckboxList
            roles={sessionData.roles}
            selectedRoles={tempRoles}
            onRoleToggle={handleRoleToggle}
          />
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!rolesChanged} // Save can only be clicked if there was a change
              className={`bg-blue-600 hover:bg-blue-700 ${!rolesChanged ? "opacity-50 pointer-events-none" : ""}`}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
