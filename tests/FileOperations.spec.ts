import { test } from '../fixtures/FileFixture';

test('Testing File Operations', async ({ tempFile }) => {
    console.log(`Using file ${tempFile}`);
});

test('Generating random number', async ({ OTPGenerator }) => {
    console.log(`Random Number Generated is ${OTPGenerator}`);
});


