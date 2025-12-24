import Link from 'next/link';
import { brands } from '@blumsylt/shared';

export default function HubHomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-nordsee-900 via-nordsee-700 to-reetdach-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-4 tracking-wide">
            Blum Sylt Hotels
          </h1>
          <p className="font-sans text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Zentrale Buchungsplattform für exklusive Unterkünfte auf Sylt
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20 md:py-32 bg-sand-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-reetdach-900 mb-4">
              Unsere Marken
            </h2>
            <p className="text-reetdach-600 max-w-2xl mx-auto">
              Entdecken Sie unsere exklusive Auswahl an Ferienunterkünften auf der wunderschönen Insel Sylt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(brands).map((brand) => (
              <Link
                key={brand.id}
                href={`/properties?brand=${brand.id}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div 
                  className="h-48 flex items-center justify-center"
                  style={{ backgroundColor: brand.secondaryColor }}
                >
                  <h3 
                    className="font-serif text-2xl md:text-3xl transition-transform group-hover:scale-105"
                    style={{ color: brand.primaryColor }}
                  >
                    {brand.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-reetdach-500 mb-2">{brand.tagline}</p>
                  <p className="text-reetdach-600">{brand.description}</p>
                  <div className="mt-4 flex items-center text-nordsee-600 font-medium">
                    <span>Unterkünfte entdecken</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-nordsee-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-nordsee-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-reetdach-900 mb-3">Sichere Zahlung</h3>
              <p className="text-reetdach-600">Verschlüsselte Zahlungsabwicklung mit Stripe für maximale Sicherheit.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sand-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-sand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-reetdach-900 mb-3">Echtzeit-Verfügbarkeit</h3>
              <p className="text-reetdach-600">Aktuelle Verfügbarkeiten durch automatische Kalender-Synchronisation.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-reetdach-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-reetdach-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-reetdach-900 mb-3">Beste Preisgarantie</h3>
              <p className="text-reetdach-600">Direktbuchung garantiert den besten verfügbaren Preis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-reetdach-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <h4 className="font-serif text-2xl mb-4">Blum Sylt Hotels</h4>
            <p className="text-reetdach-300 mb-6">Exklusive Unterkünfte auf Deutschlands schönster Insel</p>
            <p className="text-sm text-reetdach-400">
              © {new Date().getFullYear()} Blum Sylt Hotels. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
