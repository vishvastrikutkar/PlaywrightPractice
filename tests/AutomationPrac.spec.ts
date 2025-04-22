import { expect } from '@playwright/test';
import { test } from '../fixtures/InitializePOM';
import { generateRandomEmail } from '../utils/helpers';
import { generateRandomString } from '../utils/helpers'

// test.describe('Automation Practice Test Suite',()=>{
// let homePage: HomePage;
// let createAccountPage: CreateAccountPage;

// test.beforeEach(async({page})=>{
//     homePage = new HomePage(page);
//     createAccountPage = new CreateAccountPage(page);
//     await homePage.navigate();
// })


test.describe('Automation Practice Test Suite', { annotation: { type: 'test', description: 'test describe' }, tag: ['@smoke', '@regression'] }, () => {
    test.describe.configure({ mode: 'parallel' })
    test("create new account", async ({ homePage, createAccountPage, page },testInfo) => {

        await homePage.gotoSignIn();
        const title = await page.evaluate(homePage.extractTitle);
        console.log(title);

        expect(page.url()).toContain('my-account');
        
        // Page Screenshot at test level
        const screenshotPath = `test-results/${testInfo.title}-screenshot.png`;
        console.log(screenshotPath);
        await page.screenshot({ path: screenshotPath})

        // Attach it to the Playwright report
        testInfo.attach('Screenshot', {
            path: screenshotPath,
            contentType: 'image/png'
        });

        await test.step("Create New Account -> Enter Email ID", async () => {
            const userEmailID = generateRandomEmail();
            homePage.createNewAccount(userEmailID);
            await expect(homePage.accountCreationForm).toBeVisible();
        })

        const firstName = generateRandomString();
        const lastName = generateRandomString();
        createAccountPage.fillAccountCreationForm('Mr', firstName, lastName);

        await createAccountPage.accountCreateSuccessLabel.waitFor({ state: 'visible', timeout: 10000 });
        await createAccountPage.accountCreateSuccessLabel.screenshot({path:'test-results/AccountCreateMessageLabel.png'})

        // Attach it to the Playwright report
        testInfo.attach('Screenshot', {
            path: 'test-results/AccountCreateMessageLabel.png',
            contentType: 'image/png'
        });

        await expect(createAccountPage.accountCreateSuccessLabel).toBeVisible();
        console.log("Account Created successfully");
    })

    test('Search for "dress"', async ({ homePage, page }) => {
        await homePage.searchForItem('dress');
        const headingText = await homePage.searchResultHeadingLabel.textContent();
        //console.log('Heading Text:', headingText);
        await expect(homePage.searchResultHeadingLabel).toContainText('dress');
    });

    test('Mobile view: Search functionality', async ({ homePage, page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await homePage.navigate();
        await homePage.searchForItem('t-shirt');
        await expect(homePage.searchResultHeadingLabel).toContainText('t-shirt');
    });

});