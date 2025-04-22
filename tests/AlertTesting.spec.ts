import { test, expect, chromium } from '@playwright/test';
import { exec } from 'child_process';
import path from 'path';

let server;

test.describe.fixme("Alert Test Suite", async () => {

    test.beforeAll(async () => {
        // Start HTTP server before running tests
        server = exec('http-server -p 8080', { cwd: path.resolve(__dirname, '../WebPage') });

        server.stdout.on('data', (data) => console.log(`Server: ${data}`));
        server.stderr.on('data', (data) => console.error(`Error: ${data}`));

        // Wait a bit to ensure the server starts
        await new Promise(resolve => setTimeout(resolve, 2000));
    });

    test.afterAll(() => {
        // Stop the server after tests
        server.kill();
    });

    test('Alert Dialog Test', async ({ }) => {

        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('http://localhost:8000/AlertPage.html');
        await expect(page).toHaveTitle(/Alert Page/);

        page.on('dialog', async (dialog) => {
            console.log(`Dialog Message: ${dialog.message()}`);
            if (dialog.type() === 'prompt') {
                await dialog.accept('Playwright User'); // Enter value in prompt
            } else {
                await dialog.accept(); // Accept alert & confirm
            }
        });

        await page.click('#alert-btn');   // Handle alert
        await page.click('#confirm-btn'); // Handle confirm
        await page.click('#prompt-btn');  // Handle prompt

        const [popup] = await Promise.all([
            context.waitForEvent('page'), // Waits for the popup
            page.click('#popup-btn')      // Clicks to open a popup
        ]);
        await popup.waitForLoadState();
        console.log(`Popup Title: ${await popup.title()}`);
        await popup.close(); // Close popup window

        await page.click('#open-modal');  // Open the modal
        await page.locator('.modal').waitFor(); // Wait for modal to be visible
        await page.locator('.close-btn').click(); // Close modal

        await browser.close();
    })
});