"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('test', async ({ page }) => {
    await page.goto('https://project6-ten-zeta.vercel.app/');
    await page.locator('#de_elementmn6gmplfo5rnwezk4s_editor_viewerContainer').click();
});
//# sourceMappingURL=type_in_document_test.spec.js.map