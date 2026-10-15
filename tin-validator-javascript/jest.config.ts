import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  testMatch: [
    "**/__tests__/**/*.test.ts",
    // "**/?(*.)+(spec|test).(ts|tsx)"
  ],

  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }]
  },

  moduleFileExtensions: ["ts", "tsx", "js", "json"],

  clearMocks: true,

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts"
  ],

  coverageDirectory: "coverage",

  testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};

export default config;