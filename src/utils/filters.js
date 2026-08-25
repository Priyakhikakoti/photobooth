// Filter presets defined according to vintage & cute aesthetics

export const FILTER_PRESETS = [
  {
    id: 'original',
    name: 'Original 🎀',
    cssFilter: 'none',
    description: 'Natural & clear glow',
    badgeColor: 'bg-stone-100 text-stone-700 border-stone-200',
  },
  {
    id: 'honeyGlow',
    name: 'Honey Glow 🍯',
    cssFilter: 'sepia(0.25) saturate(1.2) brightness(1.08) contrast(0.9)',
    description: 'Warm golden sepia tones',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    id: 'softSakura',
    name: 'Soft Sakura 🌸',
    cssFilter: 'sepia(0.15) hue-rotate(-10deg) saturate(1.3) brightness(1.1) contrast(0.95)',
    description: 'Dreamy pink rosy aesthetic',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-300',
  },
  {
    id: 'peachSunset',
    name: 'Peach Sunset 🌅',
    cssFilter: 'sepia(0.35) hue-rotate(-15deg) saturate(1.35) brightness(1.06) contrast(0.95)',
    description: 'Cozy golden warm glow',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
  },
  {
    id: 'oldFilm',
    name: 'Old Film 🎞️',
    cssFilter: 'sepia(0.45) saturate(0.7) brightness(1.04) contrast(0.85)',
    description: 'Muted retro film look',
    badgeColor: 'bg-stone-200 text-stone-800 border-stone-400',
  },
  {
    id: 'retro90s',
    name: 'Retro 90s 📽️',
    cssFilter: 'saturate(1.4) contrast(1.12) brightness(1.04) sepia(0.15)',
    description: 'Vibrant vintage magazine vibe',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
  },
  {
    id: 'coolBreeze',
    name: 'Cool Breeze 🌊',
    cssFilter: 'hue-rotate(170deg) saturate(0.85) brightness(1.05) contrast(0.95) sepia(0.08)',
    description: 'Pastel cyan chill mood',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
  },
  {
    id: 'noirBw',
    name: 'Noir B&W 🖤',
    cssFilter: 'grayscale(1) contrast(1.15) brightness(1.05)',
    description: 'Classic monochrome portrait',
    badgeColor: 'bg-zinc-800 text-white border-zinc-900',
  }
];

export function getFilterById(id) {
  return FILTER_PRESETS.find(f => f.id === id) || FILTER_PRESETS[0];
}

// Cute Strip Color Themes
export const STRIP_THEMES = [
  { id: 'cream', name: 'Vanilla Cream 🍦', bg: '#FAF6EE', border: '#EBE0CD', text: '#3E2723', date: '#8D6E63' },
  { id: 'pink', name: 'Sakura Pink 🌸', bg: '#FFF0F5', border: '#F8BBD0', text: '#880E4F', date: '#AD1457' },
  { id: 'lavender', name: 'Lavender Dream 💜', bg: '#F8F0FC', border: '#E1BEE7', text: '#4A148C', date: '#6A1B9A' },
  { id: 'butter', name: 'Honey Butter 🧈', bg: '#FFFDE7', border: '#FFF59D', text: '#E65100', date: '#F57F17' },
  { id: 'mint', name: 'Minty Matcha 🍵', bg: '#F1F8E9', border: '#C8E6C9', text: '#1B5E20', date: '#2E7D32' },
];

export function getThemeById(id) {
  return STRIP_THEMES.find(t => t.id === id) || STRIP_THEMES[0];
}

// Cute Corner Sticker Options
export const CUTE_STICKERS = [
  { id: 'bow', name: 'Pink Bow 🎀', emoji: '🎀' },
  { id: 'cherries', name: 'Cherries 🍒', emoji: '🍒' },
  { id: 'peach', name: 'Peachy 🍑', emoji: '🍑' },
  { id: 'hearts', name: 'Hearts 💖', emoji: '💖' },
  { id: 'sparkles', name: 'Sparkles ✨', emoji: '✨' },
];
