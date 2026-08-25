/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#fff9f5',
          100: '#ffeedd',
          200: '#ffd8be',
          300: '#ffbd97',
          400: '#ff9a6e',
          500: '#ff7748',
          600: '#e05829',
        },
        cream: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f4ede0',
          300: '#ebe0cd',
        },
        vintage: {
          pink: '#fce4ec',
          rose: '#f8bbd0',
          lavender: '#f3e5f5',
          mint: '#e8f5e9',
          warm: '#fff8e7',
          dark: '#2c221e',
          sepia: '#705335',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Quicksand', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"Courier Prime"', 'Courier', 'monospace'],
        cute: ['Fredoka', 'Quicksand', 'sans-serif'],
        handwriting: ['Pacifico', 'cursive'],
      },
      animation: {
        'flash': 'flash 0.25s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
        'bounce-soft': 'bounceSoft 1.5s infinite ease-in-out',
        'float': 'float 4s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        flash: {
          '0%': { opacity: '1', backgroundColor: 'white' },
          '100%': { opacity: '0', backgroundColor: 'transparent' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.92', transform: 'scale(1.02)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1.5deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%, 28%': { transform: 'scale(1.12)' },
          '42%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
