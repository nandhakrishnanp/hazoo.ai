/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Montserrat":['Montserrat', 'serif'],
        "Inter":['Inter', 'serif'],
        "Popin":["Poppins", "serif"],
      },
      colors:{
        "primary":"#FF0000",
        "secondary":"#950101",
        "tertiary":"#3D0000",
        "accent":"#000000",
      },
      backgroundImage:{
        "bg1":"url('https://img.freepik.com/free-photo/empty-road-with-blacklight_400718-34.jpg')",
      }
    },
  },
  plugins: [],
}