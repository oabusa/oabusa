
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface GenerationProgressProps {
  progress: number;
}

export const GenerationProgress = ({ progress }: GenerationProgressProps) => {
  return (
    <Card className="border-blue-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-blue-900">Generating SOP...</CardTitle>
        <CardDescription className="text-blue-600">
          AI is processing your video and creating the step-by-step procedure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="w-full [&>div]:bg-blue-600" />
        <div className="text-center">
          <p className="text-sm text-blue-600">{progress}% complete</p>
          <p className="text-xs text-blue-500 mt-2">
            This process typically takes 2-3 minutes
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
