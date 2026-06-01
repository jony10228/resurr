import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:       '#0A0B0F',
          surface:  '#0F1117',
          elevated: '#141720',
          border:   '#1E2235',
          blue:     '#3B82F6',
          'blue-light': '#60A5FA',
          'blue-pale':  '#93C5FD',
          white:    '#F8FAFC',
          muted:    '#94A3B8',
          ghost:    '#475569',
          green:    '#22C55E',
          red:      '#EF4444',
        }
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-xl':  ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-lg':  ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md':  ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'shimmer':    'shimmer 2.5s infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'marquee':    'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        marquee:  { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-blue':    '0 0 40px rgba(59, 130, 246, 0.15)',
        'glow-blue-lg': '0 0 80px rgba(59, 130, 246, 0.2)',
        'card':         '0 1px 3px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)',
        'card-hover':   '0 4px 16px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.3)',
      },
    }
  },
  plugins: [],
} satisfies Config
