import { test, expect } from '@playwright/test';

test('should type into the editor and download the document', async ({ page }) => {
  await page.goto('https://project6-ten-zeta.vercel.app/');

  await page.getByRole('button', { name: 'General Document' }).click();
  const editor = page.locator('.e-documenteditorcontainer');
  await editor.click();

  await page.keyboard.type('Hello, this is a test of the Syncfusion PDF export.');
  await page.getByPlaceholder(/Enter document name.../i).fill('Syncfusion_Test_Doc');

  const downloadPromise = page.waitForEvent('download');
  
  await page.getByRole('button', { name: /Save Document (.docx)/i }).click();
  
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe('Syncfusion_Test_Doc.docx');
});