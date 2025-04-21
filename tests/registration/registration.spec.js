import { test, expect } from '@playwright/test';
import { RegistrationPage } from '/Users/ira/Desktop/PlaywrightTest/pages/registration.page.js';

test.describe('User Registration Tests', () => {
  let registrationPage;
  const timestamp = Date.now();
  const email = `aqa-${timestamp}@test.com`;

  const testData = {
    name: 'Ira',
    invalidName: 'I',
    lastName: 'Herashchenko',
    correctPassword: 'Password123',
    incorrectPassword: 'short',
    differentPassword: 'Different456',
    invalidEmail: 'invalid-email'
  };

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToRegistration();
  });

  test('Successful user registration', async () => {
    await registrationPage.fillRegistrationForm(
      testData.name,
      testData.lastName,
      email,
      testData.correctPassword,
      testData.correctPassword
    );
    
    await registrationPage.submitRegistration();
    await registrationPage.expectSuccessfulRegistration();
  });

  test('Empty Name field validation', async () => {
    await registrationPage.nameInput.focus();
    await registrationPage.fillRegistrationForm(
      '',
      testData.lastName,
      email,
      testData.correctPassword,
      testData.correctPassword
    );
    
    await registrationPage.expectNameError('Name required');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('Invalid Email validation', async () => {
    await registrationPage.fillRegistrationForm(
      testData.name,
      testData.lastName,
      testData.invalidEmail,
      testData.correctPassword,
      testData.correctPassword
    );
    
    await registrationPage.expectEmailError('Email is incorrect');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('Password requirements validation', async () => {
    await registrationPage.fillRegistrationForm(
      testData.name,
      testData.lastName,
      email,
      testData.incorrectPassword,
      testData.incorrectPassword
    );
    
    await registrationPage.expectPasswordError(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('Password mismatch validation', async () => {
    await registrationPage.fillRegistrationForm(
      testData.name,
      testData.lastName,
      email,
      testData.correctPassword,
      testData.differentPassword
    );
    
    await registrationPage.nameInput.focus(); // Trigger validation
    
    await registrationPage.expectRepeatPasswordError('Passwords do not match');
    await registrationPage.expectRegisterButtonDisabled();
  });

  test('Name length validation', async () => {
    await registrationPage.fillRegistrationForm(
      testData.invalidName,
      testData.lastName,
      email,
      testData.correctPassword,
      testData.correctPassword
    );
    
    await registrationPage.expectNameError('Name has to be from 2 to 20 characters long');
    await registrationPage.expectRegisterButtonDisabled();
  });
});