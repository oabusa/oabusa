
import { Zap, Crown, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EarlyAccessSectionProps {
  onJoinWaitlist: () => void;
}

export const EarlyAccessSection = ({ onJoinWaitlist }: EarlyAccessSectionProps) => {
  return (
    <section className="py-6 md:py-8 px-4 sm:px-6 md:px-8">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 md:p-8 border-2 border-blue-200 shadow-xl max-w-5xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            Limited Early Access
          </h3>
          <p className="text-blue-700 mb-6 font-medium max-w-3xl mx-auto">
            Join founding teams transforming training with voice-powered SOPs
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/80 rounded-lg p-4 border border-blue-200 text-center">
              <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <span className="font-bold text-blue-800 text-sm block">Priority Access</span>
            </div>
            <div className="bg-white/80 rounded-lg p-4 border border-blue-200 text-center">
              <Star className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <span className="font-bold text-blue-800 text-sm block">Personal Setup</span>
            </div>
            <div className="bg-white/80 rounded-lg p-4 border border-blue-200 text-center">
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <span className="font-bold text-blue-800 text-sm block">Shape Features</span>
            </div>
            <div className="bg-white/80 rounded-lg p-4 border border-blue-200 text-center">
              <Crown className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <span className="font-bold text-blue-800 text-sm block">Founder Status</span>
            </div>
          </div>

          <Button
            size="lg"
            onClick={onJoinWaitlist}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 shadow-lg rounded-xl w-full sm:w-auto max-w-sm"
          >
            Secure Your Spot
          </Button>
        </div>
      </div>
    </section>
  );
};
