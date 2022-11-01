const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1500,
  viewportHeight: 900,
  e2e: {
    baseUrl: "https://fly.customer.io"
  },
});
