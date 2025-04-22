import { Page,Locator } from "@playwright/test";
import { generateRandomPassword } from '../utils/helpers';

export class CreateAccountPage{
    readonly page: Page;
    readonly titleMrRadioCheck: Locator;
    readonly titleMrsRadioCheck: Locator;
    readonly firstNameInput: Locator;
    readonly LastNameInput: Locator;
    readonly passwordInput: Locator;
    readonly daySelect: Locator;
    readonly monthsSelect: Locator;
    readonly yearsSelect: Locator;
    readonly newsLetterCheck: Locator;
    readonly registerButton: Locator;
    readonly createAccountLabel: Locator;
    readonly accountCreateSuccessLabel:Locator;


    constructor(page: Page)
    {
        this.page=page;
        this.titleMrRadioCheck = page.getByRole('radio', { name: 'Mr.' });
        this.titleMrsRadioCheck = page.getByRole('radio', { name: 'Mrs.' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First name *' });
        this.LastNameInput = page.getByRole('textbox', { name: 'Last name *' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
        this.daySelect = page.locator('#days');
        this.monthsSelect = page.locator('#months')
        this.yearsSelect = page.locator('#years');
        this.newsLetterCheck=page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
        this.registerButton=page.getByRole('button', { name: 'Register ' })
        this.accountCreateSuccessLabel =page.getByText('Your account has been created.');
    }


    async fillAccountCreationForm(title: string,firstName: string,lastName: string){
        if(title.match('Mr')){
            await this.titleMrRadioCheck.check();
        }else{
            await this.titleMrsRadioCheck.check();
        }
        
        await this.firstNameInput.fill(firstName);
        await this.LastNameInput.fill(lastName);
        await this.passwordInput.fill(generateRandomPassword())
        await this.daySelect.selectOption('17');
        await this.monthsSelect.selectOption('10');
        await this.yearsSelect.selectOption('1997');
        await this.newsLetterCheck.check();
        await this.registerButton.click();        
        }
}