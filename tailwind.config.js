/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          light: '#FAFAF9',
          dark: '#0F0F0F',
        },
        text: {
          light: '#1A1A1A',
          dark: '#E5E5E5',
        },
        accent: {
          DEFAULT: '#F59E0B',
          deep: '#D97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};
