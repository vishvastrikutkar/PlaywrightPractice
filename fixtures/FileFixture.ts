import {test as baseTest} from '@playwright/test'

type fileFixture = {tempFile: string, OTPGenerator: number}

export const test = baseTest.extend<fileFixture>({
tempFile: async({},use)=>{
    console.log("Setting up file for use...");
    const filePath = 'temp-test-file.txt';
    await use(filePath);
    // Teardown
    console.log("Deleting file now...")
    await deleteFile(filePath)
},
OTPGenerator: async({},use)=>{
    console.log("Generating random number....");
    const max = 100000
    const min = 900000
    let randomNumber:number = Math.floor(max+Math.random()*min);
    await use(randomNumber);
}
});

async function deleteFile(fileName:string) {
    console.log(`File ${fileName} deleted`);
    
}
