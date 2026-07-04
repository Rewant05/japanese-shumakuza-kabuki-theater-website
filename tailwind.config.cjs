/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '"Yu Gothic"', '"Hiragino Kaku Gothic ProN"', 'Meiryo', 'system-ui', 'sans-serif'],
        serif: ['"Yu Mincho"', '"Hiragino Mincho ProN"', '"Noto Serif JP"', 'serif'],
      },
    },
  },
  plugins: [],
};
