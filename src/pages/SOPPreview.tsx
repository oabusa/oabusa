
import { RegenerateSOPModal } from "@/components/modals/RegenerateSOPModal";
import { SOPPreviewHeader } from "@/components/sop-preview/SOPPreviewHeader";
import { SOPPreviewEmployeeHeader } from "@/components/sop-preview/SOPPreviewEmployeeHeader";
import { SOPEditorView } from "@/components/sop-preview/SOPEditorView";
import { SOPEmployeeView } from "@/components/sop-preview/SOPEmployeeView";
import { useSOPPreviewController } from "@/hooks/useSOPPreviewController";
import { SOPPreviewMainLayout } from "@/components/sop-preview/SOPPreviewMainLayout";
import { SOPNotFound } from "@/components/sop-preview/SOPNotFound";
import { SOPRegenerating } from "@/components/sop-preview/SOPRegenerating";

// Use loading to prevent flashing SOPNotFound
const SOPPreview = () => {
  const {
    currentSOP,
    steps,
    isEmployeeView,
    isRegenerating,
    regenerationProgress,
    showRegenerateModal,
    setShowRegenerateModal,
    handleEditStep,
    handleSaveStep,
    handleCancelEdit,
    handleDeleteStep,
    handleRegenerate,
    handleSaveDraft,
    handlePublish,
    toggleEmployeeView,
    handleBack,
    handleEmployeePreviewBack,
    id,
    updateSOP,
    loading,
  } = (() => {
    // destructure controller + loading from loader
    const controller = useSOPPreviewController();
    // Pull loading off loader by re-calling loader for just loading, since only controller itself has access
    // We'll require to update useSOPPreviewController to return loading as well
    // But for now, just try to get loading off controller if available.
    return controller;
  })();

  // If loading is true, render nothing (you could show a spinner if wanted)
  if (loading) {
    return null;
  }
  if (!currentSOP) {
    return <SOPNotFound sopId={id} onReturn={handleBack} />;
  }
  if (isRegenerating)
    return <SOPRegenerating progress={regenerationProgress} />;
  if (isEmployeeView)
    return (
      <SOPEmployeeView
        sop={currentSOP}
        steps={steps}
        onBack={handleEmployeePreviewBack}
      />
    );
  // Main editor preview
  return (
    <SOPPreviewMainLayout>
      <SOPPreviewHeader
        handleBack={handleBack}
        toggleEmployeeView={toggleEmployeeView}
        handleRegenerate={() => setShowRegenerateModal(true)}
        handleSaveDraft={handleSaveDraft}
        handlePublish={handlePublish}
      />
      <SOPEditorView
        sop={currentSOP}
        steps={steps}
        onEditStep={handleEditStep}
        onSaveStep={handleSaveStep}
        onCancelEdit={handleCancelEdit}
        onDeleteStep={handleDeleteStep}
        updateSOP={updateSOP}
      />
      <RegenerateSOPModal
        isOpen={showRegenerateModal}
        onClose={() => setShowRegenerateModal(false)}
        onConfirm={handleRegenerate}
      />
    </SOPPreviewMainLayout>
  );
};

export default SOPPreview;
