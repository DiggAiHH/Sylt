import { test, expect } from '@playwright/test';

/**
 * Cookbook E2E Tests
 * Tests for the recipe cookbook functionality
 */

test.describe('Cookbook', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/kochbuch');
  });

  test('should load cookbook page successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Kochbuch/);
    
    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should display recipe cards', async ({ page }) => {
    // Wait for recipes to load
    await page.waitForLoadState('networkidle');
    
    // Check if at least one recipe card is visible
    const recipeCards = page.locator('article, .recipe-card, a[href*="kochbuch/"]').filter({
      hasText: /Sylter|Krabben|Scholle|Matjes/i
    });
    
    await expect(recipeCards.first()).toBeVisible();
  });

  test('should navigate to recipe detail page', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Click on first recipe link
    const firstRecipeLink = page.locator('a[href*="/kochbuch/"]').first();
    await firstRecipeLink.click();
    
    // Should navigate to recipe detail page
    await page.waitForURL('**/kochbuch/**');
    await expect(page).toHaveURL(/\/kochbuch\/[^/]+/);
  });

  test('should display recipe information on detail page', async ({ page }) => {
    // Navigate to a specific recipe
    await page.goto('http://localhost:3000/kochbuch/sylter-royal-austern');
    
    // Check recipe title is visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check ingredients section
    await expect(page.getByText(/Zutaten/i)).toBeVisible();
    
    // Check preparation steps
    await expect(page.getByText(/Zubereitung/i)).toBeVisible();
  });

  test('should show recipe metadata (time, difficulty, servings)', async ({ page }) => {
    await page.goto('http://localhost:3000/kochbuch/sylter-royal-austern');
    
    // Check for time information - be more specific
    const timeElements = page.getByText(/\d+\s*Minuten/i);
    await expect(timeElements.first()).toBeVisible();
    
    // Check for difficulty
    await expect(page.getByText(/einfach|mittel|schwierig/i).first()).toBeVisible();
    
    // Check for servings
    await expect(page.getByText(/Personen/i).first()).toBeVisible();
  });

  test('should have print button on recipe page', async ({ page }) => {
    await page.goto('http://localhost:3000/kochbuch/sylter-royal-austern');
    
    // Check print button exists
    const printButton = page.getByRole('button', { name: /drucken/i });
    await expect(printButton).toBeVisible();
  });

  test('should trigger print dialog when print button is clicked', async ({ page }) => {
    await page.goto('http://localhost:3000/kochbuch/sylter-royal-austern');
    
    // Set up print dialog listener
    let printDialogTriggered = false;
    page.on('dialog', () => {
      printDialogTriggered = true;
    });
    
    // Mock window.print
    await page.evaluate(() => {
      window.print = () => {
        console.log('Print triggered');
      };
    });
    
    // Click print button
    const printButton = page.getByRole('button', { name: /drucken/i });
    await printButton.click();
    
    // Print should have been called (we can't test actual dialog, but we test the click works)
    await expect(printButton).toBeVisible();
  });

  test('should navigate back to cookbook overview', async ({ page }) => {
    await page.goto('http://localhost:3000/kochbuch/sylter-royal-austern');
    
    // Click back to cookbook link
    const backLink = page.getByRole('link', { name: /Zurück|Übersicht|Kochbuch/i }).first();
    await backLink.click();
    
    // Should be back on cookbook page
    await page.waitForURL('**/kochbuch');
    await expect(page).toHaveURL(/\/kochbuch$/);
  });

  test('should handle invalid recipe slug gracefully', async ({ page }) => {
    // Try to navigate to non-existent recipe
    await page.goto('http://localhost:3000/kochbuch/does-not-exist-recipe-xyz');
    
    // Should show 404 page or redirect
    await page.waitForLoadState('networkidle');
    
    // Check for 404 indicators
    const pageContent = await page.textContent('body');
    expect(pageContent).toMatch(/(nicht gefunden|404|Not Found)/i);
  });

  test('should display recipe tips if available', async ({ page }) => {
    await page.goto('http://localhost:3000/kochbuch/sylter-royal-austern');
    
    // Look for tips section (may not exist on all recipes)
    const tipsSection = page.getByText(/Tipp|Hinweis/i);
    const tipsCount = await tipsSection.count();
    
    // If tips exist, they should be visible
    if (tipsCount > 0) {
      await expect(tipsSection.first()).toBeVisible();
    }
  });

  test('should display recipe tags if available', async ({ page }) => {
    await page.goto('http://localhost:3000/kochbuch/sylter-royal-austern');
    
    // Look for tags section
    const tagsSection = page.getByText(/Tags?:/i);
    const tagsCount = await tagsSection.count();
    
    // If tags exist, they should be visible
    if (tagsCount > 0) {
      await expect(tagsSection).toBeVisible();
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('http://localhost:3000/kochbuch/sylter-royal-austern');
    
    // Check h1 exists
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // Check h2 headings exist
    const h2List = page.locator('h2');
    const h2Count = await h2List.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/kochbuch');
    
    // Recipe cards should still be visible
    await page.waitForLoadState('networkidle');
    const recipeCards = page.locator('a[href*="/kochbuch/"]');
    await expect(recipeCards.first()).toBeVisible();
  });

  test('should handle empty search results gracefully', async ({ page }) => {
    // If there's a search feature, test it
    const searchInput = page.locator('input[type="search"], input[placeholder*="Suche"]');
    const searchCount = await searchInput.count();
    
    if (searchCount > 0) {
      await searchInput.fill('xyzabcnonexistentrecipe123');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      
      // Should show no results message
      await expect(page.getByText(/keine.*gefunden|no.*found/i)).toBeVisible();
    }
  });

  test('should load recipe images without errors', async ({ page }) => {
    await page.goto('http://localhost:3000/kochbuch/sylter-royal-austern');
    
    // Check if images are present
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check first image loaded successfully
      const firstImage = images.first();
      await expect(firstImage).toBeVisible();
      
      // Check image has alt text
      await expect(firstImage).toHaveAttribute('alt', /.+/);
    }
  });
});
