/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      
    },
    screens: {
      'xxs':'10px',

      'xs': '400px',

      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',

      '3xl' : '2000px',
      
      '4xl' : '2460px',

      '5xl' : '3000px',
    },
    
  },
  
  plugins: [

  ],
  variants: {
    extend: {
      display: ['group-focus']
    }
  }
  

}
