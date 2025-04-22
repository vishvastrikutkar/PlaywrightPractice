import { Page,Locator } from "@playwright/test";

export class HomePage{
    readonly page: Page;
    
    readonly signInButton: Locator;
    readonly searchButton: Locator;
    readonly searchInput: Locator;
    readonly emailCreateInput: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreationForm: Locator;
    readonly searchResultHeadingLabel: Locator;


    constructor(page: Page)
    {
        this.page=page;
        this.signInButton = page.locator('a.login');
        this.searchInput = page.locator('#search_query_top');
        this.searchButton = page.locator('button[name="submit_search"]');     
        this.emailCreateInput = page.locator('#email_create');
        this.createAccountButton = page.locator('#SubmitCreate');
        this.accountCreationForm = page.locator('#account-creation_form');
        this.searchResultHeadingLabel=page.locator('h1.page-heading')
    }

    async extractTitle() {
        return document.title;
    }
    async navigate(){
        await this.page.goto('http://www.automationpractice.pl/index.php');
    }

    async gotoSignIn(){
        await this.signInButton.click();
    }

    async createNewAccount(email: string)
    {
        await this.emailCreateInput.fill(email)
        await this.createAccountButton.click();
    }

    async searchForItem(item: string){
        await this.searchInput.fill(item);
        await this.searchButton.click();
    }
}