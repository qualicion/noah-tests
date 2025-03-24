import { Page, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  protected baseURL = "https://www.saucedemo.com/v1/";

  constructor(page: Page) {
    this.page = page;
  }

  // Helper method to extract price from string
  protected getPrice(text: string): number {
    // Just extract any numbers found in the string
    const numbers = text.replace(/[^0-9.]/g, "");
    return numbers ? parseFloat(numbers) : 0;
  }

  // Navigate to URL
  async openApplication(path = "") {
    await this.page.goto(`${this.baseURL}${path}`);
  }
}
