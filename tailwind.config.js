module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        link: "#4887bf",
        "link-hover": "#6aa9df",
      },
    },
    screens: {
      sm: "425px",
      md: "672px",
    },
  },
  variants: {
    textColor: ["hover"],
    extend: {
      padding: ["first", "last"],
    },
  },
  plugins: []
}
