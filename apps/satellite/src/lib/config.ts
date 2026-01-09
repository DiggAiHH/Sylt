import { getBrand as getSharedBrand, hubConfig } from '@sylt/shared';
import type { BrandId, Brand } from '@sylt/shared';

/**
 * Get the brand configuration for the current satellite deployment.
 * Uses NEXT_PUBLIC_BRAND_ID environment variable which is embedded at build time.
 * This is the expected behavior for static/hybrid Next.js builds where each
 * satellite deployment has a different brand ID configured.
 */
export function getBrandConfig(): { brand: Brand; brandId: BrandId } {
  const brandId = (process.env.NEXT_PUBLIC_BRAND_ID || 'syltrooms') as BrandId;
  const brand = getSharedBrand(brandId);
  return { brand, brandId };
}

/**
 * Get the hub URL configuration.
 * Uses NEXT_PUBLIC_HUB_URL environment variable for the booking hub redirect.
 */
export function getHubUrl(): string {
  return process.env.NEXT_PUBLIC_HUB_URL || hubConfig.baseUrl;
}

/**
 * Re-export for convenience
 */
export { hubConfig };
