import { ImageResponse } from 'next/og';
import { siteConfig } from '@/data/site';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          color: '#111111',
          padding: 72,
          fontFamily: 'Arial',
        }}
      >
        <div style={{ color: '#0b5e55', fontSize: 24, letterSpacing: 6, textTransform: 'uppercase' }}>
          Engineering profile
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.02 }}>{siteConfig.name}</div>
          <div style={{ color: '#0b5e55', fontSize: 38, marginTop: 20 }}>{siteConfig.role}</div>
          <div style={{ color: '#666666', fontSize: 28, marginTop: 28, maxWidth: 900 }}>
            Developer tools, AI systems, full-stack products, APIs, data, and inspectable workflows.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, color: '#666666', fontSize: 24 }}>
          <span>Next.js</span>
          <span>Node.js</span>
          <span>Solidity</span>
          <span>PostgreSQL</span>
        </div>
      </div>
    ),
    size,
  );
}
