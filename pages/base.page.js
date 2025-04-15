export class BasePage {
    constructor(page) {
      this.page = page;
    }

    async logNavigationDetails(url) {
      console.log('--- NAVIGATION DEBUG ---');
      console.log('Constructed URL:', url);
      console.log('Environment BASE_URL:', process.env.BASE_URL);
      console.log('Current page URL (before):', await this.page.url());
    }
  
    async click(locator) {
      await locator.click();
    }
  
    async fill(locator, text) {
      await locator.fill(text);
    }
  
    async type(locator, text) {
      await locator.type(text);
    }
  
    async getText(locator) {
      return await locator.innerText();
    }
  
    async isVisible(locator) {
      return await locator.isVisible();
    }
  
    async isEnabled(locator) {
      return await locator.isEnabled();
    }
  }