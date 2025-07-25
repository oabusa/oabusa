
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, RotateCcw, Mic, Users, Building, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "@/components/WaitlistModal";

export const Benefits = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);

  const benefits = [
    {
      icon: Mic,
      title: "More Clarity, Less Confusion",
      description: "Your voice adds real context to every step."
    },
    {
      icon: Clock,
      title: "Save Hours per Hire",
      description: "Stop repeating yourself — let your voice onboard them."
    },
    {
      icon: RotateCcw,
      title: "Always Consistent",
      description: "Every team member learns the same way, every time."
    },
    {
      icon: Users,
      title: "Trains 24/7, Anywhere",
      description: "Your voice trains employees any time, anywhere. Perfect for remote teams and different time zones."
    },
    {
      icon: Building,
      title: "Scales Across Locations",
      description: "Easily replicate training across franchises and departments."
    },
    {
      icon: Wrench,
      title: "No Tech Skills Needed",
      description: "If you can speak it, you can create it."
    }
  ];

  return (
    <>
      <section id="benefits" className="py-20 px-6 sm:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <span className="text-sm font-semibold text-blue-700 tracking-wide">BENEFITS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 tracking-tight">
              Why Teams Love Tasklane
            </h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              Tasklane turns your narrated screen recordings into step-by-step SOPs. No manual writing required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white border-blue-200 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">{benefit.title}</h3>
                  <p className="text-blue-700 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section - Integrated into Benefits */}
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
        </div>
      </section>

      <WaitlistModal 
        isOpen={showWaitlist} 
        onClose={() => setShowWaitlist(false)} 
      />
    </>
  );
};
