
import { Button } from "@/components/ui/button";
import { Eye, RotateCcw, Save, Send } from "lucide-react";

interface SOPPreviewActionsProps {
  onRegenerate: () => void;
  onToggleEmployeeView: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export const SOPPreviewActions = ({
  onRegenerate,
  onToggleEmployeeView,
  onSaveDraft,
  onPublish
}: SOPPreviewActionsProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Button variant="outline" size="sm" onClick={onRegenerate} className="border-blue-200 text-blue-700 hover:bg-blue-50">
        <RotateCcw className="w-4 h-4 mr-2" />
        Regenerate
      </Button>
      <Button variant="outline" size="sm" onClick={onToggleEmployeeView} className="border-blue-200 text-blue-700 hover:bg-blue-50">
        <Eye className="w-4 h-4 mr-2" />
        Preview as Employee
      </Button>
      <Button variant="outline" size="sm" onClick={onSaveDraft} className="border-blue-200 text-blue-700 hover:bg-blue-50">
        <Save className="w-4 h-4 mr-2" />
        Save Draft
      </Button>
      <Button size="sm" onClick={onPublish} className="bg-blue-600 hover:bg-blue-700">
        <Send className="w-4 h-4 mr-2" />
        Publish
      </Button>
    </div>
  );
};
