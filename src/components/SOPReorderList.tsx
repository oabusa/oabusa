
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SOP {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface SOPReorderListProps {
  sops: SOP[];
  onReorder: (reorderedSops: SOP[]) => void;
}

const SOPReorderList = ({ sops, onReorder }: SOPReorderListProps) => {
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [orderedSops, setOrderedSops] = useState(sops);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  // Update orderedSops when sops prop changes (when switching roles)
  useEffect(() => {
    setOrderedSops(sops);
    setIsReorderMode(false); // Exit reorder mode when switching roles
  }, [sops]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSops = [...orderedSops];
    const draggedSop = newSops[draggedIndex];
    
    // Remove the dragged item
    newSops.splice(draggedIndex, 1);
    
    // Insert at the new position
    newSops.splice(index, 0, draggedSop);
    
    setOrderedSops(newSops);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const toggleReorderMode = () => {
    if (isReorderMode) {
      // Save the new order
      onReorder(orderedSops);
      toast({
        title: "New SOP sequence saved ✅",
        description: "The training sequence has been updated successfully.",
      });
    } else {
      // Reset to current order when entering reorder mode
      setOrderedSops([...sops]);
    }
    setIsReorderMode(!isReorderMode);
  };

  const cancelReorder = () => {
    setOrderedSops([...sops]);
    setIsReorderMode(false);
  };

  if (sops.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No SOPs assigned to this role
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Training Sequence</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleReorderMode}
            className={isReorderMode ? "bg-green-50 border-green-300 text-green-700" : ""}
          >
            {isReorderMode ? "Save Order" : "Reorder SOPs"}
          </Button>
          {isReorderMode && (
            <Button
              variant="outline"
              size="sm"
              onClick={cancelReorder}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {orderedSops.map((sop, index) => (
          <div
            key={sop.id}
            draggable={isReorderMode}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`p-3 rounded-lg border transition-all ${
              isReorderMode 
                ? "cursor-move hover:bg-gray-50 border-dashed" 
                : "bg-gray-50"
            } ${
              draggedIndex === index ? "opacity-50 bg-blue-50 border-blue-300" : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              {isReorderMode && (
                <GripVertical className="w-4 h-4 text-gray-400" />
              )}
              <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium">{sop.title}</p>
                <p className="text-sm text-gray-600">{sop.description}</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                  sop.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {sop.status === "published" ? "Published" : "Draft"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SOPReorderList;

