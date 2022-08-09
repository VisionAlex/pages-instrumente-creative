/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#efefef",
        primary: "#2c2c2c",
        subtitle: "#707070",
        lightGrey: "#f1f1f1",
      },
      fontSize: {
        tiny: "0.625rem",
        header: "2.65rem",
        title: "1.875rem",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [],
};
