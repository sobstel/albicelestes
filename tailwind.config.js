module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
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
  plugins: [require("tailwind-scrollbar-hide")],
};
