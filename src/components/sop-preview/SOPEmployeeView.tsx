
import { SOPPreviewEmployeeHeader } from "@/components/sop-preview/SOPPreviewEmployeeHeader";
import { SOPHeader } from "@/components/sop-preview/SOPHeader";
import { SOPStepsList } from "@/components/sop-preview/SOPStepsList";

interface SOPEmployeeViewProps {
  sop: any;
  steps: any[];
  onBack: () => void;
}

export const SOPEmployeeView = ({ sop, steps, onBack }: SOPEmployeeViewProps) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <SOPPreviewEmployeeHeader handleBack={onBack} />
    <div className="max-w-4xl mx-auto px-6 py-8">
      <SOPHeader sop={sop} />
      <SOPStepsList
        steps={steps}
        onEditStep={() => {}}
        onSaveStep={() => {}}
        onCancelEdit={() => {}}
        onDeleteStep={() => {}}
        isEmployeeView={true}
      />
    </div>
  </div>
);
