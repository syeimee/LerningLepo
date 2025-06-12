import { test, expect } from '@playwright/experimental-ct-react';
import App from './App';

test.use({ viewport: { width: 500, height: 500 } });

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime('2024-01-01');
});

test('should work', async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component).toContainText('こんにちは React');
  await expect(component).toHaveScreenshot();
});
