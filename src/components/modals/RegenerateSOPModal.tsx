
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

interface RegenerateSOPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const RegenerateSOPModal = ({
  isOpen,
  onClose,
  onConfirm,
}: RegenerateSOPModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="border-blue-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-blue-900">Regenerate SOP</AlertDialogTitle>
          <AlertDialogDescription className="text-blue-600">
            Are you sure you want to regenerate this SOP? This will replace the current content with a new version based on the uploaded video.
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
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Regenerate SOP
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
