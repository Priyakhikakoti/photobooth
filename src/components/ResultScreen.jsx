import React, { useState, useRef } from 'react';
import PhotoStripCanvas from './PhotoStripCanvas';
import FilterSelector from './FilterSelector';
import { STRIP_THEMES, CUTE_STICKERS } from '../utils/filters';
import confetti from 'canvas-confetti';
import { Download, RefreshCw, Sparkles, Heart, Edit3, Palette, Smile, Share2 } from 'lucide-react';


export default function ResultScreen({ photos, filterId, onRetake }) {
  const [caption, setCaption] = useState('best day ever ✦');
  const [selectedTheme, setSelectedTheme] = useState('cream');
  const [selectedSticker, setSelectedSticker] = useState('bow');
  const [activeFilter, setActiveFilter] = useState(filterId || 'original');
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [modalImageUri, setModalImageUri] = useState('');
  const canvasRef = useRef(null);

  const handleCanvasReady = (canvas) => {
    canvasRef.current = canvas;
  };

  const triggerConfetti = () => {
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
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDownloading(true);
    triggerConfetti();

    // Convert canvas to high-res PNG
    const imageUri = canvas.toDataURL('image/png', 1.0);
    
    // Check if on iOS / mobile touch device where standard anchor download might open in new tab
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Show image popup modal for easy long-press saving to Photos
      setModalImageUri(imageUri);
      setShowSaveModal(true);
      setIsDownloading(false);
      return;
    }

    const link = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    link.download = `peachy-photo-strip-${today}.png`;
    link.href = imageUri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
    }, 800);
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    triggerConfetti();

    try {
      if (canvas.toBlob) {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            handleDownload();
            return;
          }
          const file = new File([blob], 'peachy-photo-strip.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'My Peachy Photobooth Strip 🎀',
              text: 'Look at my cute photobooth strip from Peachy Booth! ✨'
            });
          } else {
            handleDownload();
          }
        }, 'image/png', 1.0);
      } else {
        handleDownload();
      }
    } catch (err) {
      console.warn("Share feature unsupported or cancelled:", err);
      handleDownload();
    }
  };

  const canWebShare = typeof navigator !== 'undefined' && !!navigator.canShare;

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-6 flex flex-col items-center">
      {/* Title Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs sm:text-sm font-cute font-bold mb-2 sm:mb-3 animate-bounce-soft">
        <Sparkles className="w-4 h-4 text-pink-500 fill-pink-400" />
        <span>Your cutie photobooth strip is ready! 💖</span>
      </div>

      <h2 className="font-cute text-2xl sm:text-4xl font-bold text-vintage-dark tracking-wide mb-4 sm:mb-6 text-center">
        Your tiny memory ✦
      </h2>

      {/* Main Canvas & Customization Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start w-full bg-white/80 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-3xl border-2 border-pink-200/80 shadow-xl mb-6">
        
        {/* Photo Strip Render Container (Sticky ONLY on md+ screens to avoid blocking mobile view) */}
        <div className="flex flex-col items-center justify-center md:sticky md:top-4 w-full">
          <PhotoStripCanvas
            photos={photos}
            filterId={activeFilter}
            themeId={selectedTheme}
            stickerId={selectedSticker}
            caption={caption}
            onCanvasReady={handleCanvasReady}
          />
          <p className="text-[11px] text-pink-600/80 font-cute mt-2 text-center md:hidden">
            👇 Scroll down to customize caption, colors & stickers!
          </p>
        </div>

        {/* Customization & Action Controls */}
        <div className="flex flex-col justify-center space-y-4 sm:space-y-5 w-full">
          
          {/* Filter Preset Selector */}
          <div className="space-y-2 bg-peach-50/70 p-3.5 sm:p-4 rounded-2xl border border-peach-200">
            <FilterSelector
              selectedFilter={activeFilter}
              onSelectFilter={setActiveFilter}
              compact={true}
            />
          </div>

          {/* Editable Caption Section */}
          <div className="space-y-2 bg-pink-50/70 p-3.5 sm:p-4 rounded-2xl border border-pink-200">
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
              className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border border-pink-200 text-vintage-dark font-handwriting font-bold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all shadow-xs"
            />
            <p className="text-[11px] text-pink-600/80">Updates photo strip in real-time (max 32 chars).</p>
          </div>

          {/* Strip Color Theme Selector */}
          <div className="space-y-2 bg-amber-50/70 p-3.5 sm:p-4 rounded-2xl border border-amber-200">
            <label className="text-xs font-cute font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-500" />
              <span>2. Choose Strip Color 🎨</span>
            </label>
            <div className="grid grid-cols-2 min-[400px]:grid-cols-3 gap-2">
              {STRIP_THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTheme(t.id)}
                  className={`
                    px-2.5 py-2 rounded-xl text-xs font-cute font-bold transition-all cursor-pointer border text-center flex items-center justify-center gap-1 select-none
                    ${selectedTheme === t.id
                      ? 'bg-white text-vintage-dark border-pink-400 shadow-sm scale-[1.02] ring-2 ring-pink-300'
                      : 'bg-white/70 text-stone-600 border-stone-200 hover:bg-white'
                    }
                  `}
                >
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Corner Sticker Selector */}
          <div className="space-y-2 bg-purple-50/70 p-3.5 sm:p-4 rounded-2xl border border-purple-200">
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
                    px-3 py-1.5 rounded-xl text-xs font-cute font-bold transition-all cursor-pointer border flex items-center gap-1 select-none
                    ${selectedSticker === s.id
                      ? 'bg-white text-purple-900 border-purple-400 shadow-sm scale-[1.02] ring-2 ring-purple-300'
                      : 'bg-white/70 text-stone-600 border-stone-200 hover:bg-white'
                    }
                  `}
                >
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            {canWebShare && (
              <button
                onClick={handleShare}
                className="btn-primary w-full text-base py-3.5 font-cute font-bold shadow-md hover:shadow-lg cursor-pointer transform hover:scale-[1.01]"
              >
                <Share2 className="w-5 h-5" />
                <span>Share / Save to Photos 📲</span>
              </button>
            )}

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full text-base py-3.5 font-cute font-bold shadow-md hover:shadow-lg cursor-pointer transform hover:scale-[1.01] ${
                canWebShare ? 'btn-secondary' : 'btn-primary'
              }`}
            >
              <Download className="w-5 h-5" />
              <span>{isDownloading ? 'Saving PNG...' : 'Download PNG 💖'}</span>
            </button>

            <button
              onClick={onRetake}
              className="btn-secondary w-full text-sm sm:text-base py-3 font-cute font-bold cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-stone-500" />
              <span>Retake Photos 📸</span>
            </button>
          </div>

          {/* Privacy Reminder */}
          <div className="text-center pt-2 border-t border-peach-100">
            <p className="text-xs text-stone-400 flex items-center justify-center gap-1">
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-300" />
              <span>Saved 100% locally to your device!</span>
            </p>
          </div>

        </div>
      </div>

      {/* Save Modal for Mobile Devices */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full flex flex-col items-center text-center shadow-2xl border-2 border-pink-200 animate-scale-up">
            <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-cute text-xl font-bold text-stone-800 mb-1">Save to your Phone 📱</h3>
            <p className="text-xs text-stone-500 mb-3">Long press the image below and tap <strong>"Save to Photos"</strong> or <strong>"Download Image"</strong>!</p>
            
            <div className="my-2 p-2 bg-pink-50/50 rounded-2xl border border-pink-100 max-h-[50vh] overflow-y-auto">
              <img src={modalImageUri} alt="Peachy Photo Strip" className="w-auto max-h-[40vh] rounded-xl shadow-md mx-auto" />
            </div>

            <button
              onClick={() => setShowSaveModal(false)}
              className="btn-primary w-full py-2.5 text-sm font-bold mt-3 cursor-pointer"
            >
              Done 💖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

