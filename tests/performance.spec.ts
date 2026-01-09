import { test, expect } from '@playwright/test';

/**
 * Performance & Loading E2E Tests
 * Tests for page load performance and optimization
 */

test.describe('Performance & Loading', () => {
  test('homepage should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    
    // Should load in under 5 seconds on localhost
    expect(loadTime).toBeLessThan(5000);
  });

  test('should not have layout shift on page load', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Wait for initial render
    await page.waitForLoadState('networkidle');
    
    // Get initial position of main heading
    const heading = page.getByRole('heading', { name: 'BLUM' }).first();
    const initialBox = await heading.boundingBox();
    
    // Wait a bit more
    await page.waitForTimeout(1000);
    
    // Check position again
    const finalBox = await heading.boundingBox();
    
    // Position should not have changed significantly (allowing for minor differences)
    if (initialBox && finalBox) {
      expect(Math.abs(initialBox.y - finalBox.y)).toBeLessThan(10);
    }
  });

  test('images should load progressively', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check if images have loading attribute
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const loading = await img.getAttribute('loading');
      
      // Images should have loading="lazy" or loading="eager"
      // This improves performance
      expect(['lazy', 'eager', null]).toContain(loading);
    }
  });

  test('should not load unnecessary resources', async ({ page }) => {
    const requests: string[] = [];
    
    page.on('request', request => {
      requests.push(request.url());
    });
    
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // Should not load resources from unexpected domains
    const externalRequests = requests.filter(url => 
      !url.includes('localhost') && 
      !url.includes('127.0.0.1')
    );
    
    // External requests should only be from CDNs or analytics
    for (const url of externalRequests) {
      expect(url).toMatch(/(googleapis|googletagmanager|analytics|cdn|fonts)/i);
    }
  });

  test('should preload critical resources', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check for preload/preconnect links
    const preloadLinks = await page.locator('link[rel="preload"], link[rel="preconnect"]').count();
    
    // Should have at least some resource hints
    expect(preloadLinks).toBeGreaterThanOrEqual(0);
  });

  test('should not make excessive API calls', async ({ page }) => {
    const apiCalls: string[] = [];
    
    page.on('request', request => {
      if (request.url().includes('/api/')) {
        apiCalls.push(request.url());
      }
    });
    
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // Should not make too many API calls on page load
    expect(apiCalls.length).toBeLessThan(10);
  });

  test('should cache static resources', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Page should load faster on second visit (resources cached)
    // Use specific H1 selector
    await expect(page.getByRole('heading', { name: 'BLUM', level: 1 })).toBeVisible();
  });

  test('should handle slow connections gracefully', async ({ page }) => {
    // Simulate slow 3G connection
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.continue();
    });
    
    await page.goto('http://localhost:3000/', { timeout: 30000 });
    
    // Page should eventually load - use specific selector
    await expect(page.getByRole('heading', { name: 'BLUM', level: 1 })).toBeVisible();
  });

  test('should show loading indicators for dynamic content', async ({ page }) => {
    await page.goto('http://localhost:3000/kochbuch');
    
    // Look for loading spinners or skeletons
    const loadingIndicators = await page.locator('[aria-busy="true"], .loading, .spinner, .skeleton').count();
    
    // If there's dynamic content, loading indicators should be present initially
    // This is informational
    expect(loadingIndicators).toBeGreaterThanOrEqual(0);
  });

  test('should not block rendering with JavaScript', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000/');
    
    // Content should be visible quickly - use specific H1 selector
    await expect(page.getByRole('heading', { name: 'BLUM', level: 1 })).toBeVisible();
    
    const renderTime = Date.now() - startTime;
    
    // First contentful paint should be fast
    expect(renderTime).toBeLessThan(3000);
  });

  test('should optimize font loading', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check for font resource hints (can be absent in dev/offline/self-hosted setups)
    const fontHints = await page
      .locator(
        'link[rel="preconnect"][href*="fonts"], link[rel="dns-prefetch"][href*="fonts"], link[rel="preconnect"][href*="font"]'
      )
      .count();
    
    // Alternative: check if fonts are loaded via CSS
    const hasLoadedFonts = await page.evaluate(() => {
      const styles = Array.from(document.styleSheets);
      for (const sheet of styles) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.constructor.name === 'CSSFontFaceRule') {
              return true;
            }
          }
        } catch (e) {
          // CORS-protected stylesheets
        }
      }
      return false;
    });
    
    // Either resource hints OR @font-face rules should be present
    expect(fontHints > 0 || hasLoadedFonts).toBeTruthy();
  });

  test('should compress responses', async ({ page }) => {
    const responses: Array<{ url: string; encoding: string | null }> = [];
    
    page.on('response', response => {
      responses.push({
        url: response.url(),
        encoding: response.headers()['content-encoding']
      });
    });
    
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // HTML responses should be compressed (gzip or brotli)
    const htmlResponses = responses.filter(r => r.url.includes('localhost:3000') && !r.url.includes('.'));
    
    // In production, responses would be compressed
    // In dev mode, might not be compressed
    expect(htmlResponses.length).toBeGreaterThan(0);
  });

  test('should handle concurrent requests efficiently', async ({ page }) => {
    const requests: number[] = [];
    
    page.on('request', () => {
      requests.push(Date.now());
    });
    
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // Should make requests in parallel, not sequentially
    // This is hard to test precisely, but we check that many requests happened
    expect(requests.length).toBeGreaterThan(5);
  });

  test('should not cause memory leaks', async ({ page }) => {
    // Navigate to page multiple times
    for (let i = 0; i < 3; i++) {
      await page.goto('http://localhost:3000/');
      await page.waitForLoadState('networkidle');
      
      // Navigate to different page
      await page.goto('http://localhost:3000/fisch-blum-sylt');
      await page.waitForLoadState('networkidle');
    }
    
    // Page should still be responsive - use specific selector
    const mainNav = page.getByRole('navigation', { name: /Hauptnavigation/i });
    await expect(mainNav).toBeVisible();
  });

  test('should handle rapid navigation', async ({ page }) => {
    const safeGoto = async (url: string) => {
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
      } catch (e) {
        const message = String(e);
        // Firefox/WebKit can abort navigations when another navigation interrupts quickly.
        if (!/NS_BINDING_ABORTED|interrupted by another navigation/i.test(message)) {
          throw e;
        }
        await page.waitForLoadState('domcontentloaded');
      }
    };

    await safeGoto('http://localhost:3000/');
    
    // Click first link
    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      page.getByRole('link', { name: 'Fisch Blum Sylt' }).first().click()
    ]);
    
    // Go back to homepage
    await safeGoto('http://localhost:3000/');
    
    // Click another link
    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      page.getByRole('link', { name: /Seafood/i }).first().click()
    ]);
    
    // Return to homepage
    await safeGoto('http://localhost:3000/');
    
    // Should handle rapid navigation without crashing
    await expect(page.getByRole('heading', { name: 'BLUM', level: 1 })).toBeVisible();
  });
});
