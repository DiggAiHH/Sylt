import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | BLUM auf Sylt",
  description: "Datenschutzerklärung für BLUM auf Sylt - Informationen zum Umgang mit Ihren personenbezogenen Daten.",
};

export default function DatenschutzPage() {
  return (
    <div className="bg-sand-light min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-reetdach to-reetdach-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extralight tracking-wide mb-4">
            Datenschutzerklärung
          </h1>
          <p className="text-sand-light/80">Informationen zum Datenschutz</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none space-y-12">
            
            {/* Verantwortlicher */}
            <div>
              <h2 className="text-2xl font-light text-reetdach-dark mb-4">
                1. Verantwortlicher
              </h2>
              <p className="text-reetdach leading-relaxed mb-4">
                Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
              </p>
              <address className="not-italic text-reetdach leading-relaxed bg-sand-light p-4 rounded-lg">
                <p className="font-medium text-nordsee-dark">Martina Blum</p>
                <p>Eidumweg 13</p>
                <p>25980 Sylt</p>
                <p className="mt-2">E-Mail: blumsylt@web.de</p>
                <p>Telefon: 0172-4008846</p>
              </address>
            </div>

            {/* Datenerfassung */}
            <div>
              <h2 className="text-2xl font-light text-reetdach-dark mb-4">
                2. Datenerfassung auf dieser Website
              </h2>
              
              <h3 className="text-lg font-medium text-reetdach-dark mb-2">Server-Log-Dateien</h3>
              <p className="text-reetdach leading-relaxed mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
                Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside text-reetdach space-y-1 mb-4">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-reetdach leading-relaxed">
                Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.
              </p>
            </div>

            {/* Ihre Rechte */}
            <div>
              <h2 className="text-2xl font-light text-reetdach-dark mb-4">
                3. Ihre Rechte
              </h2>
              <p className="text-reetdach leading-relaxed mb-4">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und 
                Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem 
                ein Recht auf:
              </p>
              <ul className="list-disc list-inside text-reetdach space-y-1">
                <li>Berichtigung unrichtiger Daten</li>
                <li>Löschung Ihrer Daten</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Widerruf erteilter Einwilligungen</li>
                <li>Beschwerde bei einer Aufsichtsbehörde</li>
              </ul>
            </div>

            {/* Kontaktaufnahme */}
            <div>
              <h2 className="text-2xl font-light text-reetdach-dark mb-4">
                4. Kontaktaufnahme
              </h2>
              <p className="text-reetdach leading-relaxed">
                Wenn Sie uns per E-Mail oder Telefon kontaktieren, werden Ihre Angaben inklusive 
                der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für 
                den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne 
                Ihre Einwilligung weiter.
              </p>
            </div>

            {/* SSL-Verschlüsselung */}
            <div>
              <h2 className="text-2xl font-light text-reetdach-dark mb-4">
                5. SSL-Verschlüsselung
              </h2>
              <p className="text-reetdach leading-relaxed">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher 
                Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, 
                dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem 
                Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </div>

            {/* Aktualisierung */}
            <div className="bg-sand-light p-6 rounded-lg">
              <p className="text-reetdach-light text-sm">
                Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
