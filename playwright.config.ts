import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:8000";
const useDockerServer = process.env.CI_DOCKER === "true";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: useDockerServer
    ? undefined
    : {
        command: "python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000",
        url: `${baseURL}/health`,
        reuseExistingServer: true,
        timeout: 120000,
      },
});
