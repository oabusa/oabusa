
import { useEffect, useState } from "react";

export interface SOPStep {
  id: string;
  text: string;
  isEditing: boolean;
}

export const useSOPLoader = (
  id: string | undefined,
  sessionData: any,
  locationState: any,
  shouldStartInEmployeeView: boolean
) => {
  const [currentSOP, setCurrentSOP] = useState<any>(null);
  const [steps, setSteps] = useState<SOPStep[]>([]);
  const [isEmployeeView, setIsEmployeeView] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let foundSOP = undefined;

    // Use SOP from location.state.sop if present
    if (locationState?.sop) {
      foundSOP = locationState.sop;
      console.log('SOPPreview: Using SOP from location.state (even if roles/steps are empty)');
    }

    // Otherwise, look in sessionData.sops
    if (!foundSOP) {
      foundSOP = sessionData.sops.find((s: any) => s.id === id);
      if (foundSOP) console.log('SOPPreview: Found SOP in sessionData.sops');
    }

    // Fallback: load fresh from sessionStorage
    if (!foundSOP) {
      try {
        const stored = sessionStorage.getItem('tasklane_session_data');
        if (stored) {
          const data = JSON.parse(stored);
          foundSOP = data.sops?.find((s: any) => s.id === id);
          if (foundSOP) console.log('SOPPreview: Found SOP in sessionStorage');
        }
      } catch (error) {
        console.error('SOPPreview: Error loading from sessionStorage', error);
      }
    }

    if (foundSOP) {
      setCurrentSOP(foundSOP);
      setSteps((foundSOP.steps || []).map((step: string, index: number) => ({
        id: `step_${index}`,
        text: step,
        isEditing: false
      })));
    } else {
      setCurrentSOP(null);
      setSteps([]);
    }

    if (shouldStartInEmployeeView) {
      setIsEmployeeView(true);
    }
    setLoading(false);
  }, [id, sessionData.sops, locationState, shouldStartInEmployeeView]);

  return {
    currentSOP,
    steps,
    setSteps,
    isEmployeeView,
    setIsEmployeeView,
    loading,
  };
};

