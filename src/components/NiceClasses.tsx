import React from "react";

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
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-serif text-deep-sea-blue mb-6">
          Waren- und Dienstleistungsverzeichnis
        </h2>
        <p className="text-deep-sea-blue-600 mb-8">
          Registrierte Nizza-Klassifikation:
        </p>
        <div className="space-y-6">
          {classes.map((niceClass) => (
            <div
              key={niceClass.number}
              className="border-l-4 border-rich-gold pl-4 py-2"
            >
              <h3 className="font-semibold text-deep-sea-blue">
                Klasse {niceClass.number}: {niceClass.name}
              </h3>
              <p className="text-deep-sea-blue-600 mt-1">
                {niceClass.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
