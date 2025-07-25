
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SOPOutputProps {
  showOutput: boolean;
}

export const SOPOutput = ({ showOutput }: SOPOutputProps) => {
  if (!showOutput) return null;

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-green-200 shadow-lg animate-fade-in">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
          <FileText className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-green-800 text-sm md:text-base">SOP Generated Successfully!</h3>
          <p className="text-xs md:text-sm text-green-600">Complete with context and rationale</p>
        </div>
      </div>
      
      <div className="bg-green-50 rounded-lg p-3 md:p-4 border border-green-100">
        <h4 className="font-semibold text-green-800 mb-3 text-sm md:text-base">Standard Operating Procedure: Inventory Management</h4>
        <div className="space-y-2 text-xs md:text-sm text-green-700">
          <div className="flex items-start space-x-2">
            <span className="font-medium flex-shrink-0">1.</span>
            <span className="min-w-0">Check inventory levels using the dashboard system to ensure accurate stock counts...</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium flex-shrink-0">2.</span>
            <span className="min-w-0">Verify quality standards are met by following the established checklist...</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium flex-shrink-0">3.</span>
            <span className="min-w-0">Document all findings in the system to maintain compliance and traceability...</span>
          </div>
        </div>
        
        <div className="mt-3 md:mt-4 pt-3 border-t border-green-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 gap-3">
            <span className="text-xs text-green-600 text-center sm:text-left flex-shrink-0">Generated from narrated screen recording</span>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white cursor-pointer w-full sm:w-auto text-xs md:text-sm px-3 md:px-4">
              Assign to Role
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
