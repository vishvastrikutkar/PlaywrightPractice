import { defineConfig, devices } from '@playwright/test';
import globalSetupMethod from './tests/globalSetup';
import { dot } from 'node:test/reporters';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const testDir = {normal:'./tests',extended:'./tests'}[process.env.testType||'normal']
export const role= process.env.ROLE||'Trainee';

export default defineConfig({
  testDir,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  reporter: [
    ['monocart-reporter', {
      outputFolder: 'monocart-report',  // Customize the report folder
      autoOpen: true,                   // Automatically open the report after test execution
      enableScreenshots: true,          // Capture screenshots on failure
      enableTracing: true,              // Enable tracing for detailed reports
      enableAttachments: true,          // Include attachments like logs/screenshots
    }],
    ['html'],
    ['junit', { outputFile: 'JUNIT_results.xml' }],
    ['json', { outputFile: 'JSON_test-results.json' }],
    /*['allure-playwright',
      {
        detail: true,
        suiteTitle: false
      }
    ] */   

  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  use: {    
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: process.env.BASE_URL || 'https://dev.example.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
    // FULSCREEN SETTING
    launchOptions:{
      args:['--start-maximized']
    },
    
    trace:'off',
    screenshot: 'on',
    video: 'retain-on-failure',
    headless:true
  },

  globalSetup: './tests/globalSetup.ts',
  globalTeardown: './tests/globalTeardown.ts',

  /* Configure projects for major browsers */
  projects: [
    // FULLSCREEN SETTING
    { name: 'chromium', use: { viewport: null}},
    //{ name: 'chromium', use: { ...devices['Desktop Chrome'],acceptDownloads:true},},
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }},
    { name: 'webkit', use: { ...devices['Desktop Safari'] },},
    { name: 'setup', testMatch: 'setup.ts',},
    { name: 'smoke', dependencies: ['setup'], testMatch:'EPAMTests.spec.ts',},

    /* Test against mobile viewports.
    {
       name: 'Mobile Chrome',
       use: { ...devices['Pixel 5'] },
    },
    {
       name: 'Mobile Safari',
       use: { ...devices['iPhone 15'] },
    },
    */
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
