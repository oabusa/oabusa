
import { Button } from "@/components/ui/button";
import React from "react";

interface SOPNotFoundProps {
  sopId?: string;
  onReturn: () => void;
}

export const SOPNotFound = ({ sopId, onReturn }: SOPNotFoundProps) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        SOP not found
      </h1>
      <p className="text-blue-600 mb-4">
        The SOP with ID "{sopId}" could not be found.
      </p>
      <Button
        onClick={onReturn}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Return to Dashboard
      </Button>
    </div>
  </div>
);
