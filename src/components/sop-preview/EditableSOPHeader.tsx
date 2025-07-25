import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SOP {
  id: string;
  title: string;
  description: string;
  roles: string[];
  status: 'draft' | 'published';
  steps: string[];
  createdAt: string;
  updatedAt?: string;
}

interface EditableSOPHeaderProps {
  sop: SOP;
  onUpdate: (sopId: string, updates: Partial<SOP>) => void;
}

export const EditableSOPHeader = ({ sop, onUpdate }: EditableSOPHeaderProps) => {
  const { toast } = useToast();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedTitle, setEditedTitle] = useState(sop.title);
  const [editedDescription, setEditedDescription] = useState(sop.description);
  
  // Local state to immediately show changes
  const [displayTitle, setDisplayTitle] = useState(sop.title);
  const [displayDescription, setDisplayDescription] = useState(sop.description);

  // Sync local display state with SOP prop changes
  useEffect(() => {
    setDisplayTitle(sop.title);
    setDisplayDescription(sop.description);
    setEditedTitle(sop.title);
    setEditedDescription(sop.description);
  }, [sop.title, sop.description]);

  const handleSaveTitle = () => {
    if (editedTitle.trim() && onUpdate) {
      onUpdate(sop.id, { title: editedTitle.trim() });
      setDisplayTitle(editedTitle.trim()); // Immediately update display
      setIsEditingTitle(false);
      toast({
        title: "Success",
        description: "Title updated successfully!",
      });
    }
  };

  const handleSaveDescription = () => {
    if (editedDescription.trim() && onUpdate) {
      onUpdate(sop.id, { description: editedDescription.trim() });
      setDisplayDescription(editedDescription.trim()); // Immediately update display
      setIsEditingDescription(false);
      toast({
        title: "Success",
        description: "Description updated successfully!",
      });
    }
  };

  const handleCancelTitleEdit = () => {
    setEditedTitle(displayTitle); // Reset to current display value
    setIsEditingTitle(false);
  };

  const handleCancelDescriptionEdit = () => {
    setEditedDescription(displayDescription); // Reset to current display value
    setIsEditingDescription(false);
  };

  return (
    <div className="mb-6 border-blue-200 shadow-sm bg-white rounded-lg border p-6">
      {/* Editable Title */}
      <div className="mb-4">
        {isEditingTitle ? (
          <div className="flex items-center space-x-2">
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-2xl font-bold text-blue-900 border-blue-300 focus:border-blue-500"
              placeholder="Enter SOP title..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSaveTitle();
                } else if (e.key === 'Escape') {
                  handleCancelTitleEdit();
                }
              }}
              autoFocus
            />
            <Button size="sm" onClick={handleSaveTitle} className="bg-green-600 hover:bg-green-700">
              <Check className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancelTitleEdit}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2 group">
            <h2 className="text-2xl font-bold text-blue-900">{displayTitle}</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditingTitle(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Editable Description */}
      <div className="mb-4">
        {isEditingDescription ? (
          <div className="flex items-start space-x-2">
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="text-blue-600 border-blue-300 focus:border-blue-500 min-h-[80px]"
              placeholder="Enter SOP description..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleSaveDescription();
                } else if (e.key === 'Escape') {
                  handleCancelDescriptionEdit();
                }
              }}
              autoFocus
            />
            <div className="flex flex-col space-y-1">
              <Button size="sm" onClick={handleSaveDescription} className="bg-green-600 hover:bg-green-700">
                <Check className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelDescriptionEdit}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-2 group">
            <p className="text-blue-600">{displayDescription}</p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditingDescription(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Roles Display */}
      <div className="flex flex-wrap gap-2">
        {sop.roles.map((role: string) => (
          <span key={role} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200">
            {role}
          </span>
        ))}
      </div>
    </div>
  );
};
