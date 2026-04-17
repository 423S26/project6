import { test, expect } from '@playwright/test';

test.describe('Navigation and Layout Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://project6-ten-zeta.vercel.app/');
  });

  test('help link opens documentation in a new tab', async ({ page }) => {
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Need Help?' }).click();
    const page1 = await page1Promise;
    
    await expect(page1.getByRole('heading', { name: 'User Documentation' })).toBeVisible();
    await page1.getByRole('link', { name: 'Word Processor' }).click();
  });

  test('switches between General and SOAP tabs correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'SOAP Notes' }).click();
    await expect(page.getByRole('button', { name: 'Save Document (pdf)' })).toBeVisible();

    await page.getByRole('button', { name: 'General Notes' }).click();
    await expect(page.getByRole('button', { name: 'Save Document (.doc)' })).toBeVisible();
  });
});