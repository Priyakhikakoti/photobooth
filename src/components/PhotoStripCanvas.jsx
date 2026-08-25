import React, { useEffect, useRef } from 'react';
import { getFilterById, getThemeById, CUTE_STICKERS } from '../utils/filters';

export default function PhotoStripCanvas({
  photos = [],
  filterId = 'original',
  themeId = 'cream',
  stickerId = 'bow',
  caption = 'best day ever ✦',
  dateString = '',
  onCanvasReady
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || photos.length === 0) return;

    const ctx = canvas.getContext('2d');
    const filterPreset = getFilterById(filterId);
    const themePreset = getThemeById(themeId);
    const selectedSticker = CUTE_STICKERS.find(s => s.id === stickerId) || CUTE_STICKERS[0];

    // Standard width & calculated height for high-resolution 2x rendering
    const baseWidth = 440;
    const baseHeight = 1200;
    const scale = 2; // 2x DPI for ultra-sharp PNG export

    canvas.width = baseWidth * scale;
    canvas.height = baseHeight * scale;
    ctx.scale(scale, scale);

    // 1. Draw Selected Cute Theme Paper Background
    ctx.fillStyle = themePreset.bg;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    // Outer subtle border line
    ctx.strokeStyle = themePreset.border;
    ctx.lineWidth = 3;
    ctx.strokeRect(12, 12, baseWidth - 24, baseHeight - 24);

    // Decorative inner thin border line
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(16, 16, baseWidth - 32, baseHeight - 32);

    // 2. Draw Top Header Title & Cute Corner Sticker
    ctx.textAlign = 'center';
    ctx.fillStyle = themePreset.text;
    ctx.font = 'bold 22px "Fredoka", "Playfair Display", Georgia, serif';
    ctx.fillText('✦ Peachy Booth ✦', baseWidth / 2, 48);

    ctx.fillStyle = themePreset.date;
    ctx.font = '11px Outfit, sans-serif';
    ctx.fillText('A TINY VINTAGE PHOTO MOMENT', baseWidth / 2, 65);

    // Draw Corner Sticker if selected
    if (selectedSticker && selectedSticker.emoji) {
      ctx.font = '24px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
      ctx.fillText(selectedSticker.emoji, baseWidth - 38, 48);
      ctx.fillText(selectedSticker.emoji, 38, 48);
    }

    // 3. Load & Draw 3 Stacked Photos
    const photoWidth = 376;
    const photoHeight = 282; // 4:3 aspect ratio
    const startX = (baseWidth - photoWidth) / 2; // 32px side padding
    const startY = 82;
    const photoGap = 18;

    let loadedCount = 0;
    const loadedImages = [];

    photos.forEach((src, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;

      img.onload = () => {
        loadedImages[idx] = img;
        loadedCount += 1;

        if (loadedCount === photos.length) {
          // Render all photos in order once loaded
          photos.forEach((_, i) => {
            const currentImg = loadedImages[i];
            if (!currentImg) return;

            const yPos = startY + i * (photoHeight + photoGap);

            // Draw Photo Frame / Shadow
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(startX - 4, yPos - 4, photoWidth + 8, photoHeight + 8);
            
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.lineWidth = 1;
            ctx.strokeRect(startX - 4, yPos - 4, photoWidth + 8, photoHeight + 8);

            // Apply filter to image context
            ctx.save();
            if (filterPreset && filterPreset.cssFilter !== 'none') {
              ctx.filter = filterPreset.cssFilter;
            }

            // Draw image maintaining aspect ratio
            ctx.drawImage(currentImg, startX, yPos, photoWidth, photoHeight);
            ctx.restore();
          });

          // 4. Draw Footer Area (Date & Custom Caption)
          const footerStartY = startY + 3 * (photoHeight + photoGap) + 14;

          // Cute divider line
          ctx.strokeStyle = themePreset.border;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(startX, footerStartY);
          ctx.lineTo(startX + photoWidth, footerStartY);
          ctx.stroke();

          // Formatted Date
          const displayDate = dateString || new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }).toUpperCase();

          ctx.textAlign = 'center';
          ctx.fillStyle = themePreset.date;
          ctx.font = 'bold 12px "Courier Prime", Courier, monospace';
          ctx.fillText(displayDate, baseWidth / 2, footerStartY + 28);

          // Editable Caption Text
          ctx.fillStyle = themePreset.text;
          ctx.font = 'bold 19px "Pacifico", "Fredoka", "Playfair Display", serif';
          ctx.fillText(caption || 'best day ever ✦', baseWidth / 2, footerStartY + 58);

          // Footer Sparkles / Emoji Accent
          ctx.font = '14px "Segoe UI Emoji", sans-serif';
          ctx.fillText('💖 ✨ 🎀 ✨ 💖', baseWidth / 2, footerStartY + 82);

          if (onCanvasReady) {
            onCanvasReady(canvas);
          }
        }
      };
    });
  }, [photos, filterId, themeId, stickerId, caption, dateString, onCanvasReady]);

  return (
    <div className="flex flex-col items-center w-full">
      <canvas
        ref={canvasRef}
        className="w-full max-w-[270px] min-[380px]:max-w-[310px] sm:max-w-[370px] h-auto rounded-2xl photo-strip-shadow border-2 border-pink-200/80 transition-transform duration-300 hover:scale-[1.02]"
      />
    </div>
  );
}

