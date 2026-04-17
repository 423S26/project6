import { test, expect } from '@playwright/test';

test.describe('General Document Editor Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://project6-ten-zeta.vercel.app/', { waitUntil: 'networkidle' });
  });

  test('should type and trigger Word document download', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Need Help?' })).toBeVisible();

    const editor = page.locator('.ql-editor');
    await editor.click();
    await editor.fill('These are the test notes.');
    
    await page.getByPlaceholder('Enter document name...').fill('Test_Document');
    
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await page.getByRole('button', { name: 'Save Document (.doc)' }).click();
    const download = await downloadPromise;
    
    expect(download.suggestedFilename()).toBe('Test_Document.doc');
  });

  test('Editor toolbar options function without strict mode errors', async ({ page }) => {
  await page.goto('https://project6-ten-zeta.vercel.app/', { waitUntil: 'networkidle' });
  
  const editor = page.locator('.ql-editor');
  const toolbar = page.locator('.ql-toolbar');

  await editor.fill('Example text');
  await page.getByText('Example text').dblclick();

  const formats = ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'];
  for (const format of formats) {
    await toolbar.getByRole('button', { name: format, exact: true }).click();
  }

  const headerPicker = toolbar.locator('span.ql-header.ql-picker');
  await headerPicker.click();
  await headerPicker.locator('.ql-picker-item[data-value="1"]').click();
  
  await expect(page.getByRole('heading', { name: 'Example text', level: 1 })).toBeVisible();
  });
});