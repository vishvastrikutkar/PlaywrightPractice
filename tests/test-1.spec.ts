import { test, expect } from '@playwright/test';

test.fixme('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).press('Shift+Tab');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  
  
  // console.log(await rows.count());
  // for(const row of await rows.all())
  // {
  //   let cells = row.getByRole('cell');
  //   console.log(await cells.count());
  //   for(const cell of await cells.all())
  //   {
  //     console.log(await cell.allInnerTexts());
  //   }
  // }
  const names:string[]=[];
  let rows = page.getByRole('row');
  await rows.first().waitFor({state:'attached'});
  (await rows.all()).map(async(row)=>{
    let nameCell = (await row.getByRole('cell').all()).at(3);
    let t = await nameCell?.textContent();
    if(t)
    names.push(t);
    console.log(names)
    })

  //await rows.filter({hasText:/Qwerty/}).getByRole('button').first().click();
 // await rows.filter({hasText:/Ahalya/}).locator('button[type=button]').first().click();

});