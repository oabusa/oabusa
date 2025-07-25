
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRole: (name: string, description?: string) => void;
}

export const CreateRoleModal = ({
  isOpen,
  onClose,
  onCreateRole,
}: CreateRoleModalProps) => {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (roleName.trim()) {
      onCreateRole(roleName.trim(), description.trim() || undefined);
      setRoleName("");
      setDescription("");
      onClose();
    }
  };

  const handleClose = () => {
    setRoleName("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="border-blue-200">
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create New Role</DialogTitle>
          <DialogDescription className="text-blue-600">
            Add a new job role to your organization
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="role-name" className="text-blue-800">Role Name *</Label>
            <Input
              id="role-name"
              placeholder="e.g., Customer Service Representative"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          <div>
            <Label htmlFor="role-description" className="text-blue-800">Description (Optional)</Label>
            <Textarea
              id="role-description"
              placeholder="Brief description of the role responsibilities..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!roleName.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
