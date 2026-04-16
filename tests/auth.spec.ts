import { expect, test } from "@playwright/test";

function uniqueEmail(prefix: string): string {
  return `${prefix}.${Date.now()}@example.com`;
}

test("positive: user can register with valid data", async ({ page }) => {
  const email = uniqueEmail("register");

  await page.goto("/register.html");
  await page.fill("#email", email);
  await page.fill("#password", "Password123");
  await page.fill("#confirmPassword", "Password123");
  await page.click("button[type='submit']");

  await expect(page.locator("#success")).toHaveText(/Registration successful/i);

  const token = await page.evaluate(() => localStorage.getItem("jwt_token"));
  expect(token).toBeTruthy();
});

test("positive: user can login with correct credentials", async ({ page, request }) => {
  const email = uniqueEmail("login");
  const password = "Password123";

  const registerResp = await request.post("/register", { data: { email, password } });
  expect(registerResp.ok()).toBeTruthy();

  await page.goto("/login.html");
  await page.fill("#email", email);
  await page.fill("#password", password);
  await page.click("button[type='submit']");

  await expect(page.locator("#success")).toHaveText(/Login successful/i);

  const token = await page.evaluate(() => localStorage.getItem("jwt_token"));
  expect(token).toBeTruthy();
});

test("negative: register with short password shows client-side validation error", async ({ page }) => {
  const email = uniqueEmail("shortpass");

  await page.goto("/register.html");
  await page.fill("#email", email);
  await page.fill("#password", "short");
  await page.fill("#confirmPassword", "short");
  await page.click("button[type='submit']");

  await expect(page.locator("#error")).toHaveText(/at least 8 characters/i);
});

test("negative: login with wrong password shows invalid credentials", async ({ page, request }) => {
  const email = uniqueEmail("wrongpass");

  const registerResp = await request.post("/register", {
    data: { email, password: "Password123" },
  });
  expect(registerResp.ok()).toBeTruthy();

  await page.goto("/login.html");
  await page.fill("#email", email);
  await page.fill("#password", "WrongPassword");
  await page.click("button[type='submit']");

  await expect(page.locator("#error")).toHaveText(/Invalid credentials/i);
});
