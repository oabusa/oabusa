
import { CheckCircle, Clock, Users, Brain, Mic, Zap } from "lucide-react";

export const ValueStack = () => {
  const values = [
    {
      icon: Mic,
      item: "Voice-Powered SOP Creation",
      description: "Turn your narrated expertise into comprehensive training materials"
    },
    {
      icon: Clock,
      item: "Eliminate Repetitive Training",
      description: "Train once with your voice, scale infinitely across your organization"
    },
    {
      icon: Brain,
      item: "Capture Your Reasoning",
      description: "Preserve the 'why' behind each step, not just the 'what'"
    },
    {
      icon: Users,
      item: "Consistent Team Training",
      description: "Every employee learns with your exact voice and methodology"
    },
    {
      icon: Zap,
      item: "Instant Knowledge Transfer",
      description: "Transform tribal knowledge into scalable training systems"
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-xl mb-8">
      <h3 className="text-2xl font-bold text-blue-900 text-center mb-6">
        The Power of <span className="text-blue-600">Your Voice</span>
      </h3>
      
      <div className="space-y-3 mb-6">
        {values.map((item, index) => (
          <div key={index} className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-semibold text-blue-900 block">{item.item}</span>
                <p className="text-sm text-blue-600">{item.description}</p>
              </div>
            </div>
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 ml-4" />
          </div>
        ))}
      </div>
      
      <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl border-2 border-blue-300">
        <p className="text-lg text-blue-800 font-semibold">
          Transform your expertise into scalable training systems
        </p>
        <p className="text-sm text-blue-600 mt-2">Your voice is your competitive advantage</p>
      </div>
    </div>
  );
};
