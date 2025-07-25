
import { Clock, Brain, Sparkles } from "lucide-react";

export const IntrigueSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-8 mb-8 border-2 border-blue-200 shadow-lg">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center items-center space-x-3 mb-8">
          <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900">What if you could...</h3>
          <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/90 rounded-xl p-8 border-2 border-blue-200 shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-blue-900 mb-3">Train once, scale infinitely</h4>
            <p className="text-blue-700 leading-relaxed">Never repeat the same training session again</p>
          </div>
          
          <div className="bg-white/90 rounded-xl p-8 border-2 border-blue-200 shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-blue-900 mb-3">Capture your exact reasoning</h4>
            <p className="text-blue-700 leading-relaxed">Preserve the 'why' behind every step</p>
          </div>
          
          <div className="bg-white/90 rounded-xl p-8 border-2 border-blue-200 shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-blue-900 mb-3">Transform tribal knowledge</h4>
            <p className="text-blue-700 leading-relaxed">Turn expertise into scalable systems</p>
          </div>
        </div>
      </div>
    </div>
  );
};
