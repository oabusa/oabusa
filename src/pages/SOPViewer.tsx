
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useStepCompletion } from "@/hooks/useStepCompletion";
import { Confetti } from "@/components/ui/Confetti";
import { useToast } from "@/hooks/use-toast";

const SOPViewer = () => {
  const navigate = useNavigate();
  const { sopId } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Temporary toast state
  const { toast } = useToast();

  // Mock SOP data (for demonstration)
  const sop = {
    id: sopId,
    title: "Coffee Machine Operation",
    description: "Learn how to properly operate and maintain the coffee machine",
    roles: ["Barista", "Manager"],
    steps: [
      "Turn on the main power switch located on the back of the machine",
      "Wait for the machine to complete its startup sequence (indicated by green light)",
      "Check water reservoir level and refill if necessary",
      "Prime the machine by running water through the group head",
      "Test steam wand functionality and clean if needed",
      "Set appropriate temperature and pressure settings",
      "Perform test shot to ensure proper extraction"
    ]
  };

  // Determine the main role for training route (default to first role, lowercased)
  const role = sop.roles && sop.roles.length > 0 ? sop.roles[0] : "role";
  const rolePath = `/role-training/${role.toLowerCase().replace(/\s+/g, "-")}-training`;

  // Step completion state (per-sop, persistent, via useStepCompletion)
  const { completed, toggleStep, allChecked, resetSteps } = useStepCompletion(
    sop.id,
    sop.steps.length
  );
  const [showConfetti, setShowConfetti] = useState(false);

  // NEW: Track if SOP is completed for this user
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    const completionFlag = localStorage.getItem(`sop_completion_${sopId}`);
    setIsCompleted(completionFlag === "completed");
  }, [sopId]);

  const handleCompleteTraining = () => {
    localStorage.setItem(`sop_completion_${sopId}`, "completed");
    setShowConfetti(true);
    setShowConfirmation(true);
    toast({
      title: "Training Completed!",
      description: "Great job finishing all steps. Returning to training module...",
    });
    setTimeout(() => {
      setShowConfetti(false);
      navigate("/role-training/barista-training");
    }, 3000);
  };

  // If SOP changes, reset confetti and step checkmarks
  useEffect(() => {
    setShowConfetti(false);
    resetSteps();
    // eslint-disable-next-line
  }, [sopId]);

  if (!sop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-blue-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Confetti trigger={showConfetti} />
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(rolePath)}
                className="text-blue-700 hover:bg-blue-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-blue-900">SOP Training</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* SOP Header */}
        <Card className="mb-6 border-blue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">{sop.title}</CardTitle>
            <CardDescription className="text-blue-600">{sop.description}</CardDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              {sop.roles.map((role: string) => (
                <span key={role} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200">
                  {role}
                </span>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Training Steps */}
        <Card className="mb-6 border-blue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900">Training Steps</CardTitle>
            <CardDescription className="text-blue-600">
              {isCompleted
                ? "Steps for your reference. This training module is completed."
                : "Check off each step as you finish it."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isCompleted ? (
                // Read-only view: plain steps with no checkboxes
                <ol className="list-decimal list-inside space-y-3">
                  {sop.steps.map((step: string, index: number) => (
                    <li key={index} className="text-blue-700 text-lg bg-blue-50/30 px-4 py-3 rounded-lg border border-blue-200">
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                sop.steps.map((step: string, index: number) => (
                  <label
                    key={index}
                    className={`flex items-start space-x-4 p-4 border border-blue-200 rounded-lg bg-blue-50/30 transition 
                    ${completed[index] ? "opacity-70 ring-2 ring-green-200" : ""}
                    hover:scale-[1.01]`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold border border-blue-200">
                      {index + 1}
                    </div>
                    <div className="flex-1 flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-green-600 mr-3 h-5 w-5 accent-blue-600 rounded border-blue-300"
                        checked={completed[index]}
                        onChange={() => toggleStep(index)}
                        style={{ accentColor: "#22c55e" }}
                      />
                      <span className={`text-blue-700 text-lg ${completed[index] ? "line-through" : ""}`}>{step}</span>
                    </div>
                  </label>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Complete Training Button: hidden if already completed */}
        {!isCompleted && (
          <div className="text-center">
            <Button
              onClick={handleCompleteTraining}
              size="lg"
              className={`bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 font-semibold shadow-md ${allChecked ? "" : "opacity-60 cursor-not-allowed"}`}
              disabled={!allChecked}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Finished
            </Button>
          </div>
        )}

        {/* Confirmation Message */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="max-w-md border-blue-200 shadow-lg animate-fade-in">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-scale-in" />
                  <h3 className="text-lg font-semibold mb-2 text-blue-900">Training Completed!</h3>
                  <p className="text-blue-600">Congratulations on completing the training. Returning to training module...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SOPViewer;
