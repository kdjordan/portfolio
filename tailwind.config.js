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
        // Core palette
        'bg-primary': '#f1ede3',
        'bg-secondary': '#faf7ee',
        'bg-tertiary': '#e6e0d0',
        'bg-card': '#faf7ee',

        // Text
        'text-primary': '#1a1814',
        'text-secondary': '#2c2823',
        'text-muted': '#6b6760',

        // Accent
        'accent': '#c5482a',
        'accent-glow': 'rgba(197, 72, 42, 0.10)',
        'accent-dim': '#8a2f15',

        // Frost (for future 3D effects)
        'frost': '#faf7ee',
        'frost-dim': 'rgba(26, 24, 20, 0.08)',
      },
      fontFamily: {
        hero: ['IBM Plex Sans Condensed', 'sans-serif'],
        display: ['IBM Plex Sans Condensed', 'sans-serif'],
        body: ['IBM Plex Mono', 'monospace'],
        mono: ['IBM Plex Mono', 'monospace'],
        serif: ['IBM Plex Serif', 'serif'],
      },
      fontSize: {
        // Hero
        'hero': 'clamp(3rem, 10vw, 10rem)',
        'hero-sub': 'clamp(1.25rem, 2.5vw, 2rem)',

        // Sections
        'section': 'clamp(2rem, 6vw, 5rem)',
        'section-sub': 'clamp(1.25rem, 2vw, 1.75rem)',

        // Body
        'body-lg': 'clamp(1.125rem, 1.5vw, 1.375rem)',
        'body': 'clamp(1rem, 1.25vw, 1.125rem)',
        'body-sm': 'clamp(0.875rem, 1vw, 1rem)',

        // Utility
        'label': 'clamp(0.75rem, 0.9vw, 0.875rem)',
        'mono-sm': '0.8125rem',
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
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
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
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#2c2823',
            '--tw-prose-headings': '#1a1814',
            '--tw-prose-lead': '#2c2823',
            '--tw-prose-links': '#c5482a',
            '--tw-prose-bold': '#1a1814',
            '--tw-prose-counters': '#6b6760',
            '--tw-prose-bullets': '#6b6760',
            '--tw-prose-hr': 'rgba(26, 24, 20, 0.16)',
            '--tw-prose-quotes': '#1a1814',
            '--tw-prose-quote-borders': '#c5482a',
            '--tw-prose-code': '#1a1814',
            '--tw-prose-pre-code': '#faf7ee',
            '--tw-prose-pre-bg': '#1a1814',
            '--tw-prose-th-borders': 'rgba(26, 24, 20, 0.16)',
            '--tw-prose-td-borders': 'rgba(26, 24, 20, 0.08)',
            maxWidth: 'none',
            a: {
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.875em',
            },
            'pre code': {
              fontFamily: 'IBM Plex Mono, monospace',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
