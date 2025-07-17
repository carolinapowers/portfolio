import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E Tests', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check if the main title is visible
    await expect(page.getByText('Buffer Content Creation Experience')).toBeVisible();
    await expect(page.getByText('Senior Frontend Engineer Portfolio')).toBeVisible();
  });

  test('should display tech stack', async ({ page }) => {
    await page.goto('/');
    
    // Check tech stack badges in header section specifically
    const header = page.locator('header');
    await expect(header.getByText('React', { exact: true })).toBeVisible();
    await expect(header.getByText('TypeScript', { exact: true })).toBeVisible();
    await expect(header.getByText('GraphQL', { exact: true })).toBeVisible();
  });

  test('should have working portfolio link', async ({ page }) => {
    await page.goto('/');
    
    // Check portfolio link exists and has correct href
    const portfolioLink = page.getByRole('link', { name: 'View Live Portfolio' });
    await expect(portfolioLink).toBeVisible();
    await expect(portfolioLink).toHaveAttribute('href', 'https://carolinapowers-portfolio.vercel.app/');
  });

  test('should show rich text editor section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByText('Rich Text Editor - Buffer-Style Composer')).toBeVisible();
    await expect(page.getByText('Demonstrates technical skills with Buffer\'s design patterns')).toBeVisible();
  });

  test('should show recommendations section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByText('LinkedIn Recommendations')).toBeVisible();
    await expect(page.getByText('Actual testimonials from colleagues')).toBeVisible();
  });

  test('should show brainstorming section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByText('Collaborative Brainstorming')).toBeVisible();
    await expect(page.getByText('Interactive space for your thoughts')).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByText('Buffer Content Creation Experience')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByText('Buffer Content Creation Experience')).toBeVisible();
  });
});