
import { MonitorSpeaker, Sparkles, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ValuePropositionProps {
  onJoinWaitlist: () => void;
}

export const ValueProposition = ({ onJoinWaitlist }: ValuePropositionProps) => {
  return (
    <div className="mb-16">
      <div className="bg-blue-50 rounded-2xl p-6 md:p-8 shadow-xl border border-blue-100">
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">
            Transform Your Training Process
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300 border border-blue-100">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MonitorSpeaker className="w-6 h-6 text-white" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Record Once</h4>
              <p className="text-blue-700 text-sm">Capture your screen and voice</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300 border border-blue-100">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">AI Creates SOPs</h4>
              <p className="text-blue-700 text-sm">Automated step-by-step guides</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300 border border-blue-100">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <UserCog className="w-6 h-6 text-white" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Scale Training</h4>
              <p className="text-blue-700 text-sm">Assign to roles and teams</p>
            </div>
          </div>

          <Button 
            size="lg"
            onClick={onJoinWaitlist}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 shadow-lg rounded-xl"
          >
            Get Early Access
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
