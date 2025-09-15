import { test, expect } from '@playwright/test';

test.describe('Visual Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded and stable
    await page.waitForLoadState('networkidle');
    // Wait for any web fonts to load
    await page.waitForTimeout(500);
  });

  test('should match homepage layout @visual', async ({ page }) => {
    // Full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should match hero section @visual', async ({ page }) => {
    // Header/hero section
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('hero-section.png');
  });


  test('should match recommendations section @visual', async ({ page }) => {
    // Recommendations section
    const recommendationsSection = page.locator('section').filter({ hasText: "What It's Like to Work With Me" });
    await expect(recommendationsSection).toHaveScreenshot('recommendations-section.png');
  });

  test('should match footer @visual', async ({ page }) => {
    // Footer section
    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer-section.png');
  });

  test('should match viewport above fold @visual', async ({ page }) => {
    // Above-the-fold content only
    await expect(page).toHaveScreenshot('above-fold.png', {
      clip: { x: 0, y: 0, width: 1280, height: 720 }
    });
  });
});

test.describe('Visual Testing - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
  });

  test('should match mobile homepage @visual', async ({ page }) => {
    await expect(page).toHaveScreenshot('mobile-homepage.png', {
      fullPage: true
    });
  });

  test('should match mobile hero @visual', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('mobile-hero.png');
  });

  test('should match mobile navigation @visual', async ({ page }) => {
    // Check how sections stack on mobile
    const main = page.locator('main');
    await expect(main).toHaveScreenshot('mobile-main-content.png');
  });
});

test.describe('Visual Testing - Tablet', () => {
  test.use({ viewport: { width: 768, height: 1024 } }); // iPad size

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
  });

  test('should match tablet homepage @visual', async ({ page }) => {
    await expect(page).toHaveScreenshot('tablet-homepage.png', {
      fullPage: true
    });
  });

  test('should match tablet grid layout @visual', async ({ page }) => {
    // Test how the recommendation cards grid responds on tablet
    const recommendationsGrid = page.locator('[class*="recommendationsGrid"]');
    await expect(recommendationsGrid).toHaveScreenshot('tablet-recommendations-grid.png');
  });
});

test.describe('Visual Testing - Dark Mode Detection', () => {
  test('should handle dark mode preference @visual', async ({ page }) => {
    // Emulate dark mode preference
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('dark-mode-homepage.png', {
      fullPage: true
    });
  });
});

test.describe('Visual Testing - Interactive States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
  });

  test('should match tech stack styling @visual', async ({ page }) => {
    // Focus on tech stack badges
    const techStack = page.locator('[class*="techStack"]');
    await expect(techStack).toHaveScreenshot('tech-stack-badges.png');
  });
});

test.describe('Visual Testing - Loading States', () => {
  test('should match loading state @visual', async ({ page }) => {
    // Navigate and immediately screenshot to catch loading state
    const responsePromise = page.waitForResponse('**/*');
    await page.goto('/');
    
    // Take screenshot before full load
    await expect(page).toHaveScreenshot('loading-state.png');
    
    await responsePromise;
  });
});