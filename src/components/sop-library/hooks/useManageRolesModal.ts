
import { useState } from "react";

export interface ManageRolesState {
  sopId: string;
  sopTitle: string;
} 

export const useManageRolesModal = () => {
  const [modalState, setModalState] = useState<ManageRolesState | null>(null);

  const open = (sopId: string, sopTitle: string) => setModalState({ sopId, sopTitle });
  const close = () => setModalState(null);

  return {
    isOpen: !!modalState,
    sopId: modalState?.sopId || "",
    sopTitle: modalState?.sopTitle || "",
    open,
    close,
  };
};
