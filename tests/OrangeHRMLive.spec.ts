import { test, expect } from '../fixtures/CustomFixtures';
//import { expect } from '@playwright/test';
import { OrangeHRMLoginPage } from '../pages/OrangeHRMLoginPage';
import { OrangeHRMForgotPasswordPage } from '../pages/OrangeHRMForgotPasswordPage'


test.describe.serial("This is Orange HRM Test Suite", { annotation: { type: 'test', description: 'test describe' }, tag: ['@OrangeSmoke', '@ORangeRegression'] }, () => {
    //test.describe.configure({mode: 'parallel'});
    test('Dashboard should load after login', async ({ loggedInPage }) => {
        await loggedInPage.locator('h6').waitFor({ state: 'attached' })
        await expect(loggedInPage.locator('h6')).toHaveText('Dashboard');
        await expect(loggedInPage).toHaveURL(/.*dashboard/);
    });

    test('Verify Admin navigation after login', async ({ loggedInPage,navigateToAdmin }) => {
        //await loggedInPage.click('a:has-text("Admin")');
        await expect(navigateToAdmin).toHaveURL(/.*admin/);
        // Verify the Admin page is displayed
        await expect(navigateToAdmin.getByRole('heading', { name: '/ User Management' })).toBeVisible();
    })

    test('Navigate to Forgot Password screen', async ({ navigateToLogin }) => {
        const orangeHRMLoginPage = new OrangeHRMLoginPage(navigateToLogin);
        const orangeHRMForgotPasswordPage = new OrangeHRMForgotPasswordPage(navigateToLogin);

        await orangeHRMLoginPage.clickForgotPassword();
        await expect(navigateToLogin).toHaveURL(/.*requestPasswordResetCode/);

        await expect(orangeHRMForgotPasswordPage.cancelButton).toBeVisible();
        await expect(orangeHRMForgotPasswordPage.resetPasswordButton).toBeVisible();
    });

    test('Get all Employee user name from Admin tab', async ({ navigateToAdmin }) => {
        await navigateToAdmin.getByRole('link', { name: 'Admin' }).click();

        const names: string[] = [];
        // Get all rows from the table
        let rows = navigateToAdmin.getByRole('row');

        // Lets wait for table to load completely.
        await rows.first().waitFor({ state: 'attached' });
        // Now get the cells to fetch employee names

        for(const row of await rows.all())
        {
            let nameCell = (await row.getByRole('cell').all()).at(3);
            let employeeName = await nameCell?.textContent();
            if(employeeName)
                names.push(employeeName);
        }
        
        // map doesnt repl
        // (await rows.all()).map(async (row) => {
        //     let nameCell = (await row.getByRole('cell').all()).at(3);
        //     let employeeName = await nameCell?.textContent();
        //     if (employeeName)
        //         names.push(employeeName);
            
        // })
        console.log(names)
    });

    test('Delete User Flow Verification from Admin scree', async ({ navigateToAdmin }) => {

        await navigateToAdmin.getByRole('link', { name: 'Admin' }).click();

        // Get all rows from the table
        let rows = navigateToAdmin.getByRole('row');

        // Lets wait for table to load completely.
        await rows.first().waitFor({ state: 'attached' });

        let rowCount = await rows.count();
        // Alwaye try to delete row which is last but one
        if (rowCount > 2) {
            await rows.nth(rowCount - 2).locator('button[type=button]').first().click();
        } else {
            console.log("Nothing to Delete..")
        }

        // Delete row with perticular text
        //await rows.filter({hasText:/Ahalya/}).locator('button[type=button]').first().click();

    });

    test('Edit User Flow Verification', async ({ loggedInPage }) => {

        
        await loggedInPage.getByRole('link', { name: 'Admin' }).click();

        // Get all rows from the table
        let rows = loggedInPage.getByRole('row');

        // Lets wait for table to load completely.
        await rows.first().waitFor({ state: 'attached' });

        let rowCount = await rows.count();
        // Alwaye try to delete row which is last but one
        if (rowCount > 2) {
            await rows.nth(rowCount - 2).locator('button[type=button]').first().click();
        } else {
            console.log("Nothing to Delete")
        }

        // Delete row with perticular text
        //await rows.filter({hasText:/Ahalya/}).locator('button[type=button]').first().click();

    });

});