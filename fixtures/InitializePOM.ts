import { test
   as baseTest, Page} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { CreateAccountPage } from '../pages/createAccountPage';

type pages ={
  homePage: HomePage, 
  createAccountPage: CreateAccountPage, 
  page: Page}

export const test = baseTest.extend<pages>({
    homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await use(homePage);
  },
    createAccountPage: async ({ page }, use) => {
    const createAccountPage = new CreateAccountPage(page);
    await use(createAccountPage);
  },
    page: async({page},use)=>{
    await use(page);
  }
});