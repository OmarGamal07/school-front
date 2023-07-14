/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens: {
      'xxs': '150px' ,
      // => @media (min-width: 150px) { ... }
  
      'xs': '300px' ,
      // => @media (min-width: 300px) { ... }
  
      'msm': '440px' ,
      // => @media (min-width: 400px) { ... }
  
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
  
      'md': '768px',
      // => @media (min-width: 768px) { ... }
  
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
  
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
  
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [],
}

