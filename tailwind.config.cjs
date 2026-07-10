/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/views/**/*.{ts,tsx}', './src/config/**/*.{ts,tsx}'],
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
