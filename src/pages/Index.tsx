import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Workflow } from "@/components/Workflow";
import { Benefits } from "@/components/Benefits";
import { Footer } from "@/components/Footer";
import { WaitlistModal } from "@/components/WaitlistModal";
import { CompanyRegistrationModal } from "@/components/CompanyRegistrationModal";
import { IS_PRE_RELEASE } from "@/config/featureFlags"; // ✅ Import flag

const Index = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-white">
        <Hero onJoinWaitlist={() => setShowWaitlist(true)} />
      </div>

      {/* ✅ Conditionally show "Register Your Company" button */}
      {!IS_PRE_RELEASE && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowCompanyModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-lg animate-bounce hover:animate-none"
          >
            🚀 Register Your Company
          </button>
        </div>
      )}

      {/* Features */}
      <div className="bg-blue-50/80 py-16">
        <Features />
      </div>

      {/* Workflow Section */}
      <div className="bg-gradient-to-b from-blue-25 to-white py-16">
        <Workflow />
      </div>

      {/* Benefits */}
      <div className="bg-blue-50 py-16">
        <Benefits />
      </div>

      <Footer />

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={showWaitlist}
        onClose={() => setShowWaitlist(false)}
        onSuccess={() => {
          setShowWaitlist(false);
          navigate("/thank-you");
        }}
      />

      {/* ✅ Conditionally mount Company Modal */}
      {!IS_PRE_RELEASE && (
        <CompanyRegistrationModal
          isOpen={showCompanyModal}
          onClose={() => setShowCompanyModal(false)}
          onSuccess={() => {
            setShowCompanyModal(false);
            navigate("/thank-you");
          }}
        />
      )}
    </div>
  );
};

export default Index;
