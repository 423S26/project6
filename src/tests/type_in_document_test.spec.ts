import { test, expect } from '@playwright/test';

test('should focus and type into the General Document editor', async ({ page }) => {
  await page.goto('https://project6-ten-zeta.vercel.app/');

  await page.getByRole('button', { name: 'General Document' }).click();
  const editor = page.locator('.e-documenteditorcontainer');
  await editor.click();

  const testText = 'Testing the Syncfusion editor functionality.';
  await page.keyboard.type(testText);

  await expect(editor).toBeVisible();
});