
import { useNavigate } from "react-router-dom";

interface SOPTableRowEmployeePreviewProps {
  sopId: string;
  sop: any;
  children: (onClick: () => void) => React.ReactNode;
}

export const SOPTableRowEmployeePreview = ({ sopId, sop, children }: SOPTableRowEmployeePreviewProps) => {
  const navigate = useNavigate();
  const handlePreview = () => {
    navigate(`/sop-preview/${sopId}`, { state: { from: 'library', employeeView: true, sop } });
  };
  return <>{children(handlePreview)}</>;
};
