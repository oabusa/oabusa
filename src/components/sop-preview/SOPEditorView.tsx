
import { EditableSOPHeader } from "@/components/sop-preview/EditableSOPHeader";
import { SOPStepsList } from "@/components/sop-preview/SOPStepsList";

interface SOPEditorViewProps {
  sop: any;
  steps: any[];
  onEditStep: (id: string) => void;
  onSaveStep: (id: string, text: string) => void;
  onCancelEdit: (id: string) => void;
  onDeleteStep: (id: string) => void;
  updateSOP: (id: string, payload: any) => void;
}

export const SOPEditorView = ({
  sop,
  steps,
  onEditStep,
  onSaveStep,
  onCancelEdit,
  onDeleteStep,
  updateSOP,
}: SOPEditorViewProps) => (
  <div className="max-w-4xl mx-auto px-6 py-8">
    <EditableSOPHeader sop={sop} onUpdate={updateSOP} />
    <SOPStepsList
      steps={steps}
      onEditStep={onEditStep}
      onSaveStep={onSaveStep}
      onCancelEdit={onCancelEdit}
      onDeleteStep={onDeleteStep}
    />
  </div>
);
