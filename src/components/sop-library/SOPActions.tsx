
import { Button } from "@/components/ui/button";
import { Eye, Edit, Send, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface SOPActionsProps {
  sop: SOP;
  onPublish: (sopId: string) => void;
  onDelete: (sopId: string) => void;
}

export const SOPActions = ({ sop, onPublish, onDelete }: SOPActionsProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log('SOPActions: Navigating to edit SOP:', sop);
    navigate(`/sop-preview/${sop.id}`, { 
      state: { 
        from: 'library',
        sop: sop // Pass the full SOP data
      } 
    });
  };

  const handlePreview = () => {
    console.log('SOPActions: Navigating to preview SOP:', sop);
    navigate(`/sop-preview/${sop.id}`, {
      state: {
        from: 'library',
        employeeView: true,
        sop: sop // Pass the full SOP data
      }
    });
  };

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={handlePreview}>
        <Eye className="w-4 h-4 mr-1" />
        Preview
      </Button>
      <Button variant="outline" size="sm" onClick={handleEdit}>
        <Edit className="w-4 h-4 mr-1" />
        Edit
      </Button>
      {sop.status === "draft" && (
        <Button size="sm" onClick={() => onPublish(sop.id)}>
          <Send className="w-4 h-4 mr-1" />
          Publish
        </Button>
      )}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onDelete(sop.id)}
        className="text-red-600 hover:text-red-800"
      >
        <Trash2 className="w-4 h-4 mr-1" />
        Delete
      </Button>
    </div>
  );
};
