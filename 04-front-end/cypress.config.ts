import { defineConfig } from 'cypress';
import { appConfiguration } from './src/config/app.config';

export default defineConfig({
    e2e: {
        baseUrl: appConfiguration.localhost.baseUrl,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
