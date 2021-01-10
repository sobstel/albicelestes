module.exports = {
  globals: {
    "ts-jest": {
      diagnostics: true,
      tsconfig: "tsconfig.jest.json",
    },
  },
  moduleFileExtensions: ["js", "ts", "tsx"],
  modulePaths: ["<rootDir>"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jsdom", // node
  testMatch: ["**/*.test.{ts,tsx}"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
