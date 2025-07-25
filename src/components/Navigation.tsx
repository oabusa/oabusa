import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "./WaitlistModal";
import { IS_PRE_RELEASE } from "@/config/featureFlags";


// ✅ Feature flag to control pre-release mode
// In pre-release mode, we limit the routes and hide the login button

if (IS_PRE_RELEASE) {
  console.log("Pre-release mode: routes and login button are limited");
}

export const Navigation = () => {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={scrollToHero}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <span className="text-blue-700 font-bold text-3xl tracking-tight">Tasklane</span>
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("workflow")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg"
              >
                How it Works
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg"
              >
                Benefits
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* ✅ Join Waitlist */}
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-xl font-semibold"
                onClick={() => setShowWaitlistModal(true)}
              >
                Join Waitlist
              </Button>

              {/* ✅ Conditionally show Login */}
              {!IS_PRE_RELEASE && (
                <Button
                  variant="outline"
                  className="text-blue-700 border-blue-200 hover:bg-blue-50"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <WaitlistModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
        onSuccess={() => setShowWaitlistModal(false)}
      />
    </>
  );
};
