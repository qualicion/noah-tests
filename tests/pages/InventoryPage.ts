import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  async getProductPrice(productName: string): Promise<number> {
    const priceText = await this.page
      .locator(`.inventory_item:has-text("${productName}") .inventory_item_price`)
      .textContent() || '';
    return this.getPrice(priceText);
  }

  async addToCart(productName: string) {
    await this.page
      .locator(`.inventory_item:has-text("${productName}") button`)
      .click();
  }

  async getCartCount(): Promise<number> {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.isVisible()) {
      const text = await badge.textContent() || '0';
      return parseInt(text);
    }
    return 0;
  }

  async goToCart() {
    await this.page.click('#shopping_cart_container');
  }
}