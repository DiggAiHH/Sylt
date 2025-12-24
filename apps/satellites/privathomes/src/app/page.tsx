import { HeroVideo, Container, Button, AnimatedSection, Heading, Text, Navigation, Footer } from '@sylt/ui';

const navItems = [
  { label: 'Häuser', href: '#haeuser' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Kontakt', href: '#kontakt' },
];

const footerColumns = [
  { title: 'Privat Homes', links: [{ label: 'Unsere Häuser', href: '#haeuser' }] },
  { title: 'BLUM Hotels', links: [{ label: 'blumsylthotels.de', href: 'https://blumsylthotels.de' }] },
];

export default function PrivatHomesPage() {
  return (
    <main>
      <Navigation
        logo={<span className="font-heading text-2xl text-white">PRIVAT<span className="text-sand-400">HOMES</span></span>}
        items={navItems}
        transparent={true}
      />

      <HeroVideo
        videoSrc="/videos/privathomes.mp4"
        posterSrc="/images/privathomes-hero.jpg"
        title="Privat Homes"
        subtitle="Luxuriöse Ferienhäuser für gehobene Ansprüche"
        height="full"
      >
        <Button size="lg" variant="outline">Häuser entdecken</Button>
      </HeroVideo>

      <section className="luxury-section bg-white">
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Text variant="accent" className="text-nordsee-500 mb-4">Exklusivität</Text>
            <Heading as="h2" size="xl" className="mb-6">Ihr privates Refugium auf Sylt</Heading>
            <Text variant="lead">
              Unsere handverlesenen Ferienhäuser bieten höchsten Komfort und absolute Privatsphäre. 
              Jedes Haus ist ein Unikat mit eigenem Charakter und erstklassiger Ausstattung.
            </Text>
          </AnimatedSection>
        </Container>
      </section>

      <Footer
        logo={<span className="font-heading text-2xl text-white">PRIVAT<span className="text-sand-400">HOMES</span></span>}
        columns={footerColumns}
        copyright="© 2024 Privat Homes - Ein BLUM Sylt Hotel"
      />
    </main>
  );
}
