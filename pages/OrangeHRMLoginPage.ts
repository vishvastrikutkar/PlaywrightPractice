import { Page,Locator } from "@playwright/test";

export class OrangeHRMLoginPage{
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly forgotPassword: Locator;
    readonly adminLink: Locator;
    constructor(page: Page)
    {
        this.page=page;
        this.userName = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.forgotPassword = page.getByText('Forgot your password?');
    }

    async loginToPortal(username: string,password: string){
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();        
    }

    async clickForgotPassword() {
        await this.forgotPassword.click();
    }
}