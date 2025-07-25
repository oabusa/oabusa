
import React from "react";

interface SOPPreviewMainLayoutProps {
  children: React.ReactNode;
}

export const SOPPreviewMainLayout = ({ children }: SOPPreviewMainLayoutProps) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    {children}
  </div>
);
