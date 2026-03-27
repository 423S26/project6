import { test, expect } from '@playwright/test';

test.describe('SOAP Editor Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://project6-ten-zeta.vercel.app/');
    await page.getByRole('button', { name: 'SOAP Notes' }).click();
  });

  test('should allow typing in all four SOAP sections', async ({ page }) => {
    const sections = ['Subjective', 'Objective', 'Assessment', 'Plan'];
    
    for (const section of sections) {
      const editor = page.locator(`.textbox:has-text("${section}") .ql-editor`);
      await editor.fill(`Test content for ${section}`);
      await expect(editor).toHaveText(`Test content for ${section}`);
    }
  });

  test('should export SOAP notes as a PDF with custom filename', async ({ page }) => {
    const customName = 'John_Doe_SOAP_Test';
    await page.getByPlaceholder(/Enter document name/i).fill(customName);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /Save SOAP to PDF/i }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe(`${customName}.pdf`);
  });
});