import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Features } from "@/components/Features";
import { Workflow } from "@/components/Workflow";
import { Benefits } from "@/components/Benefits";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { CompanyRegistrationModal } from "@/components/CompanyRegistrationModal";
import { IS_PRE_RELEASE } from "@/config/featureFlags";


const LandingPage = () => {
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100/50">
        <Hero onJoinWaitlist={() => setShowCompanyModal(true)} />
      </div>

      {/* 👇 Optional standalone animated trigger (if not using Hero CTA) */}
      
      {!IS_PRE_RELEASE && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowCompanyModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md animate-bounce hover:animate-none"
          >
            🚀 Register Your Company
          </button>
        </div>
      )}


      <div className="bg-gradient-to-b from-blue-50/30 to-white">
        <ProblemSolution />
      </div>
      <div className="bg-gradient-to-b from-blue-800 to-blue-900">
        <Features />
      </div>
      <div className="bg-white">
        <Workflow />
      </div>
      <div className="bg-blue-600">
        <Benefits />
      </div>
      <div className="bg-gradient-to-br from-blue-50 via-blue-100/50 to-white">
        <CTA />
      </div>
      <Footer />

      <CompanyRegistrationModal
        isOpen={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        onSuccess={() => {
          setShowCompanyModal(false);
          navigate("/thank-you");
        }}
      />
    </div>
  );
};

export default LandingPage;
