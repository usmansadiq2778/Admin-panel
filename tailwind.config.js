/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ghostwhite: "#f4f7fd",

        "main-purple": "#635fc7",
        black: "#000112",
        white: "#fff",
        "medium-grey": "#828fa3",
        aquamarine: "#67e2ae",
        mediumslateblue: "#8471f2",
        skyblue: "#49c4e5",
        "very-dark-grey-dark-bg": "#20212c",
        "dark-grey": "#2b2c37",
        "lines-dark": "#3e3f4e",
        lightslategray: "rgba(130, 143, 163, 0.25)",
        black1: "#000",
      },
      spacing: {},
      fontFamily: {
        "heading-l": "'Plus Jakarta Sans'",
      },
      borderRadius: {
        "81xl": "100px",
        xl: "20px",
      },
    },
    fontSize: {
      lg: "18px",
      "5xl": "24px",
      xs: "12px",
      mini: "15px",
      smi: "13px",
      inherit: "inherit",
    },
  },
  plugins: [],
};
