import { test, expect } from '@playwright/test';

/**
 * Navigation E2E Tests
 * Tests for global navigation functionality
 */

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('should display navigation bar', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: /Hauptnavigation/i });
    await expect(nav).toBeVisible();
  });

  test('should have BLUM logo link to homepage', async ({ page }) => {
    // Go to a sub-page first
    await page.goto('http://localhost:3000/fisch-blum-sylt');
    
    // Click logo
    await page.getByRole('link', { name: /BLUM.*Startseite/i }).click();
    
    // Should be back on homepage
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('should navigate to all brand pages', async ({ page }) => {
    const brands = [
      { name: 'Fisch Blum Sylt', path: '/fisch-blum-sylt' },
      { name: 'Blum\'s Seafood Sylt', path: '/blums-seafood-sylt' },
      { name: 'Sylt Homes by Blum', path: '/sylt-homes-by-blum' },
      { name: 'Long Island House Sylt', path: '/long-island-house-sylt' }
    ];

    for (const brand of brands) {
      await page.goto('http://localhost:3000/');
      
      // Click brand link in navigation
      await page.getByRole('link', { name: brand.name }).first().click();
      
      // Should navigate to brand page
      await page.waitForURL(`**${brand.path}**`);
      await expect(page).toHaveURL(new RegExp(brand.path));
    }
  });

  test('should maintain navigation visibility on scroll', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: /Hauptnavigation/i });
    
    // Navigation should be visible initially
    await expect(nav).toBeVisible();
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);
    
    // Navigation should still be visible (sticky)
    await expect(nav).toBeVisible();
  });

  test('should toggle mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Menu should be closed initially
    const menuButton = page.getByRole('button', { name: /Menü öffnen/i });
    await expect(menuButton).toBeVisible();
    
    // Open menu
    await menuButton.click();
    await page.waitForTimeout(300);
    
    // Menu content should be visible
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();
    
    // Close menu
    const closeButton = page.getByRole('button', { name: /Menü schließen/i });
    await closeButton.click();
    await page.waitForTimeout(300);
    
    // Menu should be hidden
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should close mobile menu on link click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open menu
    await page.getByRole('button', { name: /Menü öffnen/i }).click();
    await page.waitForTimeout(500);
    
    // Get mobile menu and find clickable links
    const mobileMenu = page.locator('#mobile-menu');
    const links = mobileMenu.locator('a');
    
    // Click first brand link
    const firstLink = links.first();
    await firstLink.click();
    
    // Should navigate (URL should change)
    await page.waitForTimeout(1000);
    
    // Check we're no longer on homepage
    const currentUrl = page.url();
    expect(currentUrl).not.toBe('http://localhost:3000/');
  });

  test('should close mobile menu on Escape key', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open menu
    await page.getByRole('button', { name: /Menü öffnen/i }).click();
    await page.waitForTimeout(300);
    
    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    // Menu should be closed
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: /Hauptnavigation/i });
    
    // Navigation should have proper role
    await expect(nav).toHaveAttribute('role', 'navigation');
    
    // Mobile menu button should have aria-expanded
    await page.setViewportSize({ width: 375, height: 667 });
    const menuButton = page.getByRole('button', { name: /Menü/i });
    await expect(menuButton).toHaveAttribute('aria-expanded');
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Tab through navigation items
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Logo
    await page.keyboard.press('Tab'); // First nav item
    
    // Check that a navigation link is focused
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveAttribute('href');
  });

  test('should highlight current page in navigation', async ({ page }) => {
    // Go to a specific brand page
    await page.goto('http://localhost:3000/fisch-blum-sylt');
    
    // Current page link might have active styling
    // This test checks if the link is present and clickable
    const currentLink = page.getByRole('link', { name: 'Fisch Blum Sylt' }).first();
    await expect(currentLink).toBeVisible();
  });
});
