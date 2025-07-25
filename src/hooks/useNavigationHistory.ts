
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigationHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const historyRef = useRef<string[]>([]);

  useEffect(() => {
    // Add current path to history if it's different from the last one
    const currentPath = location.pathname;
    const lastPath = historyRef.current[historyRef.current.length - 1];
    
    if (currentPath !== lastPath) {
      historyRef.current.push(currentPath);
      
      // Keep only the last 10 entries to prevent memory issues
      if (historyRef.current.length > 10) {
        historyRef.current = historyRef.current.slice(-10);
      }
    }
  }, [location.pathname]);

  const goBack = () => {
    // Remove current page from history
    historyRef.current.pop();
    
    // Get previous page
    const previousPath = historyRef.current[historyRef.current.length - 1];
    
    if (previousPath) {
      // Remove the previous page from history to avoid duplicate entries
      historyRef.current.pop();
      navigate(previousPath);
    } else {
      // Fallback based on user type
      const userType = localStorage.getItem("userType");
      const fallbackPath = userType === "employee" ? "/employee-dashboard" : "/admin-dashboard";
      navigate(fallbackPath);
    }
  };

  const goBackToSpecificPage = (targetPath: string, fallbackPath?: string) => {
    // Look for the target path in history
    const targetIndex = historyRef.current.lastIndexOf(targetPath);
    if (targetIndex !== -1) {
      // Remove all entries after the target path
      historyRef.current = historyRef.current.slice(0, targetIndex);
      navigate(targetPath);
    } else {
      // Fallback based on user type if no specific fallback provided
      if (!fallbackPath) {
        const userType = localStorage.getItem("userType");
        fallbackPath = userType === "employee" ? "/employee-dashboard" : "/admin-dashboard";
      }
      navigate(fallbackPath);
    }
  };

  const getPreviousPath = () => {
    const userType = localStorage.getItem("userType");
    const defaultPath = userType === "employee" ? "/employee-dashboard" : "/admin-dashboard";
    return historyRef.current[historyRef.current.length - 2] || defaultPath;
  };

  return {
    goBack,
    goBackToSpecificPage,
    getPreviousPath,
    history: historyRef.current
  };
};
