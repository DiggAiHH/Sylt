import { HeroVideo, Container, Button, AnimatedSection, Heading, Text, Navigation, Footer } from '@sylt/ui';

const navItems = [
  { label: 'Apartments', href: '#apartments' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Kontakt', href: '#kontakt' },
];

const footerColumns = [
  { title: 'Auster Appartements', links: [{ label: 'Unsere Apartments', href: '#apartments' }] },
  { title: 'BLUM Hotels', links: [{ label: 'blumsylthotels.de', href: 'https://blumsylthotels.de' }] },
];

export default function AusterAppartementsPage() {
  return (
    <main>
      <Navigation
        logo={<span className="font-heading text-2xl text-white">AUSTER<span className="text-sand-400">APPARTEMENTS</span></span>}
        items={navItems}
        transparent={true}
      />

      <HeroVideo
        videoSrc="/videos/auster.mp4"
        posterSrc="/images/auster-hero.jpg"
        title="Auster Appartements"
        subtitle="Moderne Apartments im Herzen der Insel"
        height="full"
      >
        <Button size="lg" variant="outline">Apartments entdecken</Button>
      </HeroVideo>

      <section className="luxury-section bg-white">
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Text variant="accent" className="text-nordsee-500 mb-4">Urban Living</Text>
            <Heading as="h2" size="xl" className="mb-6">Modernes Wohnen auf Sylt</Heading>
            <Text variant="lead">
              Die Auster Appartements vereinen zeitgenössisches Design mit Sylter Lebensart. 
              Hochwertige Ausstattung, klare Linien und durchdachte Grundrisse.
            </Text>
          </AnimatedSection>
        </Container>
      </section>

      <Footer
        logo={<span className="font-heading text-2xl text-white">AUSTER<span className="text-sand-400">APPARTEMENTS</span></span>}
        columns={footerColumns}
        copyright="© 2024 Auster Appartements - Ein BLUM Sylt Hotel"
      />
    </main>
  );
}
