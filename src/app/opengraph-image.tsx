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
          background: '#ffffff',
          color: '#15171a',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '2px solid #dfe3e8',
            paddingBottom: '22px',
            fontSize: 24,
          }}
        >
          <span>{siteConfig.name}</span>
          <span style={{ color: '#155eef' }}>Open to remote roles worldwide</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 980 }}>
          <span style={{ color: '#155eef', fontSize: 24, marginBottom: 20 }}>
            FULL STACK SOFTWARE DEVELOPER
          </span>
          <span style={{ fontSize: 72, fontWeight: 700, letterSpacing: '-4px', lineHeight: 1 }}>
            {siteConfig.name}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22 }}>
          <span>Web products · Developer tools · AI systems</span>
          <span>Odisha, India</span>
        </div>
      </div>
    ),
    size,
  );
}
