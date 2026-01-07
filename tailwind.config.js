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
        // Core black and white
        'primary-black': '#0A0A0A',
        'primary-white': '#FFFFFF',

        // Grayscale palette
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

        // Accent colors for minimal use
        accent: {
          light: '#F5F5F5',
          dark: '#0A0A0A',
        },

        // System colors
        success: '#00C853',
        error: '#FF3B30',

        // Background colors
        bg: {
          primary: '#0A0A0A',
          secondary: '#171717',
          tertiary: '#262626',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        geist: ['Geist', 'sans-serif'],
        arial: ['Arial', 'sans-serif'],
      },
      boxShadow: {
        meteor: '0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em #9FF279',
      },
      fontSize: {
        sizeSm: 'clamp(0.8rem, 0.17vi + 0.76rem, 0.89rem)',
        sizeBase: 'clamp(1rem, 0.34vi + 0.91rem, 1.19rem)',
        sizeLg: 'clamp(1.25rem, 0.61vi + 1.1rem, 1.58rem)',
        sizeXl: 'clamp(1.56rem, 1vi + 1.31rem, 2.11rem)',
        size2xl: 'clamp(1.95rem, 1.56vi + 1.56rem, 2.81rem)',
        size3xl: 'clamp(2.44rem, 2.38vi + 1.85rem, 3.75rem)',
        size4xl: 'clamp(3.05rem, 3.54vi + 2.17rem, 5rem)',
        size5xl: 'clamp(3.81rem, 5.18vi + 2.52rem, 6.66rem)',
        size6xl: 'clamp(4.77rem, 7.48vi + 2.9rem, 8.88rem)',
      },
      borderCustom: {
        guides: '1px solid #027333',
      },
      gridTemplateColumns: {
        skills: 'repeat(2, minmax(140px, 200px))',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
