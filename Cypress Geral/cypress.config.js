const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      env: {
        hideCredentials: true,
        //requestMode: true,
      },
  },
  video: false
});
