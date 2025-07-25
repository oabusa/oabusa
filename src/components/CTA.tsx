
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "@/components/WaitlistModal";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <>
      <section className="py-20 px-6 sm:px-8 bg-blue-50 mt-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-12 shadow-xl border border-blue-200">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 tracking-tight">
              Ready to Revolutionize Your SOPs?
            </h2>
            <p className="text-xl text-blue-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join the next wave of teams training smarter — with SOPs powered by your voice.
            </p>
            <Button 
              size="lg" 
              onClick={() => setShowWaitlist(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-4 shadow-lg rounded-xl font-semibold"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <WaitlistModal 
        isOpen={showWaitlist} 
        onClose={() => setShowWaitlist(false)} 
      />
    </>
  );
};

