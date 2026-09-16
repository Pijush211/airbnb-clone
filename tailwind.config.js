/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        airbnb: {
          red: '#FF385C',
          darkRed: '#D70466',
          gradientStart: '#E61E4D',
          gradientEnd: '#D70466',
          charcoal: '#222222',
          secondary: '#717171',
          border: '#DDDDDD',
          lightBg: '#F7F7F7'
        }
      },
      fontFamily: {
        sans: ['Circular', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'airbnb': '0 6px 16px rgba(0,0,0,0.12)',
        'airbnb-hover': '0 6px 20px rgba(0,0,0,0.18)',
        'card': '0 6px 16px 0 rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
}
