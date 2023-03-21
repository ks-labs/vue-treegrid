module.exports = {
  preset: "jest-puppeteer",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  globalSetup: "./tests/setup.js",
  globalTeardown: "./tests/teardown.js",
  testEnvironment: "./tests/puppeteer_env.js",
  setupFiles: ["./source/setup-jest.js"],
};
