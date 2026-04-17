import { test, expect } from '@playwright/test';

test.describe('SOAP Editor Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://project6-ten-zeta.vercel.app/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'SOAP Notes' }).click();
  });

  test('should allow formatting in specific SOAP sections', async ({ page }) => {
    const subjectiveSection = page.locator('.textbox').filter({ hasText: 'Subjective' });
    const editor = subjectiveSection.locator('.ql-editor');
    const toolbar = subjectiveSection.locator('.ql-toolbar');

    await editor.fill('Patient reports headache.');
    await subjectiveSection.click(); 

    await toolbar.getByRole('button', { name: 'bold' }).click();
    
    const headerPicker = toolbar.locator('span.ql-header.ql-picker');
    await headerPicker.click();
    await headerPicker.locator('.ql-picker-item[data-value="2"]').click();
  });

  test('should execute PDF save process cleanly', async ({ page }) => {
    const customName = 'John_Doe_SOAP_Test';
    await page.getByPlaceholder(/Enter document name/i).fill(customName);

    const hiddenPdfWrapper = page.locator('.hidden-pdf-wrapper .pdf-print-area');
    
    await expect(hiddenPdfWrapper).not.toBeVisible();

    await page.getByRole('button', { name: /Save Document \(pdf\)/i }).click();

    await expect(hiddenPdfWrapper).not.toBeVisible({ timeout: 15000 });
  });
});