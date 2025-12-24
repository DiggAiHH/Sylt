import type { Metadata } from "next";

export const metadata: Metadata = {
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
