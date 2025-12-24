import React from "react";
import Link from "next/link";

/**
 * Breadcrumb navigation for senior-friendly orientation.
 * Helps users understand their location in the site hierarchy.
 * Large fonts and clear visual separators for accessibility.
 */

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav 
      className="bg-deep-sea-blue-50 py-4 px-6 border-b border-deep-sea-blue-200"
      aria-label="Brotkrümel-Navigation"
    >
      <div className="max-w-6xl mx-auto">
        {/* Senior-friendly: Large text, clear separators, visible links */}
        <ol 
          className="flex flex-wrap items-center gap-2 text-lg"
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li 
                key={item.path} 
                className="flex items-center gap-2"
                itemScope 
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                {isLast ? (
                  // Current page - not a link, bold for emphasis
                  <span 
                    className="font-bold text-deep-sea-blue"
                    itemProp="name"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.path}
                      className="text-rich-gold-600 hover:text-rich-gold transition-colors underline underline-offset-4 decoration-2 py-1 focus:ring-2 focus:ring-rich-gold focus:ring-offset-2 rounded"
                      itemProp="item"
                    >
                      <span itemProp="name">{item.name}</span>
                    </Link>
                    {/* Large, visible separator */}
                    <span className="text-deep-sea-blue-400 text-2xl font-bold" aria-hidden="true">
                      ›
                    </span>
                  </>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
