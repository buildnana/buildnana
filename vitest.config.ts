import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        name: "BUILDNANA.js",
        environment: "puppeteer",
        globalSetup: "vitest-environment-puppeteer/global-init",
        fileParallelism: false,
        typecheck: {
            ignoreSourceErrors: true,
            tsconfig: "./tests/tsconfig.json",
        },
    },
});
