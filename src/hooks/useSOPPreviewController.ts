
import { useState, useCallback } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSessionData } from "@/hooks/useSessionData";
import { useToast } from "@/hooks/use-toast";
import { useSOPLoader } from "@/hooks/useSOPLoader";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";

export const useSOPPreviewController = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { sessionData, updateSOP } = useSessionData();
  const { toast } = useToast();
  const { goBack } = useNavigationHistory();

  const cameFromLibrary = location.state?.from === "library";
  const shouldStartInEmployeeView = location.state?.employeeView === true;
  const cameFromRoleEmployees = location.state?.from === "role-employees";
  const cameFromCreateSOP = location.state?.from === "create-sop";
  const selectedRole = location.state?.selectedRole;

  // Custom SOP loader
  const {
    currentSOP,
    steps,
    setSteps,
    isEmployeeView,
    setIsEmployeeView,
    loading,
  } = useSOPLoader(id, sessionData, location.state, shouldStartInEmployeeView);

  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenerationProgress, setRegenerationProgress] = useState(0);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);

  // Enhanced updateSOP that ensures the loader gets the updated data
  const handleUpdateSOP = useCallback((sopId: string, updates: any) => {
    console.log('Controller updating SOP:', sopId, updates);
    updateSOP(sopId, updates);
    // The useSOPLoader hook will automatically pick up the changes from sessionData
  }, [updateSOP]);

  // Helper function to save current steps to session storage
  const saveCurrentStepsToSOP = useCallback(() => {
    if (currentSOP) {
      const updatedSteps = steps.map((step: any) => step.text);
      console.log('Saving current steps to SOP:', updatedSteps);
      handleUpdateSOP(currentSOP.id, {
        steps: updatedSteps,
      });
    }
  }, [currentSOP, steps, handleUpdateSOP]);

  // Step handlers - now properly save to session storage
  const handleEditStep = useCallback((stepId: string) => {
    setSteps((prev: any) =>
      prev.map((step: any) =>
        step.id === stepId ? { ...step, isEditing: true } : step
      )
    );
  }, [setSteps]);

  const handleSaveStep = useCallback((stepId: string, newText: string) => {
    console.log('Saving step:', stepId, newText);
    
    // Update local steps state
    setSteps((prev: any) => {
      const updatedSteps = prev.map((step: any) =>
        step.id === stepId ? { ...step, text: newText, isEditing: false } : step
      );
      
      // Save to session storage immediately
      if (currentSOP) {
        const stepTexts = updatedSteps.map((step: any) => step.text);
        console.log('Saving updated steps to SOP:', stepTexts);
        handleUpdateSOP(currentSOP.id, {
          steps: stepTexts,
        });
      }
      
      return updatedSteps;
    });
    
    toast({ 
      title: "Success", 
      description: "Step updated successfully!" 
    });
  }, [setSteps, currentSOP, handleUpdateSOP, toast]);

  const handleCancelEdit = useCallback((stepId: string) => {
    setSteps((prev: any) =>
      prev.map((step: any) =>
        step.id === stepId ? { ...step, isEditing: false } : step
      )
    );
  }, [setSteps]);

  const handleDeleteStep = useCallback((stepId: string) => {
    if (confirm("Are you sure you want to delete this step?")) {
      setSteps((prev: any) => {
        const filteredSteps = prev.filter((step: any) => step.id !== stepId);
        const reindexedSteps = filteredSteps.map((step: any, index: number) => ({
          ...step,
          id: `step_${index}`,
        }));
        
        // Save to session storage immediately
        if (currentSOP) {
          const stepTexts = reindexedSteps.map((step: any) => step.text);
          console.log('Saving steps after deletion:', stepTexts);
          handleUpdateSOP(currentSOP.id, {
            steps: stepTexts,
          });
        }
        
        return reindexedSteps;
      });
      
      toast({ 
        title: "Success", 
        description: "Step deleted successfully!" 
      });
    }
  }, [setSteps, currentSOP, handleUpdateSOP, toast]);

  // Regenerate
  const handleRegenerate = async () => {
    setShowRegenerateModal(false);
    setIsRegenerating(true);
    setRegenerationProgress(0);

    const stages = [20, 40, 60, 80, 100];
    for (const percent of stages) {
      await new Promise((r) => setTimeout(r, 1500));
      setRegenerationProgress(percent);
    }

    const newSteps = [
      "Launch the main application interface",
      "Navigate to the customer management module",
      "Select 'Create New Customer Profile' option",
      "Input required customer information fields",
      "Validate data accuracy and completeness",
      "Submit and confirm customer profile creation",
      "Verify customer appears in database",
    ];

    if (currentSOP) {
      handleUpdateSOP(currentSOP.id, { steps: newSteps });
      setSteps(newSteps.map((step: string, i: number) => ({
        id: `step_${i}`,
        text: step,
        isEditing: false,
      })));
    }
    setIsRegenerating(false);
  };

  // FIXED: Draft handler with aggressive state synchronization
  const handleSaveDraft = useCallback(() => {
    if (currentSOP) {
      console.log('Saving draft with steps:', steps.map((step: any) => step.text));
      
      const updatedSteps = steps.map((step: any) => step.text);
      
      // Update the SOP in session data
      handleUpdateSOP(currentSOP.id, {
        steps: updatedSteps,
        status: "draft",
      });

      // Force a complete re-sync by rebuilding the steps state
      setTimeout(() => {
        setSteps(updatedSteps.map((step: string, i: number) => ({
          id: `step_${i}`,
          text: step,
          isEditing: false,
        })));
      }, 100);
      
      toast({ title: "Success", description: "Draft saved successfully!" });
    }
  }, [currentSOP, steps, handleUpdateSOP, setSteps, toast]);

  const handlePublish = useCallback(() => {
    if (currentSOP) {
      handleUpdateSOP(currentSOP.id, {
        steps: steps.map((step: any) => step.text),
        status: "published",
      });
      toast({ title: "Success", description: "SOP published successfully!" });
      setTimeout(() => navigate("/sop-library"), 100);
    }
  }, [currentSOP, steps, handleUpdateSOP, toast, navigate]);

  // Employee view toggling
  const toggleEmployeeView = useCallback(() => {
    setIsEmployeeView(!isEmployeeView);
  }, [isEmployeeView, setIsEmployeeView]);

  // Navigation
  const handleBack = useCallback(() => {
    // Save draft before going back
    if (currentSOP) {
      handleUpdateSOP(currentSOP.id, {
        steps: steps.map((step: any) => step.text),
        status: currentSOP.status === "published" ? "published" : "draft",
      });
    }

    // If opened from SOP Library, always return directly to SOP Library.
    if (cameFromLibrary) {
      navigate("/sop-library");
    } else {
      goBack();
    }
  }, [currentSOP, steps, handleUpdateSOP, cameFromLibrary, navigate, goBack]);

  const handleEmployeePreviewBack = useCallback(() => {
    if (cameFromLibrary || shouldStartInEmployeeView) {
      navigate("/sop-library");
    } else {
      setIsEmployeeView(false);
    }
  }, [cameFromLibrary, shouldStartInEmployeeView, navigate, setIsEmployeeView]);

  return {
    currentSOP,
    steps,
    setSteps,
    isEmployeeView,
    setIsEmployeeView,
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
    updateSOP: handleUpdateSOP,
    loading,
  };
};
