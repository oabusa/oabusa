
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface SOPPreviewEmployeeHeaderProps {
  handleBack: () => void;
}

export const SOPPreviewEmployeeHeader: React.FC<SOPPreviewEmployeeHeaderProps> = ({
  handleBack,
}) => (
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
            <h1 className="text-xl font-semibold text-blue-900">Employee Training View</h1>
            <p className="text-sm text-blue-600">Training material for employees</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);
