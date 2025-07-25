
import { useState, useEffect } from "react";

export const useStepCompletion = (sopId: string | undefined, totalSteps: number) => {
  const key = `sop_completion_${sopId}_steps`;
  const [completed, setCompleted] = useState<boolean[]>(() =>
    Array(totalSteps).fill(false)
  );

  // Load stored state
  useEffect(() => {
    if (!sopId) return;
    const value = localStorage.getItem(key);
    if (value) setCompleted(JSON.parse(value));
    else setCompleted(Array(totalSteps).fill(false));
    // Reset if step count changed (SOP updated)
    if (value && JSON.parse(value).length !== totalSteps) {
      setCompleted(Array(totalSteps).fill(false));
    }
    // eslint-disable-next-line
  }, [sopId, totalSteps]);

  // Save to localStorage
  useEffect(() => {
    if (!sopId) return;
    localStorage.setItem(key, JSON.stringify(completed));
    // eslint-disable-next-line
  }, [completed, sopId, key]);

  const toggleStep = (idx: number) => {
    setCompleted(arr => {
      const updated = [...arr];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  const allChecked = completed.every(Boolean);

  const resetSteps = () => setCompleted(Array(totalSteps).fill(false));

  return { completed, toggleStep, allChecked, resetSteps };
};
