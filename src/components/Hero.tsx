import { HeroHeader } from "./hero/HeroHeader";
import { InteractiveDemo } from "./hero/InteractiveDemo";

interface HeroProps {
  onJoinWaitlist: () => void;
}

export const Hero = ({ onJoinWaitlist }: HeroProps) => {
  return (
    <section className="relative pt-32 pb-16 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <HeroHeader onJoinWaitlist={onJoinWaitlist} />
        
        {/* Interactive Demo - includes integrated sections */}
        <InteractiveDemo onJoinWaitlist={onJoinWaitlist} />
      </div>
    </section>
  );
};
