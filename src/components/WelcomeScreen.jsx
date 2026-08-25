import React from 'react';
import { Camera, Sparkles, Heart } from 'lucide-react';


export default function WelcomeScreen({ onStart }) {
  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 py-6 flex flex-col items-center text-center overflow-hidden">
      
      {/* Decorative Floating Cute Stickers */}
      <div className="absolute top-2 left-6 text-3xl animate-float opacity-80 pointer-events-none select-none">🎀</div>
      <div className="absolute top-12 right-8 text-3xl animate-bounce-soft opacity-80 pointer-events-none select-none">🍒</div>
      <div className="absolute bottom-16 left-10 text-3xl animate-wiggle opacity-80 pointer-events-none select-none">🍑</div>
      <div className="absolute bottom-10 right-12 text-3xl animate-float opacity-80 pointer-events-none select-none">✨</div>

      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs sm:text-sm font-bold mb-6 animate-bounce-soft shadow-xs">
        <Sparkles className="w-4 h-4 text-pink-500 fill-pink-400" />
        <span>Your cutie retro photobooth 💖</span>
      </div>

      {/* Hero Title */}
      <h2 className="font-cute text-4xl sm:text-6xl font-bold text-vintage-dark tracking-wide mb-3 leading-tight">
        ✦ Peachy Booth ✦
      </h2>
      <p className="font-serif text-lg sm:text-xl text-peach-600 font-medium max-w-lg mb-8 italic">
        A tiny vintage photo moment. Capture 3 cute retro photos & download your aesthetic photo strip! ✨
      </p>

      {/* Interactive Cute Polaroid Photo Strip Sample */}
      <div className="relative mb-10 group cursor-pointer" onClick={onStart}>
        <div className="w-48 sm:w-56 bg-cream-50 p-3.5 pb-4 rounded-2xl border-2 border-pink-200 photo-strip-shadow transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out">
          
          {/* Top Bow Sticker */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl z-10 animate-bounce-soft">
            🎀
          </div>

          <div className="space-y-2 mb-3 mt-1">
            <div className="w-full h-24 sm:h-28 bg-pink-100/70 rounded-xl flex flex-col items-center justify-center text-pink-500 border border-pink-200 relative overflow-hidden">
              <span className="text-3xl mb-1">📸</span>
              <span className="text-[10px] font-cute tracking-widest text-pink-700 uppercase">Shot #1</span>
            </div>
            <div className="w-full h-24 sm:h-28 bg-amber-100/70 rounded-xl flex flex-col items-center justify-center text-amber-600 border border-amber-200 relative overflow-hidden">
              <span className="text-3xl mb-1">🍯</span>
              <span className="text-[10px] font-cute tracking-widest text-amber-800 uppercase">Honey Glow</span>
            </div>
            <div className="w-full h-24 sm:h-28 bg-rose-100/70 rounded-xl flex flex-col items-center justify-center text-rose-500 border border-rose-200 relative overflow-hidden">
              <span className="text-3xl mb-1">🎞️</span>
              <span className="text-[10px] font-cute tracking-widest text-rose-800 uppercase">Old Film</span>
            </div>
          </div>

          <div className="text-center font-handwriting text-sm font-bold text-vintage-sepia border-t border-peach-200/60 pt-2 flex items-center justify-center gap-1">
            <span>best day ever</span>
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-300" />
          </div>
        </div>

        {/* Floating Heart Accent */}
        <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-pink-400 border border-pink-200 animate-heartbeat">
          <Heart className="w-5 h-5 fill-pink-300" />
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="btn-primary text-lg sm:text-xl px-10 py-4 font-bold shadow-lg hover:shadow-peach-300/50 mb-8 cursor-pointer font-cute tracking-wide transform hover:scale-105"
      >
        <Camera className="w-6 h-6 stroke-[2.5]" />
        <span>Start the booth 💖</span>
      </button>

      {/* Features Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-left mb-6">
        <div className="pastel-card p-4 rounded-2xl flex items-start gap-3 hover:scale-102 transition-transform">
          <div className="w-9 h-9 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 text-lg">
            🎞️
          </div>
          <div>
            <h4 className="font-cute font-bold text-sm text-vintage-dark">8 Retro Filters</h4>
            <p className="text-xs text-stone-500 mt-0.5">Original, Soft Sakura 🌸, Honey Glow 🍯, Peach Sunset 🌅 & 90s Film.</p>
          </div>
        </div>

        <div className="pastel-card p-4 rounded-2xl flex items-start gap-3 hover:scale-102 transition-transform">
          <div className="w-9 h-9 rounded-2xl bg-peach-100 text-peach-600 flex items-center justify-center shrink-0 text-lg">
            📸
          </div>
          <div>
            <h4 className="font-cute font-bold text-sm text-vintage-dark">3 Timed Shots</h4>
            <p className="text-xs text-stone-500 mt-0.5">3-second countdown before every photo with shutter flash.</p>
          </div>
        </div>

        <div className="pastel-card p-4 rounded-2xl flex items-start gap-3 hover:scale-102 transition-transform">
          <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 text-lg">
            🔒
          </div>
          <div>
            <h4 className="font-cute font-bold text-sm text-vintage-dark">100% On-Device</h4>
            <p className="text-xs text-stone-500 mt-0.5">Photos stay inside your browser. Never uploaded to servers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
