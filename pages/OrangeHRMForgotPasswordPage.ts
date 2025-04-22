import { Page,Locator } from "@playwright/test";
import { locators } from "./locators.json";

export class OrangeHRMForgotPasswordPage{
    readonly page: Page;
    readonly userName: Locator;
    readonly cancelButton: Locator;
    readonly resetPasswordButton: Locator;
    constructor(page: Page)
    {
        this.page=page;
        this.userName = page.getByRole('textbox', { name: 'Username' });
        this.resetPasswordButton = page.getByRole('button', { name: 'Reset Password' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }
}