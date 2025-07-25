import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessionData } from "@/hooks/useSessionData";
import { VideoUploadSection } from "@/components/create-sop/VideoUploadSection";
import { SOPDetailsForm } from "@/components/create-sop/SOPDetailsForm";
import { GenerationProgress } from "@/components/create-sop/GenerationProgress";

const CreateSOP = () => {
  const navigate = useNavigate();
  const { sessionData, addSOP } = useSessionData();
  const [sopTitle, setSOPTitle] = useState("");
  const [sopDescription, setSOPDescription] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [videoUploaded, setVideoUploaded] = useState(false);

  const handleGenerate = async () => {
    if (!sopTitle || !sopDescription || !videoUploaded) {
      alert("Please fill in title, description, and upload a video file");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    const stages = [
      { progress: 20 }, { progress: 40 }, { progress: 60 }, { progress: 80 }, { progress: 100 }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGenerationProgress(stage.progress);
    }

    const sopId = `sop_${Date.now()}`;
    const newSOP = {
      id: sopId,
      title: sopTitle,
      description: sopDescription,
      roles: selectedRoles,
      status: "draft" as const,
      steps: [
        "Open the application dashboard",
        "Navigate to the customer section",
        "Click on 'Add New Customer' button",
        "Fill in customer details form",
        "Verify information accuracy",
        "Save and confirm customer creation"
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addSOP(newSOP);

    setTimeout(() => {
      const freshSession = JSON.parse(sessionStorage.getItem("tasklane_session_data") || "{}");
      const exists = freshSession.sops?.some((s: any) => s.id === sopId);
      if (exists) {
        navigate(`/sop-preview/${sopId}`, { state: { from: 'create-sop', sop: newSOP } });
      } else {
        alert("SOP failed to save. Please try again.");
      }
    }, 200);
  };

  const handleRoleToggle = (role: string, checked: boolean) => {
    setSelectedRoles(prev => checked ? [...prev, role] : prev.filter(r => r !== role));
  };

  const handleSelectAll = () => {
    setSelectedRoles(prev => prev.length === sessionData.roles.length ? [] : sessionData.roles.map(role => role.name));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin-dashboard")} className="text-blue-700 hover:bg-blue-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-semibold text-blue-900">Create New SOP</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {!isGenerating ? (
          <div className="space-y-6">
            <VideoUploadSection 
              videoUploaded={videoUploaded}
              onVideoUpload={() => setVideoUploaded(true)}
            />

            <SOPDetailsForm
              sopTitle={sopTitle}
              setSopTitle={setSOPTitle}
              sopDescription={sopDescription}
              setSopDescription={setSOPDescription}
              selectedRoles={selectedRoles}
              onRoleToggle={handleRoleToggle}
              roles={sessionData.roles}
              isOptional={true}
              onSelectAll={handleSelectAll}
              allRolesSelected={selectedRoles.length === sessionData.roles.length}
            />

            <Card className="border-blue-200 shadow-sm">
              <CardContent className="pt-6">
                <Button 
                  onClick={handleGenerate}
                  disabled={!sopTitle || !sopDescription || !videoUploaded}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  Generate SOP
                </Button>
                {(!sopTitle || !sopDescription || !videoUploaded) && (
                  <p className="text-sm text-blue-600 text-center mt-2">
                    {!videoUploaded ? "Please upload a video file to continue" : "Please fill in all required fields"}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <GenerationProgress progress={generationProgress} />
        )}
      </div>
    </div>
  );
};

export default CreateSOP;