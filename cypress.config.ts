const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
    // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
    await preprocessor.addCucumberPreprocessorPlugin(on, config);

    on("file:preprocessor", browserify.default(config));

    // Make sure to return the config object as it might have been modified by the plugin.
    return config;
}

module.exports = defineConfig({

    e2e: {
        specPattern: "**/**/*.feature",
        supportFile: 'cypress/support/index.js',
        fixture:'cypress/fixtures/*.json',
        "baseUrl": "https://demoqa.com",
        env: {
          username: "user_DATE",
          password: "Test@123"
        },
        "chromeWebSecurity": false,
        "video":true,
        "videoCompression": 0,
        "animationDistanceThreshold": 50,
        "pageLoadTimeout": 120000,
        "defaultCommandTimeout": 60000,
        "requestTimeout": 30000,
        "reporter": "mochawesome",
        "reporterOptions": {
            "overwrite": true
        },
        setupNodeEvents,
    },
});

