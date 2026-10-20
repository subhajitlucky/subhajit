import { Geist } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import type { Viewport } from 'next';
import type { ReactNode } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { rootMetadata } from '@/lib/metadata';
import './globals.css';

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: '#2563eb',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <body>
        <Script id="kalia-theme" strategy="beforeInteractive">
          {`try{var s=localStorage.getItem('kalia-theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.kaliaTheme=t;}catch(e){}`}
        </Script>
        <JsonLd />
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
