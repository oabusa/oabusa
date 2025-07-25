
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { GripVertical, ArrowUp, ArrowDown, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAutoToast } from "@/hooks/useAutoToast";

interface SOP {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published';
}

interface SOPReorderSectionProps {
  sops: SOP[];
  onReorder: (reorderedSops: SOP[]) => void;
  roleName: string;
}

export const SOPReorderSection = ({ sops, onReorder, roleName }: SOPReorderSectionProps) => {
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [orderedSops, setOrderedSops] = useState(sops);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const { showAutoToast } = useAutoToast();
  const navigate = useNavigate();

  useEffect(() => {
    setOrderedSops(sops);
    setIsReorderMode(false);
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
    
    newSops.splice(draggedIndex, 1);
    newSops.splice(index, 0, draggedSop);
    
    setOrderedSops(newSops);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newSops = [...orderedSops];
    [newSops[index - 1], newSops[index]] = [newSops[index], newSops[index - 1]];
    setOrderedSops(newSops);
  };

  const moveDown = (index: number) => {
    if (index === orderedSops.length - 1) return;
    const newSops = [...orderedSops];
    [newSops[index], newSops[index + 1]] = [newSops[index + 1], newSops[index]];
    setOrderedSops(newSops);
  };

  const handleSaveOrder = () => {
    onReorder(orderedSops);
    setIsReorderMode(false);
    showAutoToast({
      title: "SOP Order Updated",
      description: `Training sequence for ${roleName} has been updated successfully.`,
    });
  };

  const handleCancelReorder = () => {
    setOrderedSops([...sops]);
    setIsReorderMode(false);
  };

  const handleSOPPreview = (sopId: string) => {
    navigate(`/sop-preview/${sopId}`, { 
      state: { 
        from: 'roles', 
        employeeView: true,
        returnPath: '/roles-employees',
        returnState: { selectedRole: roleName, activeTab: 'roles' }
      } 
    });
  };

  if (sops.length === 0) {
    return (
      <div className="text-center py-4 text-blue-500">
        No SOPs assigned to this role
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center text-blue-900">
            Training Sequence ({sops.length} SOPs)
          </h3>
          {sops.length > 1 && (
            <div className="flex space-x-2">
              {isReorderMode ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveOrder}
                    className="bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
                  >
                    Save Order
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelReorder}
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsReorderMode(true)}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Reorder SOPs
                </Button>
              )}
            </div>
          )}
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
                  ? "cursor-move hover:bg-blue-50 border-dashed border-blue-300" 
                  : "bg-blue-50 border-blue-100"
              } ${
                draggedIndex === index ? "opacity-50 bg-blue-100 border-blue-400" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                {isReorderMode && (
                  <GripVertical className="w-4 h-4 text-blue-400" />
                )}
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleSOPPreview(sop.id)}
                          className="font-medium text-blue-900 hover:text-blue-700 hover:underline transition-colors text-left"
                        >
                          {sop.title}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <div className="space-y-1">
                          <p className="font-medium">{sop.title}</p>
                          <p className="text-sm text-gray-600">{sop.description}</p>
                          <p className="text-xs text-blue-600">Click to preview as employee</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSOPPreview(sop.id)}
                      className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                    sop.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {sop.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>
                {isReorderMode && sops.length > 1 && (
                  <div className="flex flex-col space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="h-6 w-6 p-0 text-blue-600 disabled:text-gray-300"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveDown(index)}
                      disabled={index === orderedSops.length - 1}
                      className="h-6 w-6 p-0 text-blue-600 disabled:text-gray-300"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};
