
import { ManageRolesModal } from "./ManageRolesModal";
import { useManageRolesModal } from "./hooks/useManageRolesModal";

interface ManageRolesModalWrapperProps {
  onRolesUpdated: (sopId: string, updatedRoles: string[]) => void;
  children: (open: (sopId: string, sopTitle: string) => void) => React.ReactNode;
}

/**
 * Usage: 
 * <ManageRolesModalWrapper onRolesUpdated={...}>
 *   {handleOpen => (
 *     // pass handleOpen(sopId, sopTitle) down to rows/actions
 *   )}
 * </ManageRolesModalWrapper>
 */

export const ManageRolesModalWrapper = ({ onRolesUpdated, children }: ManageRolesModalWrapperProps) => {
  const { isOpen, sopId, sopTitle, open, close } = useManageRolesModal();

  return (
    <>
      {children(open)}
      <ManageRolesModal
        isOpen={isOpen}
        onClose={close}
        sopId={sopId}
        sopTitle={sopTitle}
        onRolesUpdated={onRolesUpdated}
      />
    </>
  );
};
