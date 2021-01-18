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
      md: "672px",
    },
  },
  variants: {
    textColor: ["hover"],
  },
  plugins: [],
};
