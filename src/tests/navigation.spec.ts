import { test, expect } from '@playwright/test';

test.describe('Navigation & Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://project6-ten-zeta.vercel.app/');
  });

  test('should display the correct header title and help link', async ({ page }) => {
    await expect(page.locator('header')).toContainText('SOAP Notes Editor');
    const helpLink = page.getByRole('link', { name: /Need Help/i });
    await expect(helpLink).toHaveAttribute('href', /user-documentation/);
  });

  test('should switch between General Notes and SOAP Notes tabs', async ({ page }) => {
    await expect(page.getByText('General Notes')).toBeVisible();

    await page.getByRole('button', { name: /SOAP Notes/i }).click();
    await expect(page.getByRole('heading', { name: 'Subjective', exact: true })).toBeVisible();

    await page.getByRole('button', { name: /General Notes/i }).click();
    await expect(page.getByText('Save Document (.docx)')).toBeVisible();
  });
});