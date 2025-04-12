export class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate(url) {
      await this.page.goto(url);
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