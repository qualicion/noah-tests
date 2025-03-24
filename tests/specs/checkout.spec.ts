import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.describe("Checkout Process", () => {
  // Test data
  const products = [
    { name: "Sauce Labs Backpack", price: 29.99 },
    { name: "Sauce Labs Bike Light", price: 9.99 },
  ];

  const user = {
    username: "standard_user",
    password: "secret_sauce",
  };

  const customer = {
    firstName: "John",
    lastName: "Doe",
    zipCode: "12345",
  };

  test("should complete checkout with multiple items", async ({ page }) => {
    // Initialize pages
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.openApplication();
    await loginPage.login(user.username, user.password);

    // Add products to cart
    for (const product of products) {
      // Verify price on inventory page
      const price = await inventoryPage.getProductPrice(product.name);
      expect(price).toBe(product.price);

      // Add to cart
      await inventoryPage.addToCart(product.name);
    }

    // Verify cart count
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(products.length);

    // Go to cart
    await inventoryPage.goToCart();
    await cartPage.verifyCartPage();

    // Verify products in cart
    for (const product of products) {
      const price = await cartPage.getProductPrice(product.name);
      expect(price).toBe(product.price);
    }

    // Checkout
    await cartPage.checkout();

    // Fill shipping info
    await checkoutPage.fillShippingInfo(
      customer.firstName,
      customer.lastName,
      customer.zipCode
    );

    // Verify totals
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    // Calculate expected values
    const expectedSubtotal = products.reduce((sum, p) => sum + p.price, 0);
    const expectedTax = parseFloat((expectedSubtotal * 0.08).toFixed(2));
    const expectedTotal = parseFloat(
      (expectedSubtotal + expectedTax).toFixed(2)
    );

    expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
    expect(tax).toBeCloseTo(expectedTax, 2);
    expect(total).toBeCloseTo(expectedTotal, 2);

    // Complete order
    await checkoutPage.finish();
  });
});
