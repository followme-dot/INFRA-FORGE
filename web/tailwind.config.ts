import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          bg: {
            primary: '#050508',
            secondary: '#0a0a0f',
            tertiary: '#0d1117',
          },
          accent: {
            cyan: '#00d4ff',
            purple: '#7c3aed',
            gold: '#f59e0b',
            emerald: '#10b981',
            danger: '#ef4444',
          },
          text: {
            primary: '#f0f6fc',
            secondary: '#8b949e',
            muted: '#484f58',
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'forge-glow': 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)',
        'forge-card': 'linear-gradient(135deg, rgba(0, 212, 255, 0.03) 0%, rgba(124, 58, 237, 0.03) 100%)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'forge-spark': 'forge-spark 1.5s ease-out forwards',
        'loading-bar': 'loading-bar 2s ease-in-out infinite',
        'particle': 'particle 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'forge-spark': {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(180deg)', opacity: '0' },
        },
        'loading-bar': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'particle': {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translateY(-100px) scale(1.5)', opacity: '1' },
        }
      },
      boxShadow: {
        'forge-glow': '0 0 50px rgba(0, 212, 255, 0.3)',
        'forge-glow-sm': '0 0 20px rgba(0, 212, 255, 0.2)',
        'forge-card': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        'glass': '20px',
      }
    },
  },
  plugins: [],
}

export default config
