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
        "primary":"#7A1CAC",
        "secondary":"#AD49E1",
        "tertiary":"#3D0000",
        "accent":"#2E073F",
      },
      backgroundImage:{
        "bg1":"url('https://img.freepik.com/free-photo/empty-road-with-blacklight_400718-34.jpg')",
      }
    },
  },
  plugins: [],
}