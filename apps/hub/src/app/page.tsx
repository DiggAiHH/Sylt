import React from 'react';
import Link from 'next/link';
import { brands } from '@sylt/shared';
import { HeroVideo, AnimatedSection, FeatureGrid, Button } from '@sylt/ui';
import { GlobalSearch } from '../components/GlobalSearch';
import { ArrowRight, Star, Shield, Heart } from 'lucide-react';

export default function HubHomePage() {
  return (
    <main className="min-h-screen bg-offwhite">
      {/* Hero Section */}
      <HeroVideo
        videoSrc="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38af1e1e3631796a8&profile_id=165&oauth2_token_id=57447761" // Placeholder: Waves
        title="Willkommen auf Sylt"
        subtitle="Entdecken Sie die exklusivsten Unterkünfte der Insel. Von Reetdach-Romantik bis Urban-Chic."
        overlayOpacity={0.4}
      >
        <div className="mt-12 w-full flex justify-center px-4">
          <GlobalSearch />
        </div>
      </HeroVideo>

      {/* Brand Grid */}
      <section className="py-24 bg-sand-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <AnimatedSection className="text-center mb-20">
            <span className="text-nordsee-600 font-medium tracking-widest uppercase text-sm mb-4 block">
              Unsere Kollektion
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-reetdach-900 mb-6">
              Für jeden Anspruch das Besondere
            </h2>
            <p className="text-reetdach-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Jede unserer Marken steht für ein einzigartiges Urlaubserlebnis. 
              Finden Sie Ihr persönliches Zuhause auf Zeit.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(brands).map((brand, index) => (
              <AnimatedSection 
                key={brand.id} 
                delay={index * 0.1}
                className="group relative h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <Link href={`/properties?brand=${brand.id}`} className="block h-full w-full">
                  {/* Background Color/Image Placeholder */}
                  <div 
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundColor: brand.secondaryColor }}
                  />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-serif text-3xl mb-2">{brand.name}</h3>
                      <p className="text-white/90 mb-6 line-clamp-2 font-light">
                        {brand.tagline}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Entdecken <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Logo Placeholder (Top Right) */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: brand.primaryColor }} />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-serif text-4xl text-reetdach-900 mb-4">
              Warum Blum Sylt?
            </h2>
          </AnimatedSection>

          <FeatureGrid
            features={[
              {
                title: 'Exklusive Auswahl',
                description: 'Handverlesene Unterkünfte, die höchsten Qualitätsstandards entsprechen.',
                icon: <Star className="w-6 h-6" />,
              },
              {
                title: 'Persönlicher Service',
                description: 'Unser Team vor Ort ist 7 Tage die Woche für Sie da.',
                icon: <Heart className="w-6 h-6" />,
              },
              {
                title: 'Sichere Buchung',
                description: 'Direkt beim Vermieter buchen – ohne versteckte Gebühren.',
                icon: <Shield className="w-6 h-6" />,
              },
            ]}
            columns={3}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-reetdach-900 text-sand-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/patterns/noise.png')]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Bereit für Ihre Auszeit?
          </h2>
          <p className="text-xl text-sand-200 mb-10 max-w-2xl mx-auto">
            Lassen Sie den Alltag hinter sich und genießen Sie die Weite der Nordsee.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            className="bg-sand-50 text-reetdach-900 hover:bg-white"
          >
            Jetzt Urlaub finden
          </Button>
        </div>
      </section>
    </main>
  );
}
