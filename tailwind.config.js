/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — trustworthy indigo + warm amber accent
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',  // Primary
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',  // Warm amber
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        neutral: {
          50:  '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        success: '#16a34a',
        warning: '#ca8a04',
        error:   '#dc2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Slightly larger scale for accessibility / low-literacy users
        'xs':   ['0.8125rem',  { lineHeight: '1.25rem' }],
        'sm':   ['0.9375rem',  { lineHeight: '1.5rem'  }],
        'base': ['1.0625rem',  { lineHeight: '1.75rem' }],
        'lg':   ['1.1875rem',  { lineHeight: '1.875rem'}],
        'xl':   ['1.3125rem',  { lineHeight: '2rem'    }],
        '2xl':  ['1.5625rem',  { lineHeight: '2.125rem'}],
        '3xl':  ['1.9375rem',  { lineHeight: '2.375rem'}],
        '4xl':  ['2.4375rem',  { lineHeight: '2.75rem' }],
        '5xl':  ['3.0625rem',  { lineHeight: '1'       }],
      },
      borderRadius: {
        'xl':  '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        'card':  '0 2px 16px 0 rgba(99,102,241,0.08)',
        'card-hover': '0 8px 32px 0 rgba(99,102,241,0.16)',
        'nav':   '0 1px 0 0 #e5e7eb',
        'button':'0 2px 8px 0 rgba(79,70,229,0.25)',
      },
      spacing: {
        'touch': '3rem',   // 48px — minimum recommended touch target
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}
