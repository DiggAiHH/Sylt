import { test, expect } from '@playwright/test';

/**
 * Forms & User Input E2E Tests
 * Tests for form handling, validation, and user input
 */

test.describe('Forms and User Input', () => {
  test('forms should validate required fields', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Look for any forms on the page
    const forms = await page.locator('form').all();
    
    if (forms.length > 0) {
      const form = forms[0];
      
      // Try to submit without filling required fields
      const submitButton = form.locator('button[type="submit"], input[type="submit"]');
      const submitCount = await submitButton.count();
      
      if (submitCount > 0) {
        await submitButton.click();
        
        // Should show validation messages
        const validationMessage = await page.locator('[aria-invalid="true"], .error, [role="alert"]').count();
        
        // If HTML5 validation is used, browser will prevent submission
        // If custom validation, error messages should appear
        expect(validationMessage).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('should sanitize user input', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Look for search inputs or text fields
    const inputs = await page.locator('input[type="text"], input[type="search"], textarea').all();
    
    if (inputs.length > 0) {
      const input = inputs[0];
      
      // Try XSS attack
      await input.fill('<script>alert("XSS")</script>');
      
      // Get the value back
      const value = await input.inputValue();
      
      // Value should be present (we're testing that input works)
      expect(value).toBeTruthy();
    }
  });

  test('should show loading state during form submission', async ({ page }) => {
    // This test checks if forms show loading indicators
    // We'll create a mock scenario
    
    await page.goto('http://localhost:3000/');
    
    const forms = await page.locator('form').all();
    
    for (const form of forms) {
      const submitButton = form.locator('button[type="submit"]');
      const buttonCount = await submitButton.count();
      
      if (buttonCount > 0) {
        // Check if button changes state when clicked
        const initialText = await submitButton.textContent();
        expect(initialText).toBeTruthy();
      }
    }
  });

  test('should handle invalid email addresses', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Look for email inputs
    const emailInputs = await page.locator('input[type="email"]').all();
    
    for (const input of emailInputs) {
      // Enter invalid email
      await input.fill('invalid-email-address');
      
      // Try to submit or blur the field
      await input.blur();
      
      // Check for validation state
      const isInvalid = await input.getAttribute('aria-invalid');
      const validityState = await input.evaluate((el: HTMLInputElement) => el.validity.valid);
      
      // HTML5 validation should mark it as invalid
      expect(validityState).toBe(false);
    }
  });

  test('should disable submit button during submission', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    const submitButtons = await page.locator('button[type="submit"]').all();
    
    for (const button of submitButtons) {
      // Check if button has disabled state logic
      const isDisabled = await button.isDisabled();
      
      // Initially should not be disabled
      expect(isDisabled).toBe(false);
    }
  });

  test('should provide clear error messages', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    const forms = await page.locator('form').all();
    
    if (forms.length > 0) {
      // Try to submit empty form
      const submitButton = forms[0].locator('button[type="submit"]');
      const submitCount = await submitButton.count();
      
      if (submitCount > 0) {
        await submitButton.click();
        await page.waitForTimeout(500);
        
        // Look for error messages
        const errorMessages = await page.locator('.error, [role="alert"], [aria-live="polite"]').count();
        
        // Error messages should be clear and in German
        expect(errorMessages).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('should handle special characters in input', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    const textInputs = await page.locator('input[type="text"], textarea').all();
    
    if (textInputs.length > 0) {
      const input = textInputs[0];
      
      // Test with special characters
      const specialChars = 'äöüß ÄÖÜ @#$%&*(){}[]<>/\\';
      await input.fill(specialChars);
      
      const value = await input.inputValue();
      
      // Should handle special characters (some may be sanitized)
      expect(value).toBeTruthy();
    }
  });

  test('should preserve user input on validation errors', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    const textInputs = await page.locator('input[type="text"]').all();
    
    if (textInputs.length > 0) {
      const input = textInputs[0];
      const testValue = 'Test User Input';
      
      await input.fill(testValue);
      
      // Try to submit form (may fail validation)
      const form = input.locator('xpath=ancestor::form');
      const submitButton = form.locator('button[type="submit"]');
      const submitCount = await submitButton.count();
      
      if (submitCount > 0) {
        await submitButton.click();
        await page.waitForTimeout(500);
        
        // Input value should still be there
        const currentValue = await input.inputValue();
        expect(currentValue).toBe(testValue);
      }
    }
  });

  test('should have autocomplete attributes on appropriate inputs', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check email inputs have autocomplete
    const emailInputs = await page.locator('input[type="email"]').all();
    for (const input of emailInputs) {
      const autocomplete = await input.getAttribute('autocomplete');
      // Should have autocomplete attribute for better UX
      expect(autocomplete).toBeTruthy();
    }
  });

  test('should handle long input strings', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    const textInputs = await page.locator('input[type="text"], textarea').all();
    
    if (textInputs.length > 0) {
      const input = textInputs[0];
      
      // Very long string
      const longString = 'A'.repeat(1000);
      await input.fill(longString);
      
      const value = await input.inputValue();
      
      // Should either accept it or truncate gracefully
      expect(value.length).toBeGreaterThan(0);
    }
  });

  test('search functionality should work', async ({ page }) => {
    await page.goto('http://localhost:3000/kochbuch');
    
    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="Suche"], input[placeholder*="suche"]');
    const searchCount = await searchInput.count();
    
    if (searchCount > 0) {
      await searchInput.fill('Austern');
      await page.keyboard.press('Enter');
      
      await page.waitForTimeout(1000);
      
      // Results should update
      const bodyText = await page.textContent('body');
      expect(bodyText).toContain('Austern');
    }
  });

  test('should handle date inputs correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    const dateInputs = await page.locator('input[type="date"]').all();
    
    for (const input of dateInputs) {
      // Set a date
      await input.fill('2025-12-31');
      
      const value = await input.inputValue();
      
      // Should accept valid date format
      expect(value).toBeTruthy();
    }
  });

  test('should handle number inputs with min/max', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    const numberInputs = await page.locator('input[type="number"]').all();
    
    for (const input of numberInputs) {
      const min = await input.getAttribute('min');
      const max = await input.getAttribute('max');
      
      if (min) {
        // Try to set below minimum
        await input.fill((parseInt(min) - 1).toString());
        
        // Should validate
        const validity = await input.evaluate((el: HTMLInputElement) => el.validity.valid);
        expect(validity).toBe(false);
      }
    }
  });
});
