
import { Upload, FileText, Edit, Play } from "lucide-react";

interface ProcessingStep {
  icon: React.ElementType;
  text: string;
  color: string;
}

interface ProcessingStepsProps {
  steps: ProcessingStep[];
  currentStep: number;
  isProcessing: boolean;
  showOutput: boolean;
}

export const ProcessingSteps = ({ steps, currentStep, isProcessing, showOutput }: ProcessingStepsProps) => {
  return (
    <div className="space-y-3 mb-6">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = isProcessing && index <= currentStep;
        const isCompleted = showOutput || (isProcessing && index < currentStep);
        
        return (
          <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
            isActive ? 'bg-blue-100 scale-105' : isCompleted ? 'bg-green-50' : 'bg-gray-50'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isCompleted 
                ? 'bg-green-500' 
                : isActive 
                  ? 'bg-blue-500 animate-pulse' 
                  : 'bg-gray-300'
            }`}>
              {isCompleted ? (
                <div className="w-4 h-4 text-white">✓</div>
              ) : (
                <StepIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              )}
            </div>
            <span className={`font-medium transition-colors ${
              isCompleted ? 'text-green-700' : isActive ? 'text-blue-700' : 'text-gray-500'
            }`}>
              {step.text}
            </span>
            {isActive && !isCompleted && (
              <div className="flex space-x-1 ml-auto">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-200"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
