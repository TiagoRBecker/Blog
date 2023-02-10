module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blueC:"#1E90FF",
        greenC:"#40E0D0",
        blueC2:"#4169E1",
        

      },
      width:{
        customW:"48%"
      }
    },
    screens: {
      'cel': {'max':'640px'},
      // => @media (min-width: 640px) { ... }
      'tablet': {'max':'800px' },
      'desktop': {'max':'1024px'},
      // => @media (min-width: 1024px) { ... }

      'pc': {'max': '1280px'},
      // => @media (min-width: 1280px) { ... }
    },
 
  },
  plugins: [],
}