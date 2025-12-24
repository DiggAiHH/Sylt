import React from "react";

/**
 * NiceClasses component for displaying DPMA Nizza classification.
 * Senior-friendly design with large fonts, high contrast, and clear hierarchy.
 */

interface NiceClass {
  number: number;
  name: string;
  description: string;
}

interface NiceClassesProps {
  classes: NiceClass[];
}

export default function NiceClasses({ classes }: NiceClassesProps) {
  return (
    <section className="py-16" aria-labelledby="nice-classes-heading">
      <div className="max-w-4xl mx-auto px-6">
        {/* Senior-friendly: Larger headings for better visibility */}
        <h2 
          id="nice-classes-heading"
          className="text-3xl md:text-4xl font-serif text-deep-sea-blue mb-6"
        >
          Waren- und Dienstleistungsverzeichnis
        </h2>
        <p className="text-deep-sea-blue-700 mb-10 text-xl">
          Registrierte Nizza-Klassifikation:
        </p>
        {/* Senior-friendly: More spacing between items, larger border */}
        <div className="space-y-8">
          {classes.map((niceClass) => (
            <article
              key={niceClass.number}
              className="border-l-8 border-rich-gold pl-6 py-4 bg-white rounded-r-lg shadow-sm"
            >
              {/* Senior-friendly: Larger class number and name */}
              <h3 className="font-bold text-deep-sea-blue text-xl md:text-2xl">
                Klasse {niceClass.number}: {niceClass.name}
              </h3>
              {/* Senior-friendly: Larger description text with good contrast */}
              <p className="text-deep-sea-blue-700 mt-3 text-lg leading-relaxed">
                {niceClass.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
