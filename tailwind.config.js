/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      black: "#000",
      blue: "#1fb6ff",
      red: "#FF0000",
      purple: "#7e5bef",
      pink: "rgba(244,2,144,1)",
      orange: "rgba(254,109,1,1)",
      green: "#00bf72",
      lime: "#a8eb12",
      yellow: "#ffc82c",
      gray: "#8492a6",
      lightgray: "#eee",
      white: "#fafaf6",
      "variant-white": "#FCF7FF",
      "variant-gray": "#C4CAD0",
      "variant-blue": "#423D89",
      "variant-blue-2": "#35316E",
      "variant-blue-3": "#736EBE",
      "variant-blue-4": "#B7B4DE",
      "variant-pink": "#E61A6B",
      "variant-pink-2": "#EB4889",
      "variant-wenge": "#655560",
      "variant-black": "#333333",
      "variant-beige": "#FFC4BC",
      "variant-beige-2": "#FFDCD7",
    },
    extend: {
      gridTemplateRows: {
        // Complex site-specific row configuration
        3: "200px minmax(900px, 1fr) 100px",
      },
    },
    fontFamily: {
      sans: ['"Open Sans"', "system-ui"],
      serif: ['"Playfair_Display"', "ui-serif"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }
      md: "960px",
      lg: "1440px",
    },
  },
  plugins: [],
};
