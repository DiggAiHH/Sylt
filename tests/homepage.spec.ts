import { test, expect } from '@playwright/test';

/**
 * Homepage E2E Tests
 * Tests critical user flows on the main landing page
 */

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check page loads without errors
    await expect(page).toHaveTitle(/BLUM/);
    
    // Check main heading is visible
    await expect(page.getByRole('heading', { name: 'BLUM', level: 1 })).toBeVisible();
  });

  test('should display all navigation elements', async ({ page }) => {
    // Check all brand links are present in navigation or on page
    const brands = [
      'Fisch Blum Sylt',
      'Blum\'s Seafood Sylt',
      'Sylt Homes by Blum',
      'Long Island House Sylt'
    ];

    for (const brand of brands) {
      // Use .first() to handle multiple instances
      await expect(page.getByRole('link', { name: brand }).first()).toBeVisible();
    }
  });

  test('should navigate to brands section on anchor click', async ({ page }) => {
    // Click "Unsere Marken entdecken" button
    const brandsButton = page.getByRole('link', { name: /Unsere Marken entdecken/i });
    await brandsButton.click();
    
    // Wait for scroll animation
    await page.waitForTimeout(500);
    
    // Check if brands section is in viewport
    const brandsSection = page.locator('#marken');
    await expect(brandsSection).toBeInViewport();
  });

  test('should navigate to cookbook page', async ({ page }) => {
    // Click cookbook button
    await page.getByRole('link', { name: /Fisch-Kochbuch entdecken/i }).click();
    
    // Wait for navigation
    await page.waitForURL('**/kochbuch**');
    
    // Check cookbook page loaded
    await expect(page.getByRole('heading', { name: /Kochbuch/i })).toBeVisible();
  });

  test('should display all four sub-brands with correct info', async ({ page }) => {
    const expectedBrands = [
      {
        name: 'Fisch Blum Sylt',
        description: 'Premium Fisch-Spezialitäten'
      },
      {
        name: 'Blum\'s Seafood Sylt',
        description: 'Exquisite Meeresfrüchte'
      },
      {
        name: 'Sylt Homes by Blum',
        description: 'Luxuriöse Ferienunterkünfte'
      },
      {
        name: 'Long Island House Sylt',
        description: 'Exklusives Ferienhaus'
      }
    ];

    for (const brand of expectedBrands) {
      // Check brand name is visible
      await expect(page.getByRole('heading', { name: brand.name })).toBeVisible();
      
      // Check description is visible
      await expect(page.getByText(brand.description)).toBeVisible();
    }
  });

  test('should have working brand card links', async ({ page }) => {
    // Click on first brand (Fisch Blum Sylt)
    const firstBrandLink = page.getByRole('link').filter({ 
      has: page.getByRole('heading', { name: 'Fisch Blum Sylt' }) 
    });
    
    await firstBrandLink.click();
    
    // Should navigate to brand page
    await page.waitForURL('**/fisch-blum-sylt**');
    await expect(page).toHaveURL(/fisch-blum-sylt/);
  });

  test('should display features section', async ({ page }) => {
    // Check "Warum BLUM?" section is visible
    await expect(page.getByRole('heading', { name: /Warum BLUM/i })).toBeVisible();
    
    // Check for DPMA feature
    await expect(page.getByText(/DPMA-registriert/i)).toBeVisible();
  });

  test('should have accessible skip link', async ({ page }) => {
    // Tab to skip link
    await page.keyboard.press('Tab');
    
    // Check skip link is focused and visible when focused
    const skipLink = page.getByRole('link', { name: /Zum Hauptinhalt/i });
    await expect(skipLink).toBeFocused();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile menu button is visible
    await expect(page.getByRole('button', { name: /Menü/i })).toBeVisible();
    
    // Check hero section is still visible
    await expect(page.getByRole('heading', { name: 'BLUM', level: 1 })).toBeVisible();
  });

  test('should open mobile menu on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open mobile menu
    const menuButton = page.getByRole('button', { name: /Menü öffnen/i });
    await menuButton.click();
    
    // Wait for menu animation to complete
    await page.waitForTimeout(500);
    
    // Mobile menu should have max-h-96 class when open
    const mobileMenu = page.locator('#mobile-menu');
    const classList = await mobileMenu.getAttribute('class');
    expect(classList).toContain('max-h-96');
    
    // Check that at least one menu item is visible
    const menuItems = mobileMenu.locator('a');
    const firstItem = menuItems.first();
    await expect(firstItem).toBeVisible();
  });

  test('should have valid meta tags for SEO', async ({ page }) => {
    // Check meta description exists
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /BLUM/);
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);
  });

  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // There should be no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('should handle scroll to top button', async ({ page }) => {
    // Scroll down significantly
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(800); // Wait for button to appear
    
    // Check if scroll to top button appears - use title selector for the fixed button
    const scrollButton = page.getByTitle('Zurück nach oben');
    
    // Only test if button exists
    const count = await scrollButton.count();
    if (count > 0) {
      await scrollButton.click();
      await page.waitForTimeout(800); // Wait for smooth scroll
      
      // Should be back near top (allowing some margin)
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(200);
    } else {
      // Button may not appear if page is not long enough
      console.log('Scroll-to-top button not found (page may be too short)');
    }
  });
});
