import React from 'react';
import { FILTER_PRESETS } from '../utils/filters';
import { Sparkles, Check } from 'lucide-react';

export default function FilterSelector({ selectedFilter, onSelectFilter, disabled = false, compact = false }) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-2 px-1">
        <label className="text-xs font-cute font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-peach-500 fill-peach-300" />
          <span>Filters ({FILTER_PRESETS.length})</span>
        </label>
        <span className="text-[11px] font-cute text-pink-600 font-semibold">Live preview ✨</span>
      </div>

      {/* Horizontal scroll on mobile, responsive grid on desktop */}
      <div className="flex overflow-x-auto pb-2 pt-1 px-1 gap-2 scrollbar-none sm:grid sm:grid-cols-4 sm:overflow-visible bg-cream-100/90 p-2 rounded-2xl border-2 border-peach-200/80 shadow-inner">
        {FILTER_PRESETS.map((preset) => {
          const isSelected = selectedFilter === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectFilter(preset.id)}
              className={`
                relative shrink-0 min-w-[125px] sm:min-w-0 py-2 px-3 rounded-xl font-cute font-bold text-xs transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 text-center select-none
                ${isSelected 
                  ? 'bg-white text-peach-700 shadow-md border-2 border-peach-400 scale-[1.02] ring-2 ring-peach-200' 
                  : 'bg-white/70 text-stone-700 hover:text-stone-900 hover:bg-white border border-stone-200/60'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-center justify-center gap-1 w-full">
                <span className="truncate">{preset.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-peach-500 shrink-0 stroke-[3]" />}
              </div>
              {!compact && (
                <span className="text-[10px] text-stone-400 font-sans font-normal line-clamp-1 w-full text-center">
                  {preset.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

