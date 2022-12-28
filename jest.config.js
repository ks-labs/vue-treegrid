module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  setupFiles: ["./source/setup-jest.js"],
};
