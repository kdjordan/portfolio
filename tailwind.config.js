/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './content/**/*.md'
  ],
  theme: {
    extend: {
      colors: {
        // Core palette - KJ Portfolio
        'bg-primary': '#050505',
        'bg-secondary': '#0a0a0a',
        'bg-tertiary': '#111111',

        // Text colors
        'text-primary': '#f5f5f5',
        'text-secondary': '#888888',
        'text-muted': '#555555',

        // Electric red accent
        'accent': '#ff2d2d',
        'accent-glow': 'rgba(255, 45, 45, 0.25)',
        'accent-dim': '#cc2424',

        // Frost highlight (for 3D effects)
        'frost': '#e0f7ff',
        'frost-dim': 'rgba(224, 247, 255, 0.1)',

        // Legacy support
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Hero sizes - dramatic
        'hero': 'clamp(3rem, 10vw, 10rem)',
        'hero-sub': 'clamp(1.5rem, 4vw, 3rem)',

        // Section headers
        'section': 'clamp(2rem, 6vw, 5rem)',
        'section-sub': 'clamp(1.25rem, 2vw, 1.75rem)',

        // Body text
        'body-lg': 'clamp(1.125rem, 1.5vw, 1.375rem)',
        'body': 'clamp(1rem, 1.25vw, 1.125rem)',
        'body-sm': 'clamp(0.875rem, 1vw, 1rem)',

        // Small/utility
        'label': 'clamp(0.75rem, 0.9vw, 0.875rem)',
      },
      spacing: {
        'section': 'clamp(6rem, 15vh, 12rem)',
        'section-sm': 'clamp(3rem, 8vh, 6rem)',
      },
      transitionDuration: {
        'snappy': '150ms',
        'smooth': '300ms',
      },
      transitionTimingFunction: {
        'snappy': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 45, 45, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 45, 45, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
