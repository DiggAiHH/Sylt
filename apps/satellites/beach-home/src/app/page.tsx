import { HeroVideo, Container, Button, AnimatedSection, Heading, Text, Navigation, Footer } from '@sylt/ui';

const navItems = [
  { label: 'Unterkünfte', href: '#unterkuenfte' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Kontakt', href: '#kontakt' },
];

const footerColumns = [
  { title: 'Beach Home', links: [{ label: 'Unsere Unterkünfte', href: '#unterkuenfte' }] },
  { title: 'BLUM Hotels', links: [{ label: 'blumsylthotels.de', href: 'https://blumsylthotels.de' }] },
];

export default function BeachHomePage() {
  return (
    <main>
      <Navigation
        logo={<span className="font-heading text-2xl text-white">BEACH<span className="text-sand-400">HOME</span></span>}
        items={navItems}
        transparent={true}
      />

      <HeroVideo
        videoSrc="/videos/beach-home.mp4"
        posterSrc="/images/beach-home-hero.jpg"
        title="Beach Home"
        subtitle="Direkt am Strand – Nordsee pur"
        height="full"
      >
        <Button size="lg" variant="outline">Strandnah entdecken</Button>
      </HeroVideo>

      <section className="luxury-section bg-white">
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Text variant="accent" className="text-nordsee-500 mb-4">Meerblick</Text>
            <Heading as="h2" size="xl" className="mb-6">Aufwachen mit Wellenrauschen</Heading>
            <Text variant="lead">
              Beach Home bietet exklusive Strandunterkünfte mit direktem Zugang zur Nordsee. 
              Erleben Sie das Meer von Ihrer Terrasse aus – ungestört und unvergesslich.
            </Text>
          </AnimatedSection>
        </Container>
      </section>

      <Footer
        logo={<span className="font-heading text-2xl text-white">BEACH<span className="text-sand-400">HOME</span></span>}
        columns={footerColumns}
        copyright="© 2024 Beach Home - Ein BLUM Sylt Hotel"
      />
    </main>
  );
}
