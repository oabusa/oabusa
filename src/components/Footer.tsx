
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-24 px-6 sm:px-8 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-8">
            <button 
              onClick={scrollToHero}
              className="text-blue-700 font-bold text-4xl tracking-tight hover:opacity-80 transition-opacity"
            >
              Tasklane
            </button>
          </div>
          <p className="text-gray-600 max-w-lg mx-auto mb-6 font-medium text-lg leading-relaxed">
            Say it once. Train forever. Built for operators who know how exhausting training can be.
          </p>
          <p className="text-gray-500 text-base">
            Email: contact@tasklane.ai
          </p>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Tasklane. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
