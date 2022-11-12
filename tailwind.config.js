/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "550px",
      },
      colors: {
        background: "#efefef",
        secondaryBackground: "#ebeeee",
        errorBackground: "#ffc0cf",
        secondaryLine: "#dbdbdb",
        primary: "#2c2c2c",
        subtitle: "#707070",
        lightGrey: "#f1f1f1",
        input: "#9a9a9a",
        line: "#d2d2d2",
        tag: "#8f8f8f",
        error: "#bf0d12",
      },
      fontSize: {
        tiny: "0.625rem",
        header: "2.65rem",
        title: "1.625rem",
      },
      transitionDuration: {
        400: "400ms",
      },
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
