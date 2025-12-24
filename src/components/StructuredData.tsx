/**
 * StructuredData Component
 * Injects JSON-LD structured data for enhanced SEO and rich search results
 * Supports multiple Schema.org types: Organization, LocalBusiness, WebPage, Breadcrumb
 */

import { 
  generateOrganizationSchema, 
  generateLocalBusinessSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema 
} from "@/lib/constants";

type SchemaType = "organization" | "localBusiness" | "webPage" | "breadcrumb";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface StructuredDataProps {
  readonly type?: SchemaType;
  readonly brandName?: string;
  readonly pageName?: string;
  readonly pageDescription?: string;
  readonly pagePath?: string;
  readonly breadcrumbs?: BreadcrumbItem[];
}

export default function StructuredData({
  type = "organization",
  brandName,
  pageName,
  pageDescription,
  pagePath,
  breadcrumbs,
}: StructuredDataProps) {
  // Generate schema based on type - safely handle each case
  let schema: object;
  
  switch (type) {
    case "localBusiness":
      schema = generateLocalBusinessSchema(brandName);
      break;
    case "webPage":
      if (pageName && pageDescription && pagePath) {
        schema = generateWebPageSchema(pageName, pageDescription, pagePath, breadcrumbs);
      } else {
        schema = generateOrganizationSchema();
      }
      break;
    case "breadcrumb":
      if (breadcrumbs && breadcrumbs.length > 0) {
        schema = generateBreadcrumbSchema(breadcrumbs);
      } else {
        schema = generateOrganizationSchema();
      }
      break;
    case "organization":
    default:
      schema = generateOrganizationSchema();
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Minified output for performance
        __html: JSON.stringify(schema),
      }}
    />
  );
}

/** Combined structured data for pages with multiple schemas */
export function CombinedStructuredData({
  brandName,
  pageName,
  pageDescription,
  pagePath,
  breadcrumbs,
}: Omit<StructuredDataProps, "type">) {
  return (
    <>
      <StructuredData type="organization" />
      <StructuredData type="localBusiness" brandName={brandName} />
      {pageName && pageDescription && pagePath && (
        <StructuredData 
          type="webPage" 
          pageName={pageName}
          pageDescription={pageDescription}
          pagePath={pagePath}
          breadcrumbs={breadcrumbs}
        />
      )}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <StructuredData type="breadcrumb" breadcrumbs={breadcrumbs} />
      )}
    </>
  );
}
