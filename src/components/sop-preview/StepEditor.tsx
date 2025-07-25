
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";

interface StepEditorProps {
  initialText: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

export const StepEditor = ({ initialText, onSave, onCancel }: StepEditorProps) => {
  const [text, setText] = useState(initialText);

  return (
    <div className="space-y-2">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border-blue-200 focus:border-blue-400"
      />
      <div className="flex space-x-2">
        <Button size="sm" onClick={() => onSave(text)} className="bg-blue-600 hover:bg-blue-700">
          <Check className="w-4 h-4 mr-1" />
          Save
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel} className="border-blue-200 text-blue-700 hover:bg-blue-50">
          <X className="w-4 h-4 mr-1" />
          Cancel
        </Button>
      </div>
    </div>
  );
};
