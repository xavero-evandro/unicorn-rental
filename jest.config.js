module.exports = {
  collectCoverageFrom: ["src/**/*.{ts, js}"],
  globals: {
      "ts-jest": {
          tsConfig: "tests/tsconfig.json"
      }
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["**/tests/**/*.spec.(ts)"],
  testEnvironment: "node"
};
