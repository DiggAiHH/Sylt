/**
 * Loading State für Seitenübergänge.
 * Zeigt eine animierte Ladeindikation während Next.js Seiten lädt.
 * Verbessert die wahrgenommene Performance und User Experience.
 */

export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-sand-light flex items-center justify-center">
      <div className="text-center">
        {/* Animierter Logo-Bereich */}
        <div className="relative mb-8">
          {/* Pulsierender Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-nordsee/20 animate-ping" />
          </div>
          
          {/* Logo Container */}
          <div className="relative w-24 h-24 rounded-full bg-nordsee/10 flex items-center justify-center">
            <span className="text-2xl font-extralight tracking-widest text-nordsee animate-pulse">
              B
            </span>
          </div>
        </div>

        {/* Ladetext */}
        <p className="text-reetdach text-sm tracking-wide animate-pulse">
          Wird geladen...
        </p>

        {/* Dezente Fortschrittsanzeige */}
        <div className="mt-6 w-48 h-1 bg-sand-dark/20 rounded-full overflow-hidden mx-auto">
          <div className="h-full w-1/2 bg-nordsee rounded-full animate-loading-bar" />
        </div>
      </div>
    </div>
  );
}
