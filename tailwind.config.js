/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0a0a0f',
          card: 'rgba(15, 15, 25, 0.8)',
          hover: 'rgba(20, 20, 35, 0.9)',
        },
        neon: {
          cyan: '#00f5ff',
          purple: '#8b5cf6',
          magenta: '#ff006e',
          green: '#00ff88',
        },
        glass: {
          border: 'rgba(255, 255, 255, 0.08)',
          light: 'rgba(255, 255, 255, 0.04)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 245, 255, 0.15)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.15)',
        'glow-magenta': '0 0 20px rgba(255, 0, 110, 0.15)',
      },
      backdropBlur: {
        glass: '16px',
      },
    },
  },
  plugins: [],
};
