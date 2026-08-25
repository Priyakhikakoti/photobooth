import React from 'react';
import { Camera, Sparkles, Heart } from 'lucide-react';

export default function CountdownOverlay({ count, currentShotIndex, totalShots = 3, isFlashing }) {
  
  const getPromptMessage = (num) => {
    switch (num) {
      case 3: return "Strike a cute pose! 🎀";
      case 2: return "Big smile bestie! ✨";
      case 1: return "Say cheese! 📸";
      default: return "Super cute! 💖";
    }
  };

  return (
    <div className="absolute inset-0 z-30 rounded-3xl overflow-hidden flex flex-col items-center justify-between p-6 bg-vintage-dark/35 backdrop-blur-[2px] transition-all duration-300">
      {/* White shutter flash effect overlay */}
      {isFlashing && (
        <div className="absolute inset-0 bg-white z-50 flash-overlay pointer-events-none" />
      )}

      {/* Top Shot Counter Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-vintage-dark text-xs sm:text-sm font-cute font-bold shadow-md border border-pink-200">
        <Camera className="w-4 h-4 text-peach-500" />
        <span>Photo {currentShotIndex + 1} of {totalShots}</span>
        <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-300 animate-pulse" />
      </div>

      {/* Main Countdown Display */}
      <div className="flex flex-col items-center justify-center my-auto transform transition-all">
        <span className="text-peach-200 text-sm sm:text-base font-cute font-semibold tracking-wider mb-2 flex items-center gap-1.5 drop-shadow-md">
          <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-spin" />
          {getPromptMessage(count)}
        </span>
        
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/95 backdrop-blur-md text-peach-600 font-cute font-bold text-6xl sm:text-7xl flex items-center justify-center shadow-2xl border-4 border-pink-200 animate-bounce-soft">
          {count > 0 ? count : "📸"}
        </div>
      </div>

      {/* Shot Progress Dots */}
      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
        {Array.from({ length: totalShots }).map((_, idx) => (
          <div
            key={idx}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center text-[10px] ${
              idx < currentShotIndex 
                ? 'bg-pink-400 text-white scale-110' 
                : idx === currentShotIndex 
                  ? 'bg-peach-400 animate-ping scale-125' 
                  : 'bg-white/40'
            }`}
          >
            {idx < currentShotIndex ? '✓' : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
