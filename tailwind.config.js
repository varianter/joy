/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      black: "#000",
      gray: "#8492a6",
      white: "#fafaf6",
      "variant-gray": "#C4CAD0",
      "variant-dark-gray": "#332726",
      "variant-blue": "#423D89",
      "variant-blue-2": "#35316E",
      "variant-blue-3": "#736EBE",
      "variant-blue-4": "#B7B4DE",
      "variant-pink": "#E61A6B",
      "variant-pink-2": "#EB4889",
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
      sans: ['"Graphik-Regular"', "system-ui"],
      serif: ['"Recoleta-Regular"', "ui-serif"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
    screens: {
      xxs: "325px",
      xs: "425px",
      sm: "600px",
      smmd: "750px",
      md: "960px",
      lg: "1440px",
      xl: "2400px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
