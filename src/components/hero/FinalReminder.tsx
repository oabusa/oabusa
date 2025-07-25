
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FinalReminderProps {
  onJoinWaitlist: () => void;
}

export const FinalReminder = ({ onJoinWaitlist }: FinalReminderProps) => {
  return (
    <section className="py-20 px-6 sm:px-8 bg-white mt-12 mb-16">
      <div className="text-center bg-blue-50 rounded-2xl p-8 shadow-2xl border border-blue-200">
        <h3 className="text-3xl font-bold mb-4 text-blue-900">
          Stop Training The Same Thing Over and Over
        </h3>
        <p className="text-xl text-blue-700 mb-6 max-w-2xl mx-auto">
          Your voice is your power. Tasklane turns it into repeatable training — so you never have to say it twice.
        </p>

        <Button 
          size="lg"
          onClick={onJoinWaitlist}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-12 py-4 shadow-lg rounded-xl"
        >
          Secure Your Spot Now
          <ArrowRight className="ml-2 h-6 w-6" />
        </Button>

        <p className="text-blue-600 text-sm mt-4">
          Be among the first to transform how teams train — using your voice.
        </p>
      </div>
    </section>
  );
};
