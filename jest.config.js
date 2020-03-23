module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/*.test.ts"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  globals: {
    "ts-jest": {
      diagnostics: true,
      tsConfig: "tsconfig.json",
    },
  },
  modulePaths: ["<rootDir>"],
};
