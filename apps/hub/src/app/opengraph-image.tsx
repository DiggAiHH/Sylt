import { ImageResponse } from 'next/og';

/**
 * Open Graph Image Generator
 * 
 * Generates dynamic OG images for social sharing.
 * This creates consistent, branded social cards.
 */

// Image dimensions for Open Graph
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Runtime configuration for edge
export const runtime = 'edge';

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2C5F77 0%, #1E4051 50%, #10212A 100%)',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-2px',
            }}
          >
            BLUM
          </span>
          <span
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#D4C5B0',
              letterSpacing: '-2px',
            }}
          >
            SYLT
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '32px',
            color: '#E1D6C7',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Exklusive Unterkünfte auf Sylt
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: '100px',
            height: '2px',
            background: '#D4C5B0',
            marginTop: '40px',
            marginBottom: '40px',
          }}
        />

        {/* Property types */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            fontSize: '18px',
            color: '#B3D6E5',
          }}
        >
          <span>Hotels</span>
          <span>•</span>
          <span>Apartments</span>
          <span>•</span>
          <span>Ferienhäuser</span>
          <span>•</span>
          <span>Strandhäuser</span>
        </div>

        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '20px',
            color: '#7FBDD4',
          }}
        >
          blumsylthotels.de
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
