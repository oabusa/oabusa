
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Edit, Video, Play, ArrowRight } from "lucide-react";
import { ProcessingSteps } from "./ProcessingSteps";
import { SOPOutput } from "./SOPOutput";

interface InteractiveDemoProps {
  onJoinWaitlist?: () => void;
}

export const InteractiveDemo = ({ onJoinWaitlist }: InteractiveDemoProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  const steps = [
    { icon: Upload, text: "Uploading screen recording...", color: "text-blue-500" },
    { icon: Edit, text: "Transcribing with AI...", color: "text-blue-600" },
    { icon: FileText, text: "Generating comprehensive SOP...", color: "text-blue-700" }
  ];

  const voiceLines = [
    "So first, we need to check the inventory levels because...",
    "Next, verify the quality standards are met by...",
    "Finally, document everything in the system to ensure..."
  ];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsProcessing(false);
            setShowOutput(true);
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      const stepInterval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % steps.length);
      }, 1600);

      return () => {
        clearInterval(interval);
        clearInterval(stepInterval);
      };
    }
  }, [isProcessing]);

  const handleStartDemo = () => {
    setProgress(0);
    setCurrentStep(0);
    setShowOutput(false);
    setIsProcessing(true);
  };

  return (
    <section className="pt-8 pb-8 px-4 sm:px-6 md:px-8">
      {/* Section Title */}
      <div className="text-center mb-6 md:mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900">
          See Tasklane in Action
        </h2>
        <p className="text-blue-700 mt-2 text-base md:text-lg">
          Watch how your narrated screen recording becomes a fully structured SOP.
        </p>
      </div>

      {/* Interactive Demo Card */}
      <div className="relative group mb-8 md:mb-12">
        {/* Floating visuals - hidden on mobile for cleaner look */}
        <div className="hidden md:block absolute -top-4 -left-4 w-8 h-8 bg-blue-200 rounded-full opacity-60 animate-bounce delay-1000"></div>
        <div className="hidden md:block absolute -top-2 -right-6 w-6 h-6 bg-blue-300 rounded-full opacity-40 animate-pulse delay-500"></div>
        <div className="hidden md:block absolute -bottom-4 -right-2 w-10 h-10 bg-blue-100 rounded-full opacity-50 animate-bounce delay-700"></div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl border-2 border-blue-200 p-4 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]">
          {/* Browser Header */}
          <div className="flex items-center justify-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-blue-100">
            <span className="text-blue-800 text-lg md:text-xl font-bold text-center">Tasklane AI SOP Generator</span>
          </div>

          {/* Main Interface */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50/30 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-blue-100 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-blue-300 rounded-full mix-blend-multiply animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
              {/* Upload Card */}
              <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border border-blue-200 shadow-sm mb-4 md:mb-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isProcessing 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 animate-pulse' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                    }`}>
                      <Video className={`w-5 h-5 md:w-6 md:h-6 text-white ${isProcessing ? 'animate-bounce' : ''}`} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-blue-800 text-sm md:text-base">Screen Recording Upload</h3>
                      <p className="text-xs md:text-sm text-blue-600">
                        {isProcessing ? 'Processing your narrated screen recording...' : 'Upload your narrated screen recording'}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleStartDemo}
                    disabled={isProcessing}
                    className={`px-4 py-2 md:px-6 rounded-lg font-medium transition-all duration-300 text-sm md:text-base ${
                      isProcessing 
                        ? 'bg-blue-100 text-blue-600 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <Edit className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        Try Demo
                      </>
                    )}
                  </Button>
                </div>

                {/* File Upload UI */}
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-3 md:p-4 mb-4 bg-blue-50/50">
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <Upload className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm font-medium text-center">
                      {isProcessing ? 'inventory-training.mp4 (uploaded)' : 'Drop screen recording here or click to browse'}
                    </span>
                  </div>
                  {!isProcessing && (
                    <p className="text-xs text-blue-500 text-center mt-2">
                      Upload .mp4, .mov, .avi files with narrated instructions
                    </p>
                  )}
                </div>

                {/* Progress Indicator */}
                <div className="mb-4">
                  <div className="w-full bg-blue-100 rounded-full h-2 md:h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 h-2 md:h-3 rounded-full transition-all duration-100 relative"
                      style={{width: `${progress}%`}}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-blue-600 mt-2 font-medium">{progress}% Complete</p>
                </div>

                {/* Transcription Preview */}
                <div className="bg-blue-50 rounded-lg p-3 md:p-4 border border-blue-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-blue-500 animate-ping' : 'bg-blue-500'}`}></div>
                    <span className="text-xs md:text-sm font-medium text-blue-700">AI Transcription</span>
                  </div>
                  <p className="text-blue-800 font-medium italic text-xs md:text-sm">
                    "{voiceLines[currentStep] || voiceLines[0]}"
                  </p>
                  {isProcessing && (
                    <div className="flex space-x-1 mt-2">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Process + Output */}
              <ProcessingSteps 
                steps={steps}
                currentStep={currentStep}
                isProcessing={isProcessing}
                showOutput={showOutput}
              />

              <SOPOutput showOutput={showOutput} />
            </div>
          </div>
        </div>
      </div>

      {/* Stop Training Section - Always visible below demo */}
      <div className="text-center bg-blue-50 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl border border-blue-200 max-w-4xl mx-auto">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-blue-900">
          Stop Training The Same Thing Over and Over
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-blue-700 mb-5 md:mb-6 max-w-2xl mx-auto">
          Your voice is your power. Tasklane turns it into repeatable training — so you never have to say it twice.
        </p>

        <div className="flex justify-center">
          <Button 
            size="lg"
            onClick={onJoinWaitlist}
            className="bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-3 md:py-4 shadow-lg rounded-xl w-full sm:w-auto max-w-sm"
          >
            Secure Your Spot Now
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Button>
        </div>

        <p className="text-blue-600 text-xs md:text-sm mt-3 md:mt-4">
          Be among the first to transform how teams train — using your voice.
        </p>
      </div>
    </section>
  );
};
