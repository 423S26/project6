import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://project6-ten-zeta.vercel.app/');
  await page.locator('#de_elementmn6guf5jg0cma566zwh_editor_viewerContainer').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Save' }).first().click();
  const download = await downloadPromise;
});