
import { Card, CardContent } from "@/components/ui/card";
import { Video, Brain, Users, BarChart3 } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Video,
      title: "Voice-Enhanced Recording",
      description: "Upload screen recorded walkthroughs with narration."
    },
    {
      icon: Brain,
      title: "AI-Powered Transcription",
      description:
        "AI captures your voice and screen to create SOPs that explain not just the steps — but the why behind them."
    },
    {
      icon: Users,
      title: "Role-Based Training",
      description:
        "Create custom roles and assign SOPs. Employees receive training that feels personal and contextual."
    },
    {
      icon: BarChart3,
      title: "Training Analytics",
      description:
        "Monitor completion rates and see how your voice-powered SOPs improve team performance."
    }
  ];

  return (
    <section id="features" className="py-20 px-6 sm:px-8 bg-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-blue-700 tracking-wide">FEATURES</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 tracking-tight">
            Built for Your Voice
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
            Transform your expertise into scalable training experiences — without losing context.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white border-blue-200 hover:shadow-xl transition-all duration-300 group h-full flex flex-col text-center"
            >
              <CardContent className="p-8 flex flex-col h-full items-center justify-start">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4 min-h-[56px]">
                  {feature.title}
                </h3>
                <p className="text-blue-700 leading-relaxed flex-1">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
