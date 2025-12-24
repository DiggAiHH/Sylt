/**
 * StructuredData Component
 * Injects JSON-LD structured data for enhanced SEO and rich search results
 * Follows Schema.org standards for Organization markup
 */

import { generateOrganizationSchema } from "@/lib/constants";

interface StructuredDataProps {
  readonly type?: "organization" | "webpage";
  readonly pageTitle?: string;
  readonly pageDescription?: string;
}

export default function StructuredData({
  type = "organization",
}: StructuredDataProps) {
  // Generate schema based on type
  const schema = type === "organization" ? generateOrganizationSchema() : generateOrganizationSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 0),
      }}
    />
  );
}
