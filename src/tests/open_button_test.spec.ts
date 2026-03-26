import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://project6-ten-zeta.vercel.app/');
  await page.locator('#de_elementmn6h1zimcp1q1s0ople_toolbar_open').click();
});