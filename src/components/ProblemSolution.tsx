
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, ArrowRight, Mic } from "lucide-react";

export const ProblemSolution = () => {
  return (
    <section className="py-24 px-6 sm:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-blue-700 tracking-wide">THE TRANSFORMATION</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            From Chaos to Clarity
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your expertise into scalable training that preserves your knowledge and reasoning.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Problem Side */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">The Problem</h3>
            </div>
            
            <Card className="border-red-200 bg-red-50/50 shadow-lg">
              <CardContent className="p-8">
                <ul className="space-y-6 text-gray-700">
                  <li className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="leading-relaxed">Endless repetition training the same processes over and over</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="leading-relaxed">Written SOPs that miss crucial context and reasoning</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="leading-relaxed">Knowledge trapped in your head, hard to scale</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="leading-relaxed">Inconsistent training outcomes across team members</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Transition Arrow with Microphone */}
          <div className="flex flex-col items-center justify-center space-y-6 lg:py-16">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Mic className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-300 rounded-full animate-ping"></div>
            </div>
            <ArrowRight className="h-10 w-10 text-blue-600" />
            <p className="text-lg font-semibold text-blue-700 text-center max-w-xs">
              Your Voice Transforms Everything
            </p>
          </div>

          {/* Solution Side */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">The Solution</h3>
            </div>
            
            <Card className="border-green-200 bg-green-50/50 shadow-lg">
              <CardContent className="p-8">
                <ul className="space-y-6 text-gray-700">
                  <li className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="leading-relaxed">Upload narrated recordings and turn them into step-by-step SOPs</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="leading-relaxed">AI captures your voice and reasoning, not just the clicks</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="leading-relaxed">Create voice-guided SOPs effortlessly that scale your expertise</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="leading-relaxed">Consistent, contextual training for every team member</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
