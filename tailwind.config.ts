import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2D6A4F',
          dark: '#1B4332',
          mint: '#52B788',
          soft: '#D8F3DC',
        },
        surface: '#F8FFF9',
        neutral: '#F1F5F2',
        border: '#C8E6CC',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(44, 106, 79, 0.12)',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
} satisfies Config
