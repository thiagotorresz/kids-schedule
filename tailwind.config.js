/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f5f5fa',
          900: '#1e1e38',
        },
        turquoise: {
          50: '#e6fff9',
          900: '#0d9488',
        },
      },
    },
  },
  plugins: [],
};