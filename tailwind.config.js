/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    colors: {
      ...colors,
      primary: {
        400: "#942F70",
        200: "#FEF452",
      },
      darkBlue: {
        400: "#14597A",
      },
    },
    extend: {
      textColor: "#344054",
    },
  },
  plugins: [require("flowbite/plugin")],
};
