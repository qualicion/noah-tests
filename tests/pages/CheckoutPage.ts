import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  async fillShippingInfo(firstName: string, lastName: string, zipCode: string) {
    await this.page.fill("#first-name", firstName);
    await this.page.fill("#last-name", lastName);
    await this.page.fill("#postal-code", zipCode);
    await this.page.click(".cart_button"); // Continue button
  }

  async getSubtotal(): Promise<number> {
    const text =
      (await this.page.locator(".summary_subtotal_label").textContent()) || "";
    console.log("Subtotal text:", text);
    return this.getPrice(text);
  }
  async getTax(): Promise<number> {
    const text =
      (await this.page.locator(".summary_tax_label").textContent()) || "";
    return this.getPrice(text);
  }

  async getTotal(): Promise<number> {
    const text =
      (await this.page.locator(".summary_total_label").textContent()) || "";
    return this.getPrice(text);
  }

  async finish() {
    await this.page.click(".cart_button"); // Finish button
    await expect(this.page.locator(".complete-header")).toHaveText(
      "THANK YOU FOR YOUR ORDER"
    );
  }
}
