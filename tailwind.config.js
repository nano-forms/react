/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        "ghost-white": "#fafbfc",
        primary: "#fb6068",
        "primary-tint": "#fedfe1",
        secondary: "#3ea380",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
