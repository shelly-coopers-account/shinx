/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: 'var(--blue)',
        'dark-blue': 'var(--dark-blue)',
        'gray-blue': 'var(--gray-blue)',
        gray: 'var(--gray)',
        green: 'var(--green)',
        red: 'var(--red)',
        yellow: 'var(--yellow)',
      },
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        label: 'clamp(1rem, 2vw, 1.25rem)',
        'title-1': 'clamp(1.5rem, 3vw, 2.5rem)',
        'title-2': 'clamp(1.3rem, 2vw, 2rem)',
        'title-3': 'clamp(1.125rem, 2vw, 1.5rem)',
        'body-1': 'clamp(0.875rem, 1.5vw, 1rem)',
        'body-2': 'clamp(1.01rem, 2vw, 1.25rem)',
        caption: '12px',
      },
      textColor: {
        primary: 'var(--txt-primary)',
        secondary: 'var(--txt-secondary)',
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        select: 'var(--select)',
      },
      zIndex: {
        modal: 1500,
        popup: 1499,
        layout: 1498,
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
