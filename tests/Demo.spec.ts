import { test, expect, chromium } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Go to Shopping');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Feed the dog');
  await page.getByRole('checkbox', { name: '❯Mark all as complete' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('listitem').filter({ hasText: 'Feed the dog' }).getByLabel('Toggle Todo').check();
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await page.goto('https://demo.playwright.dev/todomvc/#/completed');
  
});

test("This is sample test with multiple tabs",
  async({browserName})=>
  {
    console.log(browserName);
    const browserInstance = await chromium.launch();
    const context1 = await browserInstance.newContext();
    const page1 = await context1.newPage();
    await page1.goto("https://www.google.com");
    const page2 = await context1.newPage();
    await page2.goto("https://www.yahoo.com");
  }
);