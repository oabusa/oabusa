
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RemoveEmployeeFromRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string;
  employeeEmail: string;
  roleName: string;
}

export const RemoveEmployeeFromRoleModal = ({
  isOpen,
  onClose,
  onConfirm,
  employeeName,
  employeeEmail,
  roleName,
}: RemoveEmployeeFromRoleModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="border-blue-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-blue-900">Remove Employee from Role</AlertDialogTitle>
          <AlertDialogDescription className="text-blue-600">
            Are you sure you want to remove {employeeName} ({employeeEmail}) from the "{roleName}" role? 
            This will remove their access to SOPs assigned to this role.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onClose}
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Remove from Role
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
