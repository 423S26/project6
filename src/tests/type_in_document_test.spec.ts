import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://project6-ten-zeta.vercel.app/');
  await page.locator('#de_elementmn6gmplfo5rnwezk4s_editor_viewerContainer').click();
});