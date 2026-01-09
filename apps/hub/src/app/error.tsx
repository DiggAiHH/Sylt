'use client';

import { useEffect } from 'react';
import { Container, Heading, Text, Button } from '@sylt/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-beach">
      <Container className="text-center py-20">
        <div className="mb-8">
          <span className="font-heading text-8xl text-nordsee-200">Oops!</span>
        </div>
        <Heading as="h1" size="xl" className="mb-4">
          Etwas ist schief gelaufen
        </Heading>
        <Text className="mb-8 max-w-md mx-auto">
          Es tut uns leid, aber ein unerwarteter Fehler ist aufgetreten. 
          Bitte versuchen Sie es erneut oder kontaktieren Sie uns.
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>Erneut versuchen</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Zur Startseite
          </Button>
        </div>
      </Container>
    </main>
  );
}
