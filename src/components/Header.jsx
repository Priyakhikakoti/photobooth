import React from 'react';
import { Camera, ShieldCheck, Heart } from 'lucide-react';


export default function Header({ screen, onReset }) {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-peach-100/80 mb-6">
      <div 
        onClick={onReset} 
        className="flex items-center gap-3 cursor-pointer group transition-transform duration-300 hover:scale-105"
      >
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-peach-400 via-pink-400 to-peach-300 text-white flex items-center justify-center shadow-md group-hover:rotate-6 transition-all duration-300 relative">
          <Camera className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 text-xs">✨</span>
        </div>
        <div>
          <h1 className="font-cute text-2xl sm:text-3xl font-bold tracking-wide text-vintage-dark flex items-center gap-1.5">
            <span>✦ Peachy Booth ✦</span>
            <Heart className="w-4 h-4 text-pink-400 fill-pink-300 animate-heartbeat" />
          </h1>
          <p className="text-xs sm:text-sm text-peach-500 font-medium font-handwriting">A tiny vintage photo moment 🎀</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-50/90 border border-pink-200 text-xs text-pink-700 font-semibold shadow-xs">
          <ShieldCheck className="w-4 h-4 text-pink-500" />
          <span>100% On-Device & Private</span>
        </div>

        {screen !== 'welcome' && (
          <button
            onClick={onReset}
            className="text-xs sm:text-sm text-peach-600 hover:text-peach-800 font-bold hover:underline underline-offset-4 cursor-pointer transition-colors"
          >
            Start Over 💖
          </button>
        )}
      </div>
    </header>
  );
}
