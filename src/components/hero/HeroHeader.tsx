
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroHeaderProps {
  onJoinWaitlist: () => void;
}

export const HeroHeader = ({ onJoinWaitlist }: HeroHeaderProps) => {
  return (
    <div className="text-center max-w-5xl mx-auto mb-20">
      {/* Coming Soon Badge */}
      <div className="inline-flex items-center justify-center px-6 py-2 bg-blue-50 backdrop-blur-sm rounded-full mb-8 border border-blue-200 animate-bounce">
        <span className="text-sm font-semibold text-blue-700 tracking-wide">COMING SOON</span>
      </div>
      
      {/* Main Headline */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-900 mb-8 leading-tight tracking-tight">
        Your Voice. Your SOPs.
        <br />
        <span className="text-blue-600">Your Training.</span>
      </h1>
      
      {/* Target Audience */}
      <div className="inline-flex items-center px-6 py-3 bg-blue-50 backdrop-blur-sm rounded-lg mb-8 border border-blue-200">
        <span className="text-lg font-medium text-blue-800">For Business Owners • Team Leads • Operators</span>
      </div>
      
      {/* Value Description */}
      <p className="text-xl md:text-2xl text-blue-700 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
        Speak your process while you work. 
        <br className="hidden md:block" />
        Tasklane transforms it into detailed SOPs — automatically.
      </p>
      
      {/* CTA Section */}
      <div className="space-y-6">
        <Button 
          size="lg" 
          className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
          onClick={onJoinWaitlist}
        >
          Join Waitlist
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <p className="text-blue-600 text-lg font-medium">
          Be the first to get early access and shape the future of training
        </p>
      </div>
    </div>
  );
};
