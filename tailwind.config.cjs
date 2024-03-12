/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      
      backgroundColor:{
      'formColor':'#282828'
      },

      backgroundImage: {
        'bgImg': "url('/src/assets/Images/background.jpeg')",
        'bgHome': "url('/src/assets/Images/Joker.jpg')",
      }
    },
    screens:{
    '2xsm':'320px',
    'xsm':'480px',
    'sm':'600px',
    'md':'768px',
    'lg':'1024px',
    'xl':'1280px',
    '2xl':'1536px'
    }
  },
  plugins: [require("daisyui")],
}
