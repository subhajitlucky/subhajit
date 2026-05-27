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
          background: '#090a08',
          color: '#f7f6ef',
          padding: 72,
          fontFamily: 'Arial',
        }}
      >
        <div style={{ color: '#b8ff2c', fontSize: 24, letterSpacing: 6, textTransform: 'uppercase' }}>
          Portfolio
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.02 }}>{siteConfig.name}</div>
          <div style={{ color: '#b8ff2c', fontSize: 44, marginTop: 20 }}>{siteConfig.role}</div>
          <div style={{ color: '#b9b8ae', fontSize: 28, marginTop: 28, maxWidth: 900 }}>
            Full-stack products, blockchain workflows, AI orchestration, APIs, data, and deployment.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, color: '#d8d6ca', fontSize: 24 }}>
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
