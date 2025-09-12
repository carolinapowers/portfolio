import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E Tests', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check if the main title is visible
    await expect(page.getByRole('heading', { name: "Interactive Portfolio" })).toBeVisible();
    await expect(page.getByText('Senior Product Frontend Engineer')).toBeVisible();
  });

  test('should display tech stack', async ({ page }) => {
    await page.goto('/');
    
    // Check tech stack badges in header section specifically
    const header = page.locator('header');
    await expect(header.getByText('React', { exact: true })).toBeVisible();
    await expect(header.getByText('TypeScript', { exact: true })).toBeVisible();
    await expect(header.getByText('GraphQL', { exact: true })).toBeVisible();
  });

  test('should have working portfolio source link', async ({ page }) => {
    await page.goto('/');
    // Check source code link exists in the footer and has correct href
    const sourceLink = page.getByRole('link', { name: /View Source Code/i });
    await expect(sourceLink).toBeVisible();
    await expect(sourceLink).toHaveAttribute('href', 'https://github.com/carolinapowers/portfolio');
  });

  test('should show rich text editor section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByText('Rich Text Editor - Modern Composer')).toBeVisible();
    await expect(page.getByText("This interactive rich text editor showcases modern React development patterns and demonstrates how modern content creation tools might be built. Try the formatting controls, keyboard shortcuts, and explore the features.")).toBeVisible();
  });

  test('should show recommendations section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: "What It's Like to Work With Me" })).toBeVisible();
    await expect(page.getByText("The best way to understand what it's like to work with me is by reading what the people I've collaborated with have to say about the experience.")).toBeVisible();
  });

  test('should show design system section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Modern Design System')).toBeVisible();
    const storybookBtn = page.getByRole('link', { name: /Storybook Demo/i });
    const githubBtn = page.getByRole('link', { name: /GitHub Repo/i });
    await expect(storybookBtn).toBeVisible();
    await expect(storybookBtn).toHaveAttribute('href', 'https://design-system-iota-five.vercel.app/?path=/docs/components-composite-modal--docs');
    await expect(githubBtn).toBeVisible();
    await expect(githubBtn).toHaveAttribute('href', 'https://github.com/carolinapowers/design-system');
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: "Interactive Portfolio" })).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('heading', { name: "Interactive Portfolio" })).toBeVisible();
  });
});