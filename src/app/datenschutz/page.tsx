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
  title: "Datenschutz | BLUM Markenportfolio",
  description: "Datenschutzerklärung - BLUM Marken aus Sylt. Informationen zum Datenschutz gemäß DSGVO.",
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif font-bold text-deep-sea-blue mb-8">
          Datenschutzerklärung
        </h1>
        
        <div className="prose prose-lg text-deep-sea-blue-700">
          <h2 className="text-2xl font-serif text-deep-sea-blue mt-8 mb-4">
            1. Datenschutz auf einen Blick
          </h2>
          <h3 className="text-xl font-semibold text-deep-sea-blue mt-6 mb-3">
            Allgemeine Hinweise
          </h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit 
            Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. 
            Personenbezogene Daten sind alle Daten, mit denen Sie persönlich 
            identifiziert werden können.
          </p>

          <h3 className="text-xl font-semibold text-deep-sea-blue mt-6 mb-3">
            Datenerfassung auf dieser Website
          </h3>
          <p>
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
            Dessen Kontaktdaten können Sie dem Abschnitt &ldquo;Hinweis zur Verantwortlichen Stelle&rdquo; 
            in dieser Datenschutzerklärung entnehmen.
          </p>

          <h2 className="text-2xl font-serif text-deep-sea-blue mt-8 mb-4">
            2. Hinweis zur verantwortlichen Stelle
          </h2>
          <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
          <address className="not-italic my-4">
            Martina Blum<br />
            Eidumweg 13<br />
            25980 Sylt<br /><br />
            Telefon: <a href="tel:+491724008846" className="text-rich-gold hover:underline">0172-4008846</a><br />
            E-Mail: <a href="mailto:blumsylt@web.de" className="text-rich-gold hover:underline">blumsylt@web.de</a>
          </address>

          <h2 className="text-2xl font-serif text-deep-sea-blue mt-8 mb-4">
            3. Hosting
          </h2>
          <p>
            Die Inhalte unserer Website werden bei einem externen Dienstleister gehostet (Hoster). 
            Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den 
            Servern des Hosters gespeichert.
          </p>

          <h2 className="text-2xl font-serif text-deep-sea-blue mt-8 mb-4">
            4. Allgemeine Hinweise und Pflichtinformationen
          </h2>
          <h3 className="text-xl font-semibold text-deep-sea-blue mt-6 mb-3">
            Datenschutz
          </h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
            Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den 
            gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h3 className="text-xl font-semibold text-deep-sea-blue mt-6 mb-3">
            Ihre Rechte
          </h3>
          <p>Sie haben jederzeit das Recht:</p>
          <ul className="list-disc list-inside my-4">
            <li>Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten</li>
            <li>Berichtigung unrichtiger personenbezogener Daten zu verlangen</li>
            <li>Löschung Ihrer personenbezogenen Daten zu verlangen</li>
            <li>Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen</li>
            <li>Ihre personenbezogenen Daten in einem strukturierten Format zu erhalten</li>
            <li>Widerspruch gegen die Verarbeitung einzulegen</li>
          </ul>

          <h2 className="text-2xl font-serif text-deep-sea-blue mt-8 mb-4">
            5. Cookies
          </h2>
          <p>
            Diese Website verwendet nur technisch notwendige Cookies. 
            Diese Cookies sind für den Betrieb der Website erforderlich und können 
            nicht deaktiviert werden. Es werden keine Tracking-Cookies oder 
            Cookies zu Werbezwecken eingesetzt.
          </p>

          <h2 className="text-2xl font-serif text-deep-sea-blue mt-8 mb-4">
            6. Kontaktformular und E-Mail-Kontakt
          </h2>
          <p>
            Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben inklusive 
            der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage 
            und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten 
            geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
        </div>
      </div>
    </div>
  );
}
