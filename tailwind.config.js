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
        'bg-primary': '#050505',
        'bg-secondary': '#0a0a0a',
        'bg-tertiary': '#111111',
        'bg-card': '#0d0d0d',

        // Text
        'text-primary': '#f5f5f5',
        'text-secondary': '#888888',
        'text-muted': '#555555',

        // Accent — warm amber
        'accent': '#f5a623',
        'accent-glow': 'rgba(245, 166, 35, 0.25)',
        'accent-dim': '#c4851c',

        // Frost (for future 3D effects)
        'frost': '#e0f7ff',
        'frost-dim': 'rgba(224, 247, 255, 0.1)',
      },
      fontFamily: {
        hero: ['Bebas Neue', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
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
            '--tw-prose-body': '#888888',
            '--tw-prose-headings': '#f5f5f5',
            '--tw-prose-lead': '#888888',
            '--tw-prose-links': '#f5a623',
            '--tw-prose-bold': '#f5f5f5',
            '--tw-prose-counters': '#555555',
            '--tw-prose-bullets': '#555555',
            '--tw-prose-hr': '#222222',
            '--tw-prose-quotes': '#f5f5f5',
            '--tw-prose-quote-borders': '#f5a623',
            '--tw-prose-code': '#f5f5f5',
            '--tw-prose-pre-code': '#f5f5f5',
            '--tw-prose-pre-bg': '#0a0a0a',
            '--tw-prose-th-borders': '#333333',
            '--tw-prose-td-borders': '#222222',
            maxWidth: 'none',
            a: {
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.875em',
            },
            'pre code': {
              fontFamily: 'JetBrains Mono, monospace',
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
