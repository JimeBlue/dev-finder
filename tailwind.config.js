/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0079ff',

        blue: {
          100: '#f6f8ff',
          500: '#4b6a9b',
          900: '#1e2a47',
        },
        gray: {
          900: '#141d2f',
        },
        'blue-gray': {
          300: '#90a4d4',
          400: '#697c9a',
          800: '#2b3442',
        },
        neutral: {
          50: '#fefefe',
        },
      },
      fontFamily: {
        sans: [
          'Space Mono',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  darkMode: 'class', // Enable class-based dark mode
  plugins: [],
}
