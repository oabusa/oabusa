
import { LoadingView } from "./LoadingView";
import React from "react";

interface SOPRegeneratingProps {
  progress: number;
}

export const SOPRegenerating = ({ progress }: SOPRegeneratingProps) => (
  <LoadingView progress={progress} />
);
