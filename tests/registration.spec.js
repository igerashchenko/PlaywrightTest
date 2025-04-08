import { test, expect } from '@playwright/test';

test.describe('User Registration Tests', () => {
  const locators = {
    signUpButton: 'button:has-text("Sign up")',
    nameInput: '#signupName',
    lastNameInput: '#signupLastName',
    emailInput: '#signupEmail',
    passwordInput: '#signupPassword',
    repeatPasswordInput: '#signupRepeatPassword',
    registerButton: 'button:text("Register")',
    nameError: '#signupName + .invalid-feedback',
    lastNameError: '#signupLastName + .invalid-feedback',
    emailError: '#signupEmail + .invalid-feedback',
    passwordError: '#signupPassword + .invalid-feedback',
    repeatPasswordError: '#signupRepeatPassword + .invalid-feedback'
  };
  const timestamp = Date.now();
  const email = `aqa-${timestamp}@test.com`;

  const values = {
    testName: 'Ira',
    testInvalidName: 'I',
    testLastName: 'Herashchenko',
    testCorrectPassword: 'Password123',
    testIncorrectPassword: 'short',
    testDifferentPassword: 'Different456',
    testInvalidEmail: 'invalid-email'
  }


  test.beforeEach(async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await page.locator(locators.signUpButton).click();
  });

  test('Successful user registration', async ({ page }) => {
    await page.fill(locators.nameInput, values.testName);
    await page.fill(locators.lastNameInput, values.testLastName);
    await page.fill(locators.emailInput, email);
    await page.fill(locators.passwordInput, values.testCorrectPassword);
    await page.fill(locators.repeatPasswordInput, values.testCorrectPassword);
    
    await page.click(locators.registerButton);
    
    await expect(page).toHaveURL(/panel\/garage/);
  });

  test('Empty Name field validation', async ({ page }) => {
    await page.focus(locators.nameInput);
    await page.fill(locators.lastNameInput, values.testLastName);
    await page.fill(locators.emailInput, email);
    await page.fill(locators.passwordInput, values.testCorrectPassword);
    await page.fill(locators.repeatPasswordInput, values.testCorrectPassword);
    
    await expect(page.locator(locators.nameError))
      .toHaveText('Name required');
    await expect(page.locator(locators.nameInput))
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    
    await expect(page.locator(locators.registerButton)).toBeDisabled();
  });

  test('Invalid Email validation', async ({ page }) => {
    await page.fill(locators.nameInput, values.testName);
    await page.fill(locators.lastNameInput, values.testLastName);
    await page.fill(locators.emailInput, values.testInvalidEmail);
    await page.fill(locators.passwordInput, values.testCorrectPassword);
    await page.fill(locators.repeatPasswordInput, values.testCorrectPassword);
    
    await expect(page.locator(locators.emailError))
      .toHaveText('Email is incorrect');
    await expect(page.locator(locators.emailInput))
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    
    await expect(page.locator(locators.registerButton)).toBeDisabled();
  });

  test('Password requirements validation', async ({ page }) => {
    await page.fill(locators.nameInput, values.testName);
    await page.fill(locators.lastNameInput, values.testLastName);
    await page.fill(locators.emailInput, email);
    await page.fill(locators.passwordInput, values.testIncorrectPassword);
    await page.fill(locators.repeatPasswordInput, values.testIncorrectPassword);
    
    await expect(page.locator(locators.passwordError))
      .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(page.locator(locators.passwordInput))
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    
    await expect(page.locator(locators.registerButton)).toBeDisabled();
  });

  test('Password mismatch validation', async ({ page }) => {
    await page.fill(locators.nameInput, values.testName);
    await page.fill(locators.lastNameInput, values.testLastName);
    await page.fill(locators.emailInput, email);
    await page.fill(locators.passwordInput, values.testCorrectPassword);
    await page.fill(locators.repeatPasswordInput, values.testDifferentPassword);
    await page.focus(locators.nameInput);
    
    await expect(page.locator(locators.repeatPasswordError))
      .toHaveText('Passwords do not match');
    await expect(page.locator(locators.repeatPasswordInput))
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    
    await expect(page.locator(locators.registerButton)).toBeDisabled();
  });

  test('Name length validation', async ({ page }) => {
    await page.fill(locators.nameInput, values.testInvalidName);
    await page.fill(locators.lastNameInput, values.testLastName);
    await page.fill(locators.emailInput, email);
    await page.fill(locators.passwordInput, values.testCorrectPassword);
    await page.fill(locators.repeatPasswordInput, values.testCorrectPassword);
    
    await expect(page.locator(locators.nameError))
      .toHaveText('Name has to be from 2 to 20 characters long');
    await expect(page.locator(locators.nameInput))
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
    
    await expect(page.locator(locators.registerButton)).toBeDisabled();
  });

});