import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  async verifyCartPage() {
    await expect(this.page.locator(".subheader")).toHaveText("Your Cart");
  }

  async getProductPrice(productName: string): Promise<number> {
    const priceText = await this.page
      .locator(`.cart_item:has-text("${productName}") .inventory_item_price`)
      .textContent() || '';
    
    console.log(`Price text for ${productName}:`, priceText);
    return this.getPrice(priceText);
  }

  async checkout() {
    await this.page.click(".checkout_button");
  }
}
