/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      black: "#000",
      blue: "#1fb6ff",
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
      "variant-secondary-blue": "#35316E",
      "variant-pink": "#E61A6B",
      "variant-wenge": "#655560",
      "variant-black": "#333333",
      "variant-beige": "#FFC4BC",
      "variant-secondary-beige": "#FFDCD7"
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
  },
  plugins: [],
};
