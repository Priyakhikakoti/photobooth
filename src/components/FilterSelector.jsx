import React from 'react';
import { FILTER_PRESETS } from '../utils/filters';
import { Sparkles, Check } from 'lucide-react';

export default function FilterSelector({ selectedFilter, onSelectFilter, disabled = false }) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <label className="text-xs font-cute font-bold text-vintage-sepia uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-peach-500 fill-peach-300" />
          <span>Choose Filter Preset ({FILTER_PRESETS.length} available)</span>
        </label>
        <span className="text-xs font-cute text-pink-600 font-semibold">Live preview ✨</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-cream-100/90 p-2 rounded-2xl border-2 border-peach-200/80 shadow-inner max-h-[160px] sm:max-h-none overflow-y-auto">
        {FILTER_PRESETS.map((preset) => {
          const isSelected = selectedFilter === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectFilter(preset.id)}
              className={`
                relative py-2.5 px-2.5 rounded-xl font-cute font-bold text-xs sm:text-xs transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 text-center
                ${isSelected 
                  ? 'bg-white text-peach-700 shadow-md border-2 border-peach-400 scale-[1.03] ring-2 ring-peach-200' 
                  : 'bg-white/60 text-stone-700 hover:text-stone-900 hover:bg-white border border-transparent'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-center gap-1">
                <span>{preset.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-peach-500 stroke-[3]" />}
              </div>
              <span className="text-[10px] text-stone-400 font-sans font-normal line-clamp-1">
                {preset.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
