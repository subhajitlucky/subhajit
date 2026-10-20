import { structuredData } from '@/lib/structured-data';

export function JsonLd({ data = structuredData }: { data?: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
