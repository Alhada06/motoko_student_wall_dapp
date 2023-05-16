/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:['class','[data-theme="night"]'],
  content: ['./index.html', './src/motoko_student_wall_dapp_frontend/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled:true,
    themes: ['winter','night','light'],
    darkTheme: "night",
  }
}
