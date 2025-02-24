const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    env: {
      username: "user_DATE",
      password: "Test@123"
    }
  }
});