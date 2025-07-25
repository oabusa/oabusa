import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useSessionData } from "@/hooks/useSessionData";
import { SOPFilters } from "@/components/sop-library/SOPFilters";
import { SOPTable } from "@/components/sop-library/SOPTable";
import { DeleteConfirmModal } from "@/components/sop-library/DeleteConfirmModal";
import { useToast } from "@/hooks/use-toast";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";

const SOPLibrary = () => {
  const { goBack } = useNavigationHistory();
  const { sessionData, deleteSOP, updateSOP } = useSessionData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  console.log("Current SOP's:", sessionData.sops);

  const filteredSOPs = sessionData.sops.filter(sop => {
    const title = sop.title || '';
    const roles = sop.roles || [];
    const status = sop.status || 'draft';
    
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || roles.includes(roleFilter);
    const matchesStatus = statusFilter === "all" || status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUpdateRoles = (sopId: string, updatedRoles: string[]) => {
    console.log('SOPLibrary: Updating roles for SOP:', sopId, 'New roles:', updatedRoles);
    updateSOP(sopId, { roles: updatedRoles });
    toast({
      title: "Success",
      description: "SOP roles updated successfully!",
    });
  };

  const handleDelete = (sopId: string) => {
    deleteSOP(sopId);
    setDeleteConfirm(null);
    toast({
      title: "Success",
      description: "SOP deleted successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={goBack} className="text-blue-700 hover:bg-blue-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-semibold text-blue-900">SOP Library</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <SOPFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            availableRoles={sessionData.roles.map(role => role.name)}
          />
        </div>

        <SOPTable
          sops={filteredSOPs}
          onPublish={() => {}} // Remove publish functionality
          onDelete={setDeleteConfirm}
          onUpdateRoles={handleUpdateRoles}
        />

        <DeleteConfirmModal
          isOpen={!!deleteConfirm}
          onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      </div>
    </div>
  );
};

export default SOPLibrary;
