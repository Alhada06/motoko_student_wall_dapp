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
    themes: [{winter:{...require('daisyui/src/colors/themes')['[data-theme=winter]'],
    "base-100":"#e2e8f0",
    "base-200":"#cbd5e1",
    "base-300":"#94a3b8"
  
  
  }},'night'],
    darkTheme: "night",
  }
}
