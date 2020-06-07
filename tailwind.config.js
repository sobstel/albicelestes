module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {},
    screens: {
      md: "672px",
    },
  },
  variants: {
    textColor: ["hover", "visited"],
  },
  plugins: [],
};
