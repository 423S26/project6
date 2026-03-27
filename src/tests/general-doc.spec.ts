import { test, expect } from '@playwright/test';

test.describe('General Document (Syncfusion)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://project6-ten-zeta.vercel.app/');
  });

  test('should render the Syncfusion editor container', async ({ page }) => {
    const editor = page.locator('.e-documenteditorcontainer');
    await expect(editor).toBeVisible();
  });

  test('should export General Document as PDF', async ({ page }) => {
    const fileName = 'General_Report_Alpha';
    await page.getByPlaceholder(/Enter document name/i).fill(fileName);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /Save Document/i }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe(`${fileName}.pdf`);
  });
});