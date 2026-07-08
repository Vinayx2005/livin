/**
 * Cinematic hero: a premium generated film of a gift box opening,
 * the LIVIN' bottle rising, and a golden mist spraying. Autoplays,
 * loops, muted — treated as ambient luxury motion, not a UI widget.
 */
export function Hero3D() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        src="/hero-livin.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      {/* Cinematic grade — deepen navy, lift gold */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, rgba(10,23,51,0.15) 0%, rgba(10,23,51,0.55) 60%, rgba(5,10,25,0.9) 100%)",
        }}
        aria-hidden
      />
      {/* Subtle golden vignette rim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 55%, rgba(201,162,76,0.12) 0%, rgba(201,162,76,0) 70%)",
        }}
        aria-hidden
      />
      {/* Film grain / bottom fade into page */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,23,51,0) 0%, rgba(10,23,51,0.85) 70%, #0a1733 100%)",
        }}
        aria-hidden
      />
    </div>
  );
}
