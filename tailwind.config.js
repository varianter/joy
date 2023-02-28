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
