/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#080e1e',
        navy2: '#0a1020',
        navy3: '#0d1b3e',
        blue: '#4169E1',
        purple: '#7B2FBE',
        gold: '#D4AF37',
        teal: '#1D9E75',
        offwhite: '#F2F0EB',
        /* semantic aliases */
        bg: '#0a1020',
        text: '#F2F0EB',
        muted: 'rgba(242, 240, 235, 0.5)',
        border: 'rgba(255, 255, 255, 0.08)',
        'dark-bg': '#080e1e',
        'dark-surface': '#0d1b3e',
        'dark-text': '#F2F0EB',
        'blue-light': '#7ba7ff',
        'purple-light': '#c088f0',
        'teal-light': '#4dd4a8',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 8px rgba(65, 105, 225, 0.7)',
        'glow-purple': '0 0 8px rgba(123, 47, 190, 0.7)',
        'glow-gold': '0 0 8px rgba(212, 175, 55, 0.6)',
        'glow-teal': '0 0 8px rgba(29, 158, 117, 0.6)',
        'btn-glow': '0 0 24px rgba(65, 105, 225, 0.35)',
        'btn-glow-hover': '0 0 32px rgba(65, 105, 225, 0.5)',
      },
    },
  },
  plugins: [],
}
