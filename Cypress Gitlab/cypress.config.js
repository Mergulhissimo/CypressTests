const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      env: {
        hideCredentials: true,
        requestMode: true,
      },
      experimentalRunAllSpecs: true,
  },
  video: false
});
