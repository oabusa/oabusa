
import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SessionOnlyAlert() {
  return (
    <Alert variant="default" className="mb-6 border-blue-200 bg-blue-50">
      <Info className="h-5 w-5 text-blue-600" />
      <AlertTitle className="text-sm font-medium text-blue-800">Session only</AlertTitle>
      <AlertDescription className="text-blue-700">
        These settings are saved for this browser session only and will reset when you clear site data or log out.
      </AlertDescription>
    </Alert>
  );
}
