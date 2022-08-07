/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#efefef",
        primary: "#2c2c2c",
        text: "#707070",
      },
      fontSize: {
        tiny: "0.625rem",
      },
    },
  },
  plugins: [],
};
