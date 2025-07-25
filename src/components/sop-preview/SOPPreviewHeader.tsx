
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SOPPreviewActions } from "./SOPPreviewActions";
import React from "react";

interface SOPPreviewHeaderProps {
  handleBack: () => void;
  toggleEmployeeView: () => void;
  handleRegenerate: () => void;
  handleSaveDraft: () => void;
  handlePublish: () => void;
}

export const SOPPreviewHeader: React.FC<SOPPreviewHeaderProps> = ({
  handleBack,
  toggleEmployeeView,
  handleRegenerate,
  handleSaveDraft,
  handlePublish,
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-blue-700 hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-blue-900">SOP Generator Preview</h1>
            </div>
          </div>
          <SOPPreviewActions
            onRegenerate={handleRegenerate}
            onToggleEmployeeView={toggleEmployeeView}
            onSaveDraft={handleSaveDraft}
            onPublish={handlePublish}
          />
        </div>
      </div>
    </header>
  );
};
