
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileCheck, Eye, TrendingUp } from "lucide-react";

export const Workflow = () => {
  const steps = [
    {
      icon: Upload,
      title: "Speak Your Process",
      description: "Just upload yourself doing the task (Loom, Zoom, etc.)",
      number: "01"
    },
    {
      icon: FileCheck,
      title: "AI Does the Work",
      description: "AI automatically creates step-by-step procedures",
      number: "02"
    },
    {
      icon: Eye,
      title: "Polish & Perfect",
      description: "Review, edit, and approve your new SOP",
      number: "03"
    },
    {
      icon: TrendingUp,
      title: "Scale Instantly",
      description: "Deploy to your team and watch productivity soar",
      number: "04"
    }
  ];

  return (
    <section id="workflow" className="py-20 px-6 sm:px-8 bg-gradient-to-b from-blue-50/30 to-white/90">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full mb-6 border border-blue-200/50">
            <span className="text-sm font-semibold text-blue-700 tracking-wide">HOW IT WORKS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 tracking-tight">
            Simple 4-Step Process
          </h2>
          <p className="text-xl text-blue-700/80 max-w-3xl mx-auto leading-relaxed">
            Transform your expertise into scalable training in minutes, not hours
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="bg-white/95 backdrop-blur-sm border-blue-100 hover:shadow-xl transition-all duration-300 group h-full">
                <CardContent className="p-8 text-center relative h-full flex flex-col">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>
                  <div className="w-16 h-16 bg-blue-100/80 rounded-2xl flex items-center justify-center mb-6 mt-8 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">{step.title}</h3>
                  <p className="text-blue-700/80 leading-relaxed flex-grow">{step.description}</p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200/60 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
