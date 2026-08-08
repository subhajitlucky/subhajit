import { ImageResponse } from 'next/og';
import { siteConfig } from '@/data/site';

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f2eee4',
          color: '#171713',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '2px solid #171713',
            paddingBottom: '22px',
            fontSize: 24,
          }}
        >
          <span>{siteConfig.name}</span>
          <span style={{ color: '#b7330d' }}>Open to remote roles worldwide</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 980 }}>
          <span style={{ color: '#b7330d', fontSize: 25, marginBottom: 22 }}>ENGINEERING DOSSIER</span>
          <span style={{ fontFamily: 'serif', fontSize: 92, letterSpacing: '-4px', lineHeight: 0.92 }}>
            Developer tools and AI systems.
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22 }}>
          <span>Inspectable software. Explicit boundaries. Public evidence.</span>
          <span>SP / 2026</span>
        </div>
      </div>
    ),
    size,
  );
}
