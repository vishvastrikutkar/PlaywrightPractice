import { test, expect, chromium, firefox, webkit } from '@playwright/test';


test.describe("This is example test suite",()=>{
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  //await expect(page).toHaveScreenshot();
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get Star' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  
});

test('This is sameple test',async()=>{
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

await page.goto('https://www.google.com');
console.log(await page.title());
await browser.close();

});

test('This is multi Context test',async()=>{

  const browser = await firefox.launch();
  const context1 = await browser.newContext();
  const context2 = await browser.newContext();

  const page1 = await context1.newPage();
  await page1.goto('https://www.google.com');
  console.log(await page1.title());

  const page2 = await context2.newPage();
  await page2.goto('https://www.epam.com');
  console.log(await page2.title());

  await browser.close();

});

test('This is multi tabs test - Chromium',async()=>{

  // Launch browser in visible mode
  const browser = await chromium.launch({ headless: true });

  // Create a single context (shared session)
  const context = await browser.newContext();

  // Open first tab (page1)
  const page1 = await context.newPage();
  await page1.goto('https://example.com');
  console.log('Tab 1 Title:', await page1.title());

  // Open second tab (page2) in the same context
  console.log(await browser.version())

  const page2 = await context.newPage();
  await page2.goto('https://google.com');
  console.log('Tab 2 Title:', await page2.title());

  // Switch back to Tab 1 and take a screenshot
  await page1.bringToFront();  // Bring Tab 1 to the foreground
  await page1.screenshot({ path: 'tab1_screenshot.png' });

  // Wait to observe behavior
  await page1.waitForTimeout(5000);
  
  // Close browser
  await browser.close();

})
});