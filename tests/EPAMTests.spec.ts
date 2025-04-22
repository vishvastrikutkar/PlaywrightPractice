import { test, expect } from "@playwright/test";

// This applied to all tests in this scope. 
// It is set to run tests in serial mode with 2 retries and test timeout set to 30 sec
test.describe.configure({ mode: 'parallel', retries: 2, timeout: 30000 });

test.describe('EPAM Test Suite', () => {
    // Setting previously saved storage state to open a page with already accepted cookies
    test.use({storageState: 'state.json'});

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.epam.com/');
    })

    async function openWebSiteAndVerifyTitle({page})
    {
        // Get the title and print it.
        var test = await page.title();
        console.log(test)

        await expect(page).toHaveTitle('EPAM | Software Engineering & Product Development Services  ');
    }

    test('Should open EPAM Website and verify title', openWebSiteAndVerifyTitle);

    test('Should open Hamburger Menu for the website', async ({ page }) => {
        await page.locator('.hamburger-menu__button').click()
        await expect(page.locator('div.hamburger-menu__dropdown-section')).toBeVisible();
    })


    // test.only() will run only this test case from this suite. Nothing else will be executed except this.
    /*test.only('Title Verification for EPAM Website only',async({page})=>{
    
        // Get the title and print it.
        var test = await page.title();
        console.log(test)
        
        await expect(page).toHaveTitle('EPAM | Software Engineering & Product Development Services  ');
        });*/

    // This will skipp this test
    /*test.skip('Title Verification for EPAM Website only', async ({ page }) => {

        // Get the title and print it.
        var test = await page.title();
        console.log(test)

        await expect(page).toHaveTitle('EPAM | Software Engineering & Product Development Services  ');
    });*/

});