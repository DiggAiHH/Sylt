import Link from 'next/link';
import { Container, Heading, Text, Button } from '@sylt/ui';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-beach">
      <Container className="text-center py-20">
        <div className="mb-8">
          <span className="font-heading text-8xl text-nordsee-200">404</span>
        </div>
        <Heading as="h1" size="xl" className="mb-4">
          Seite nicht gefunden
        </Heading>
        <Text className="mb-8 max-w-md mx-auto">
          Die gewünschte Seite existiert leider nicht. Vielleicht wurde sie verschoben 
          oder die Adresse ist nicht mehr aktuell.
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button>Zur Startseite</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Kontakt aufnehmen</Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
