import { siteConfig } from '@/data/site';

type ArticleOgImageProps = {
  eyebrow: string;
  meta: string;
  title: string;
  description: string;
};

export function ArticleOgImage({ eyebrow, meta, title, description }: ArticleOgImageProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#ffffff',
        color: '#111827',
        padding: '64px 72px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '22px',
          fontSize: 24,
        }}
      >
        <span>{siteConfig.name}</span>
        <span style={{ color: '#2563eb' }}>{meta}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
        <span style={{ color: '#2563eb', fontSize: 24, marginBottom: 20 }}>{eyebrow}</span>
        <span style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-2.5px', lineHeight: 1.05 }}>
          {title}
        </span>
        <span style={{ color: '#4b5563', fontSize: 26, lineHeight: 1.35, marginTop: 24 }}>
          {description}
        </span>
      </div>
      <div style={{ display: 'flex', fontSize: 22, color: '#6b7280' }}>
        <span>{siteConfig.baseUrl.replace('https://', '')}</span>
      </div>
    </div>
  );
}
