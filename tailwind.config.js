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
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'bounce-in': 'bounceIn 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'cart-bounce': 'cartBounce 0.5s ease-out',
        'badge-pop': 'badgePop 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeInDown: { '0%': { opacity: '0', transform: 'translateY(-20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInLeft: { '0%': { opacity: '0', transform: 'translateX(-30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.9)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        bounceIn: { '0%': { transform: 'scale(0.3)', opacity: '0' }, '50%': { transform: 'scale(1.05)' }, '70%': { transform: 'scale(0.9)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        cartBounce: { '0%': { transform: 'scale(1)' }, '30%': { transform: 'scale(1.25)' }, '50%': { transform: 'scale(0.9)' }, '70%': { transform: 'scale(1.1)' }, '100%': { transform: 'scale(1)' } },
        badgePop: { '0%': { transform: 'scale(0)' }, '70%': { transform: 'scale(1.2)' }, '100%': { transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
