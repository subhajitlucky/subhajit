import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';

import {
  DataSection,
  DecisionsSection,
  IncidentsSection,
  KaliaHero,
  KaliaNav,
  KaliaOutro,
  LinksSection,
  ModelSection,
  ResultsSection,
  RunSection,
  SamplesSection,
  TimelineSection,
  VersionsSection,
} from './KaliaSections';
import './kalia.css';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-kalia-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-kalia-mono',
  display: 'swap',
});

const title = 'KALIA — a 58M language model trained from scratch on free GPUs';
const description =
  'Zero dollars, every experiment pre-registered: the full record of training KALIA from scratch on free Kaggle GPUs — model specification, evaluation, real logs, every decision, and ongoing research.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/kalia' },
  openGraph: {
    type: 'article',
    url: '/kalia',
    title,
    description,
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
};

export default function KaliaPage() {
  return (
    <div className={`kalia ${display.variable} ${mono.variable}`}>
      <KaliaNav />
      <div className="kalia-inner">
        <KaliaHero />
        <ModelSection />
        <VersionsSection />
        <DataSection />
        <ResultsSection />
        <SamplesSection />
        <RunSection />
        <TimelineSection />
        <DecisionsSection />
        <IncidentsSection />
        <LinksSection />
        <KaliaOutro />
      </div>
    </div>
  );
}
