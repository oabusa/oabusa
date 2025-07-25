
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LoadingViewProps {
  progress: number;
}

export const LoadingView = ({ progress }: LoadingViewProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold text-blue-900">Regenerating SOP...</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card className="border-blue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900">AI is regenerating your SOP...</CardTitle>
            <CardDescription className="text-blue-600">
              Creating new step-by-step instructions based on your original content
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
      </div>
    </div>
  );
};
