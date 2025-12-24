import { Container, Text } from '@blumsylt/ui';

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream">
      <Container className="text-center py-20">
        <div className="mb-8">
          {/* Animated Logo */}
          <div className="inline-flex items-center justify-center">
            <span className="font-heading text-3xl text-charcoal">
              BLUM<span className="text-sand-400">SYLT</span>
            </span>
          </div>
        </div>
        
        {/* Loading Animation */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-nordsee-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        
        <Text className="text-reetdach-400">
          Wird geladen...
        </Text>
      </Container>
    </main>
  );
}
