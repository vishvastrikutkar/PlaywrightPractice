import { test as baseTest, Page } from '@playwright/test';
import {OrangeHRMLoginPage } from '../pages/OrangeHRMLoginPage'

// Custom Datatype
type CustomFixtures = {
  loggedInPage: Page, 
  navigateToLogin: Page
  navigateToAdmin: Page
};

const LoginURL:string ='https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const userName:string ='Admin';
const password:string = 'admin123';

export const test = baseTest.extend<CustomFixtures>(
  {
    navigateToLogin: async({page},use)=>{
    // Navigate to login page
    await page.goto(LoginURL);
    await page.waitForLoadState("load");
    await use(page);
    page.close();
  },
  loggedInPage: async ({ navigateToLogin }, use) => {
    const loginPage = new OrangeHRMLoginPage(navigateToLogin);
    // Navigate to login page
    //await navigateToLogin.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.loginToPortal(userName,password);
    await use(navigateToLogin);
    //navigateToLogin.close();
  },
  navigateToAdmin: async({loggedInPage},use)=>{
    // Navigate to Admin page
     const adminLink = loggedInPage.getByRole('link', { name: 'Admin' });
     await adminLink.waitFor({state:"visible"});
     await adminLink.click();
     await use(loggedInPage);
   // loggedInPage.close();
  },
});

export { expect } from '@playwright/test';
