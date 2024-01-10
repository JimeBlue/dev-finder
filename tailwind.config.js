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
        blue: {
          100: '#f6f8ff',
        },
        gray: {
          900: '#141d2f',
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
