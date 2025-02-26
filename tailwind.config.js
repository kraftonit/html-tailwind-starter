/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{njk,js}",
    "./src/templates/**/*.{njk,js}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#CCDEFA",
          200: "#99BCF5",
          300: "#669BF0 ",
          400: "#3379EB",
          500: "#0058E6",
          600: "#0046B8",
          700: "#00358A",
          800: "#00235C",
          900: "#00122E",
        },
        secondary: {
          100: "#FEF5CC",
          200: "#FDEB99",
          300: "#FCE166",
          400: "#FBD733",
          500: "#FACD00",
          600: "#C8A400",
          700: "#967B00",
          800: "#645200",
          900: "#322900",
        },
        shades: {
          black: "#242E45",
          white: "#FFFFFF",
        },
        gray: {
          100: "#E7E7EA",
          200: "#CFCFD6",
          300: '#B7B8C1',
          400: "#9FA0AD",
          500: '#878898',
          600: '#6C6D7A',
          700: '#51525B',
          800: '#36363D',
          900: '#1B1B1E',
        },
      },  
      borderRadius: {
        'xlg': '10px',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      container: {
        center: true,
        screens: {
          DEFAULT: "1170px",
          sm: "100%",
        },
        padding: {
          DEFAULT: "1.5rem",
          sm: "1.5rem",
        },
      },
    },
  },
  plugins: [],
}

