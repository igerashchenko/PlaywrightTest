import { BasePage } from './base.page';
import { expect } from '@playwright/test';

class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Локатори
    this.signUpButton = page.locator('button:has-text("Sign up")');
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('button:text("Register")');
    
    // Помилки валідації
    this.nameError = page.locator('#signupName + .invalid-feedback');
    this.lastNameError = page.locator('#signupLastName + .invalid-feedback');
    this.emailError = page.locator('#signupEmail + .invalid-feedback');
    this.passwordError = page.locator('#signupPassword + .invalid-feedback');
    this.repeatPasswordError = page.locator('#signupRepeatPassword + .invalid-feedback');
  }

  async navigateToRegistration() {
    const config = this.page.context()._options;
    
    // Debug logging (optional)
    console.log('Base URL:', config.baseURL);
    console.log('Using login:', config.httpCredentials?.username);
    console.log('Using password:', config.httpCredentials?.password);
    this.logNavigationDetails(config.baseURL);
    await this.page.goto('/');
    await this.click(this.signUpButton);
  }

  async fillRegistrationForm(name, lastName, email, password, repeatPassword) {
    await this.fill(this.nameInput, name);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.fill(this.repeatPasswordInput, repeatPassword);
  }

  async submitRegistration() {
    await this.click(this.registerButton);
  }

  async expectSuccessfulRegistration() {
    await expect(this.page).toHaveURL(/panel\/garage/);
  }

  async expectNameError(message) {
    await expect(this.nameError).toHaveText(message);
    await expect(this.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }

  async expectEmailError(message) {
    await expect(this.emailError).toHaveText(message);
    await expect(this.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }

  async expectPasswordError(message) {
    await expect(this.passwordError).toHaveText(message);
    await expect(this.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }

  async expectRepeatPasswordError(message) {
    await expect(this.repeatPasswordError).toHaveText(message);
    await expect(this.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }

  async expectRegisterButtonDisabled() {
    await expect(this.registerButton).toBeDisabled();
  }
}
export {RegistrationPage};