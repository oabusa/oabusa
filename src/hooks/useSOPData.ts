
import { useState, useEffect } from "react";

export interface SOP {
  id: string;
  title: string;
  roles: string[];
  status: string;
  createdAt: string;
  lastModified?: string;
  publishedAt?: string;
}

export const useSOPData = () => {
  const [sops, setSOPs] = useState<SOP[]>([]);

  useEffect(() => {
    // Load SOPs from localStorage
    const allSOPs: SOP[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('sop_')) {
        const sopData = localStorage.getItem(key);
        if (sopData) {
          try {
            const parsedSOP = JSON.parse(sopData);
            // Ensure required properties exist with defaults
            const safeSOP: SOP = {
              id: parsedSOP.id || key.replace('sop_', ''),
              title: parsedSOP.title || 'Untitled SOP',
              roles: parsedSOP.roles || [],
              status: parsedSOP.status || 'draft',
              createdAt: parsedSOP.createdAt || new Date().toISOString(),
              lastModified: parsedSOP.lastModified,
              publishedAt: parsedSOP.publishedAt,
              ...parsedSOP
            };
            allSOPs.push(safeSOP);
          } catch (error) {
            console.error(`Error parsing SOP data for key ${key}:`, error);
          }
        }
      }
    }
    setSOPs(allSOPs);
  }, []);

  const publishSOP = (sopId: string) => {
    const updatedSOPs = sops.map(sop => {
      if (sop.id === sopId) {
        const updatedSOP = { ...sop, status: "published", publishedAt: new Date().toISOString() };
        localStorage.setItem(`sop_${sopId}`, JSON.stringify(updatedSOP));
        return updatedSOP;
      }
      return sop;
    });
    setSOPs(updatedSOPs);
  };

  const deleteSOP = (sopId: string) => {
    localStorage.removeItem(`sop_${sopId}`);
    setSOPs(prev => prev.filter(sop => sop.id !== sopId));
  };

  return {
    sops,
    publishSOP,
    deleteSOP
  };
};
