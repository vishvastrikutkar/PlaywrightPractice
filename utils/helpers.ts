export function generateRandomEmail(): string{
    const emailProvider ='@example.com';
    const randomString = Math.random().toString(36).substring(2, 15);
 //   console.log('testUser_'+randomString+emailProvider);
    return 'testUser_'+randomString+emailProvider;
}

export function generateRandomPassword(): string{
    const randomPassword = Math.random().toString(36).substring(2, 15);
   // console.log(randomPassword);
    return randomPassword;
}

export function generateRandomString(): string {
    const randomString = generateRandomAlphaString(4); // Generate a string of 13 alphabetic characters
    const result = 'testuser' + randomString;
    //console.log(result);
    return result;
}

function generateRandomAlphaString(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz'; // Characters to choose from
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

