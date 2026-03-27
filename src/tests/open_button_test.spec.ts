import { test, expect } from '@playwright/test';

test('should open the file browser when the open button is clicked', async ({ page }) => {
  await page.goto('https://project6-ten-zeta.vercel.app/');

  await page.waitForSelector('.e-documenteditorcontainer');

  await page.getByRole('button', { name: /General Notes/i }).click();

  const openButton = page.locator('button[title="Open"]');

  const fileChooserPromise = page.waitForEvent('filechooser');
  await openButton.click();
  const fileChooser = await fileChooserPromise;
  
  expect(fileChooser).toBeDefined();
});