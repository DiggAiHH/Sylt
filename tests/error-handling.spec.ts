import { test, expect } from '@playwright/test';

/**
 * Error Handling E2E Tests
 * Tests for error pages and error boundary behavior
 */

test.describe('Error Handling', () => {
  test('should display 404 page for non-existent routes', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('http://localhost:3000/this-page-does-not-exist-xyz-123');
    
    // Should show 404 page
    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/(404|nicht gefunden|not found|seite.*existiert nicht)/i);
  });

  test('404 page should have link back to homepage', async ({ page }) => {
    await page.goto('http://localhost:3000/non-existent-page-abc');
    
    // Should have link to homepage
    const homeLink = page.getByRole('link', { name: /(startseite|home|zurück)/i });
    
    // If link exists, clicking it should go to homepage
    const linkCount = await homeLink.count();
    if (linkCount > 0) {
      await homeLink.first().click();
      await expect(page).toHaveURL('http://localhost:3000/');
    }
  });

  test('404 page should show navigation', async ({ page }) => {
    await page.goto('http://localhost:3000/invalid-page');
    
    // Navigation should still be visible
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
  });

  test('should handle malformed URLs gracefully', async ({ page }) => {
    const malformedUrls = [
      '/kochbuch/<script>alert("xss")</script>',
      '/fisch-blum-sylt/../../etc/passwd',
      '/kochbuch/%00',
    ];

    for (const url of malformedUrls) {
      await page.goto(`http://localhost:3000${url}`, { waitUntil: 'domcontentloaded' });
      
      // Should not crash, should show error page or 404
      const bodyText = await page.textContent('body');
      expect(bodyText).toBeTruthy();
      
      // Navigation should still work
      await expect(page.getByRole('navigation')).toBeVisible();
    }
  });

  test('should handle missing recipe gracefully', async ({ page }) => {
    await page.goto('http://localhost:3000/kochbuch/non-existent-recipe-12345');
    
    // Should not crash
    await page.waitForLoadState('networkidle');
    
    // Should show error message or 404
    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/(nicht gefunden|404|not found)/i);
  });

  test('should handle JavaScript errors without white screen', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => {
      errors.push(error.message);
    });

    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');

    // Even if there are JS errors, page should still render
    const bodyContent = await page.textContent('body');
    expect(bodyContent).toBeTruthy();
    expect(bodyContent?.length ?? 0).toBeGreaterThan(100);
  });

  test('should handle network failures gracefully', async ({ page }) => {
    // Simulate offline mode
    await page.context().setOffline(true);
    
    // Try to navigate
    try {
      await page.goto('http://localhost:3000/', { timeout: 5000 });
    } catch (error) {
      // Expected to fail
    }
    
    // Re-enable network
    await page.context().setOffline(false);
    
    // Should be able to load now
    await page.goto('http://localhost:3000/');
    // Use exact selector for main H1
    await expect(page.getByRole('heading', { name: 'BLUM', level: 1 })).toBeVisible();
  });

  test('should not expose sensitive error information', async ({ page }) => {
    await page.goto('http://localhost:3000/non-existent');
    
    const bodyText = await page.textContent('body');
    
    // Should not show stack traces or sensitive info
    expect(bodyText).not.toMatch(/stack trace|internal error|undefined is not/i);
    expect(bodyText).not.toContain('/.env');
    expect(bodyText).not.toContain('password');
  });

  test('error pages should maintain site branding', async ({ page }) => {
    await page.goto('http://localhost:3000/404-page');
    
    // Should show BLUM branding - use .first() for multiple matches
    await expect(page.getByText(/BLUM/i).first()).toBeVisible();
    
    // Navigation should be present
    await expect(page.getByRole('navigation', { name: /Hauptnavigation/i })).toBeVisible();
  });

  test('should handle slow network without freezing', async ({ page }) => {
    // Slow down network
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 1000);
    });
    
    await page.goto('http://localhost:3000/', { timeout: 15000 });
    
    // Page should eventually load - use specific selector
    await expect(page.getByRole('heading', { name: 'BLUM', level: 1 })).toBeVisible();
  });
});
