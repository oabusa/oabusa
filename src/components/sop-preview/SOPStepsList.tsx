
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { StepEditor } from "./StepEditor";

interface SOPStep {
  id: string;
  text: string;
  isEditing: boolean;
}

interface SOPStepsListProps {
  steps: SOPStep[];
  onEditStep: (stepId: string) => void;
  onSaveStep: (stepId: string, newText: string) => void;
  onCancelEdit: (stepId: string) => void;
  onDeleteStep: (stepId: string) => void;
  isEmployeeView?: boolean;
}

export const SOPStepsList = ({ 
  steps, 
  onEditStep, 
  onSaveStep, 
  onCancelEdit, 
  onDeleteStep,
  isEmployeeView = false 
}: SOPStepsListProps) => {
  return (
    <Card className="border-blue-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-blue-900">
          {isEmployeeView ? "Training Steps" : "Step-by-Step Instructions"}
        </CardTitle>
        <CardDescription className="text-blue-600">
          {isEmployeeView 
            ? "Follow these steps to complete your training"
            : "Review and edit each step. Click the edit icon to modify any step or the delete icon to remove it."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex items-start space-x-4 p-4 border border-blue-200 rounded-lg ${isEmployeeView ? 'bg-blue-50/30' : ''}`}>
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold border border-blue-200">
                {index + 1}
              </div>
              <div className="flex-1">
                {step.isEditing && !isEmployeeView ? (
                  <StepEditor
                    initialText={step.text}
                    onSave={(text) => onSaveStep(step.id, text)}
                    onCancel={() => onCancelEdit(step.id)}
                  />
                ) : (
                  <div className="flex justify-between items-start">
                    <p className="text-blue-700 flex-1 mr-4">{step.text}</p>
                    {!isEmployeeView && (
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditStep(step.id)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteStep(step.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
