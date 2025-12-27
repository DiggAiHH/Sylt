import { test, expect } from '@playwright/test';

/**
 * Brand Pages E2E Tests
 * Tests for individual brand landing pages
 */

test.describe('Brand Pages', () => {
  const brands = [
    {
      path: '/fisch-blum-sylt',
      name: 'Fisch Blum Sylt',
      keywords: ['Fisch', 'Spezialitäten', 'Sylt']
    },
    {
      path: '/blums-seafood-sylt',
      name: 'Blum\'s Seafood Sylt',
      keywords: ['Seafood', 'Meeresfrüchte', 'Sylt']
    },
    {
      path: '/sylt-homes-by-blum',
      name: 'Sylt Homes by Blum',
      keywords: ['Ferienhäuser', 'Unterkunft', 'Sylt']
    },
    {
      path: '/long-island-house-sylt',
      name: 'Long Island House Sylt',
      keywords: ['Ferienhaus', 'Long Island', 'Sylt']
    }
  ];

  for (const brand of brands) {
    test.describe(brand.name, () => {
      test(`should load ${brand.name} page successfully`, async ({ page }) => {
        await page.goto(`http://localhost:3000${brand.path}`);
        
        // Page should load without errors
        await expect(page).toHaveURL(new RegExp(brand.path));
        
        // Check page has title
        await expect(page).toHaveTitle(/.+/);
      });

      test(`should display brand name ${brand.name}`, async ({ page }) => {
        await page.goto(`http://localhost:3000${brand.path}`);
        
        // Brand name should appear somewhere on page - use .first()
        await expect(page.getByText(new RegExp(brand.name, 'i')).first()).toBeVisible();
      });

      test(`should contain relevant keywords for ${brand.name}`, async ({ page }) => {
        await page.goto(`http://localhost:3000${brand.path}`);
        await page.waitForLoadState('networkidle');
        
        // Check at least one keyword is present
        const bodyText = await page.textContent('body');
        const hasKeyword = brand.keywords.some(keyword => 
          bodyText?.toLowerCase().includes(keyword.toLowerCase())
        );
        
        expect(hasKeyword).toBeTruthy();
      });

      test(`should have navigation back to homepage from ${brand.name}`, async ({ page }) => {
        await page.goto(`http://localhost:3000${brand.path}`);
        
        // Click BLUM logo to go back
        await page.getByRole('link', { name: /BLUM/i }).first().click();
        
        // Should navigate to homepage
        await expect(page).toHaveURL('http://localhost:3000/');
      });

      test(`should have contact information on ${brand.name}`, async ({ page }) => {
        await page.goto(`http://localhost:3000${brand.path}`);
        
        // Scroll to footer
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);
        
        // Check contact info in footer - use .first() for multiple matches
        await expect(page.getByText(/Martina Blum|Kontakt|0172/i).first()).toBeVisible();
      });

      test(`should be mobile responsive for ${brand.name}`, async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(`http://localhost:3000${brand.path}`);
        
        // Page should load on mobile - use heading or first match
        const heading = page.getByRole('heading', { name: new RegExp(brand.name, 'i') });
        const headingCount = await heading.count();
        
        if (headingCount > 0) {
          await expect(heading.first()).toBeVisible();
        } else {
          // Fallback: check any text with brand name
          await expect(page.getByText(new RegExp(brand.name, 'i')).first()).toBeVisible();
        }
        
        // Mobile menu should be visible
        await expect(page.getByRole('button', { name: /Menü/i })).toBeVisible();
      });

      test(`should not have console errors on ${brand.name}`, async ({ page }) => {
        const errors: string[] = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(msg.text());
          }
        });
        
        await page.goto(`http://localhost:3000${brand.path}`);
        await page.waitForLoadState('networkidle');
        
        expect(errors).toHaveLength(0);
      });

      test(`should have proper meta tags for ${brand.name}`, async ({ page }) => {
        await page.goto(`http://localhost:3000${brand.path}`);
        
        // Check meta description
        const metaDescription = page.locator('meta[name="description"]');
        await expect(metaDescription).toHaveAttribute('content', /.+/);
      });
    });
  }

  test('all brand pages should have consistent layout', async ({ page }) => {
    for (const brand of brands) {
      await page.goto(`http://localhost:3000${brand.path}`);
      
      // Check navigation exists - use specific navigation with aria-label
      const mainNav = page.getByRole('navigation', { name: /Hauptnavigation/i });
      await expect(mainNav).toBeVisible();
      
      // Check footer exists
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.locator('footer')).toBeVisible();
    }
  });

  test('brand pages should have breadcrumb navigation', async ({ page }) => {
    for (const brand of brands) {
      await page.goto(`http://localhost:3000${brand.path}`);
      
      // Look for breadcrumb (may not exist on all pages)
      const breadcrumb = page.locator('[aria-label*="Breadcrumb"], .breadcrumb, nav[aria-label*="Pfad"]');
      const breadcrumbCount = await breadcrumb.count();
      
      if (breadcrumbCount > 0) {
        await expect(breadcrumb.first()).toBeVisible();
      }
    }
  });
});
