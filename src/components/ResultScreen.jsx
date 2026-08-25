import React, { useState, useRef } from 'react';
import PhotoStripCanvas from './PhotoStripCanvas';
import { STRIP_THEMES, CUTE_STICKERS } from '../utils/filters';
import confetti from 'canvas-confetti';
import { Download, RefreshCw, Sparkles, Heart, Edit3, Palette, Smile } from 'lucide-react';

export default function ResultScreen({ photos, filterId, onRetake }) {
  const [caption, setCaption] = useState('best day ever ✦');
  const [selectedTheme, setSelectedTheme] = useState('cream');
  const [selectedSticker, setSelectedSticker] = useState('bow');
  const [isDownloading, setIsDownloading] = useState(false);
  const canvasRef = useRef(null);

  const handleCanvasReady = (canvas) => {
    canvasRef.current = canvas;
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDownloading(true);

    // Trigger celebratory pastel confetti burst
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#ffeedd', '#ffd8be', '#ff9a6e', '#fce4ec', '#f3e5f5', '#f8bbd0']
      });
    } catch (e) {
      console.warn("Confetti effect unavailable:", e);
    }

    // Convert canvas to high-res PNG
    const imageUri = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    link.download = `peachy-photo-strip-${today}.png`;
    link.href = imageUri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center">
      {/* Title Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs sm:text-sm font-cute font-bold mb-3 animate-bounce-soft">
        <Sparkles className="w-4 h-4 text-pink-500 fill-pink-400" />
        <span>Your cutie photobooth strip is ready! 💖</span>
      </div>

      <h2 className="font-cute text-3xl sm:text-4xl font-bold text-vintage-dark tracking-wide mb-6 text-center">
        Your tiny memory ✦
      </h2>

      {/* Main Canvas & Customization Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl border-2 border-pink-200/80 shadow-xl mb-8">
        
        {/* Photo Strip Render */}
        <div className="flex justify-center sticky top-4">
          <PhotoStripCanvas
            photos={photos}
            filterId={filterId}
            themeId={selectedTheme}
            stickerId={selectedSticker}
            caption={caption}
            onCanvasReady={handleCanvasReady}
          />
        </div>

        {/* Customization & Action Controls */}
        <div className="flex flex-col justify-center space-y-5">
          
          {/* Editable Caption Section */}
          <div className="space-y-2 bg-pink-50/60 p-4 rounded-2xl border border-pink-200">
            <label className="text-xs font-cute font-bold text-pink-800 uppercase tracking-wider flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-pink-500" />
              <span>1. Write a Cute Caption 🎀</span>
            </label>
            <input
              type="text"
              maxLength={32}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a sweet caption..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-pink-200 text-vintage-dark font-handwriting font-bold text-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all shadow-xs"
            />
            <p className="text-[11px] text-pink-600/80">Updates photo strip in real-time (max 32 chars).</p>
          </div>

          {/* Strip Color Theme Selector */}
          <div className="space-y-2 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <label className="text-xs font-cute font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-500" />
              <span>2. Choose Strip Color 🎨</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STRIP_THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTheme(t.id)}
                  className={`
                    px-2.5 py-2 rounded-xl text-xs font-cute font-bold transition-all cursor-pointer border text-center flex items-center justify-center gap-1
                    ${selectedTheme === t.id
                      ? 'bg-white text-vintage-dark border-pink-400 shadow-sm scale-105 ring-2 ring-pink-300'
                      : 'bg-white/60 text-stone-600 border-stone-200 hover:bg-white'
                    }
                  `}
                >
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Corner Sticker Selector */}
          <div className="space-y-2 bg-purple-50/60 p-4 rounded-2xl border border-purple-200">
            <label className="text-xs font-cute font-bold text-purple-900 uppercase tracking-wider flex items-center gap-2">
              <Smile className="w-4 h-4 text-purple-500" />
              <span>3. Pick Corner Sticker 🌸</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {CUTE_STICKERS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSticker(s.id)}
                  className={`
                    px-3 py-1.5 rounded-xl text-xs font-cute font-bold transition-all cursor-pointer border flex items-center gap-1
                    ${selectedSticker === s.id
                      ? 'bg-white text-purple-900 border-purple-400 shadow-sm scale-105 ring-2 ring-purple-300'
                      : 'bg-white/60 text-stone-600 border-stone-200 hover:bg-white'
                    }
                  `}
                >
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="btn-primary w-full text-base py-3.5 font-cute font-bold shadow-md hover:shadow-lg cursor-pointer transform hover:scale-102"
            >
              <Download className="w-5 h-5" />
              <span>{isDownloading ? 'Saving PNG...' : 'Download PNG 💖'}</span>
            </button>

            <button
              onClick={onRetake}
              className="btn-secondary w-full text-base py-3.5 font-cute font-bold cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-stone-500" />
              <span>Retake Photos 📸</span>
            </button>
          </div>

          {/* Privacy Reminder */}
          <div className="text-center pt-1 border-t border-peach-100">
            <p className="text-xs text-stone-400 flex items-center justify-center gap-1">
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-300" />
              <span>Saved 100% locally to your device!</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
