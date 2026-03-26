"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('test', async ({ page }) => {
    await page.goto('https://project6-ten-zeta.vercel.app/');
    await page.locator('#de_elementmn6h1zimcp1q1s0ople_toolbar_open').click();
});
//# sourceMappingURL=open_button_test.spec.js.map