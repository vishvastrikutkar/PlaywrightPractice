import {test as baseTest} from '@playwright/test'

type fileFixture = {userRole: string}

export const test = baseTest.extend<fileFixture>({
userRole: async({},use)=>
    {
        const role = process.env.ROLE || 'Employee'
        console.log(`Setting up user with role: ${role}`);
        await use(role);
    }
});
