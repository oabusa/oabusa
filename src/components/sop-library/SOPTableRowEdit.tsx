
import { useNavigate } from "react-router-dom";

interface SOPTableRowEditProps {
  sopId: string;
  sop: any;
  children: (onClick: () => void) => React.ReactNode;
}

export const SOPTableRowEdit = ({ sopId, sop, children }: SOPTableRowEditProps) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/sop-preview/${sopId}`, { state: { from: 'library', sop } });
  };
  return <>{children(handleEdit)}</>;
};
