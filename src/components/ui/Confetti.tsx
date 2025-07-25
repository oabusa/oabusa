
import React, { useEffect } from "react";

const particleColors = [
  "bg-blue-500",
  "bg-pink-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-purple-400"
];

const numParticles = 30;

export const Confetti: React.FC<{ trigger: boolean; onEnd?: () => void }> = ({
  trigger,
  onEnd
}) => {
  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(() => onEnd && onEnd(), 2400);
    return () => clearTimeout(timeout);
  }, [trigger, onEnd]);

  if (!trigger) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array(numParticles)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className={`
              absolute w-3 h-3 rounded-full 
              ${particleColors[idx % particleColors.length]}
              animate-confetti-fall
            `}
            style={{
              left: `${(idx * 100) / numParticles}%`,
              animationDelay: `${(Math.random() * 0.6).toFixed(2)}s`,
              top: 0,
            }}
          />
        ))}
      <style>
        {`
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) scale(1) rotate(0deg); opacity:1;}
          60% { opacity:1;}
          85% { opacity:0.8;}
          100% { transform: translateY(100vh) scale(1.1) rotate(360deg); opacity:0;}
        }
        .animate-confetti-fall {
          animation: confetti-fall 2.2s cubic-bezier(.61,.21,.75,1.01) both;
        }
        `}
      </style>
    </div>
  );
};
