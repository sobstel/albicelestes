module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "@remix-run/eslint-config",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["simple-import-sort"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-namespace": "off",
    "no-console": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
