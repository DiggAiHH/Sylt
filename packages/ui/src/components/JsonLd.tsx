'use client';

import { memo } from 'react';

/**
 * JSON-LD Structured Data Component
 * 
 * Renders Schema.org structured data in a script tag
 * for search engine optimization.
 * 
 * @example
 * <JsonLd data={generateOrganizationSchema()} />
 */
interface JsonLdProps {
  /** Schema.org structured data object */
  data: Record<string, unknown>;
  /** Optional unique identifier for the script tag */
  id?: string;
}

function JsonLdComponent({ data, id }: JsonLdProps) {
  // Serialize the structured data safely
  const jsonString = JSON.stringify(data, null, 0);

  return (
    <script
      id={id}
      type="application/ld+json"
      // Using dangerouslySetInnerHTML is safe here because we control the JSON input
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

/**
 * Memoized JSON-LD component
 * Prevents unnecessary re-renders since structured data rarely changes
 */
export const JsonLd = memo(JsonLdComponent);

JsonLd.displayName = 'JsonLd';

/**
 * Multiple JSON-LD schemas component
 * Renders multiple structured data objects in separate script tags
 */
interface MultipleJsonLdProps {
  schemas: Array<{
    id: string;
    data: Record<string, unknown>;
  }>;
}

export function MultipleJsonLd({ schemas }: MultipleJsonLdProps) {
  return (
    <>
      {schemas.map((schema) => (
        <JsonLd key={schema.id} id={schema.id} data={schema.data} />
      ))}
    </>
  );
}
