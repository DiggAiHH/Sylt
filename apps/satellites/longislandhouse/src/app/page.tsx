import { HeroVideo, Container, Button, AnimatedSection, Heading, Text, Navigation, Footer } from '@sylt/ui';

const navItems = [
  { label: 'Das Haus', href: '#haus' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Kontakt', href: '#kontakt' },
];

const footerColumns = [
  { title: 'Long Island House', links: [{ label: 'Das Haus', href: '#haus' }] },
  { title: 'BLUM Hotels', links: [{ label: 'blumsylthotels.de', href: 'https://blumsylthotels.de' }] },
];

export default function LongIslandHousePage() {
  return (
    <main>
      <Navigation
        logo={<span className="font-heading text-2xl text-white">LONG ISLAND<span className="text-sand-400">HOUSE</span></span>}
        items={navItems}
        transparent={true}
      />

      <HeroVideo
        videoSrc="/videos/longislandhouse.mp4"
        posterSrc="/images/longislandhouse-hero.jpg"
        title="Long Island House"
        subtitle="Hampton-Style Eleganz trifft Sylter Charme"
        height="full"
      >
        <Button size="lg" variant="outline">Entdecken</Button>
      </HeroVideo>

      <section className="luxury-section bg-white">
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Text variant="accent" className="text-nordsee-500 mb-4">East Coast Feeling</Text>
            <Heading as="h2" size="xl" className="mb-6">Amerikanische Eleganz an der Nordsee</Heading>
            <Text variant="lead">
              Das Long Island House verbindet den klassischen Hampton-Style mit der einzigartigen 
              Atmosphäre Sylts. Weiße Holzverkleidungen, maritime Details und zeitlose Eleganz.
            </Text>
          </AnimatedSection>
        </Container>
      </section>

      <Footer
        logo={<span className="font-heading text-2xl text-white">LONG ISLAND<span className="text-sand-400">HOUSE</span></span>}
        columns={footerColumns}
        copyright="© 2024 Long Island House - Ein BLUM Sylt Hotel"
      />
    </main>
  );
}
