import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';

import { KaliaConsole } from './KaliaConsole';
import {
  BENCHMARKS,
  DECISIONS,
  HERO_STATS,
  INCIDENTS,
  RECIPE,
  SAMPLES,
  TIMELINE,
} from './data';
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
  'Two days, zero dollars, every experiment pre-registered: the full record of training a 58M-parameter language model on free Kaggle GPUs — real logs, every decision, every incident, every evaluation.';

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

const NAV = [
  { label: 'the run', href: '#run' },
  { label: 'timeline', href: '#timeline' },
  { label: 'evals', href: '#evals' },
  { label: 'decisions', href: '#decisions' },
  { label: 'incidents', href: '#incidents' },
  { label: 'recipe', href: '#recipe' },
  { label: 'links', href: '#links' },
];

function pillClass(outcome: string): string {
  if (['done', 'fixed', 'enforced', 'built', 'held'].includes(outcome)) return 'kalia-pill kalia-pill-good';
  if (outcome.includes('rejected')) return 'kalia-pill kalia-pill-bad';
  if (['closed', 'superseded'].includes(outcome)) return 'kalia-pill kalia-pill-dim';
  return 'kalia-pill kalia-pill-info';
}

export default function KaliaPage() {
  return (
    <div className={`kalia ${display.variable} ${mono.variable}`}>
      <nav className="kalia-nav" aria-label="KALIA page sections">
        <div className="kalia-inner kalia-nav-inner">
          <Link className="kalia-nav-brand" href="/kalia">
            KALIA
          </Link>
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="https://github.com/subhajitlucky/kalia" target="_blank" rel="noopener noreferrer">
            github
          </a>
          <a href="https://huggingface.co/kalia-lm/kalia-v012" target="_blank" rel="noopener noreferrer">
            weights
          </a>
        </div>
      </nav>

      <div className="kalia-inner">
        <header className="kalia-hero">
          <p className="kalia-eyebrow">open model release &middot; 2026-09-23 &middot; $0 compute</p>
          <h1 className="kalia-title">KALIA</h1>
          <p className="kalia-tagline">
            अथ शब्दानुशासनम् — <strong>&ldquo;Now begins the discipline of words.&rdquo;</strong>
          </p>
          <p className="kalia-lead">
            Hey stranger. Two days ago this was an empty repository. What follows is the honest
            record of training a 58M-parameter language model from random weights on free Kaggle
            GPUs: the algorithms in the order they were tried, the numbers they produced, the
            mistakes that survived review, and the exact moment training stopped — <em>73% through
            the schedule, when the weekly quota ran out</em>. Every experiment was pre-registered
            before it ran. Every incident is published. Nothing here is a screenshot of a claim;
            it is the log.
          </p>

          <div className="kalia-stats">
            {HERO_STATS.map((stat) => (
              <div className="kalia-stat-cell" key={stat.label}>
                <span className="kalia-label">{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>

          <div className="kalia-cta-row">
            <a
              className="kalia-cta kalia-cta-primary"
              href="https://huggingface.co/kalia-lm/kalia-v012"
              target="_blank"
              rel="noopener noreferrer"
            >
              download the weights
            </a>
            <a
              className="kalia-cta"
              href="https://github.com/subhajitlucky/kalia"
              target="_blank"
              rel="noopener noreferrer"
            >
              source + journal
            </a>
            <a className="kalia-cta" href="/kalia/logs/train_log.csv" download>
              train_log.csv
            </a>
            <a className="kalia-cta" href="/kalia/logs/val_log.csv" download>
              val_log.csv
            </a>
          </div>
        </header>

        <section className="kalia-section" id="run">
          <div className="kalia-section-head">
            <h2 className="kalia-section-title">The run, replayed</h2>
            <p className="kalia-section-note">174 logged checkpoints &middot; real data, not an animation</p>
          </div>
          <p className="kalia-prose">
            Press play and the console replays the surviving training log — session three, steps
            1,740 to 3,470, every tenth step. The earlier sessions&apos; rows were lost to a resume
            incident (I8 in the list below); the rest is exactly as written. The{' '}
            <strong>blue dots</strong> are the validation evals that looked like a plateau; the{' '}
            <strong>blue square</strong> is the deterministic evaluation that proved the model had
            never regressed.
          </p>
          <KaliaConsole />
        </section>

        <section className="kalia-section" id="timeline">
          <div className="kalia-section-head">
            <h2 className="kalia-section-title">So this is how it started</h2>
            <p className="kalia-section-note">times in UTC, from the kernel run logs</p>
          </div>
          <p className="kalia-prose">
            No plan survived first contact with the GPUs. What follows is the real order of events:
            first this algorithm, then that one, each one measured before the next was tried.
          </p>
          {TIMELINE.map((day) => (
            <div className="kalia-day" key={day.label}>
              <p className="kalia-day-label">
                {day.label} <span>{day.date}</span>
              </p>
              <ol className="kalia-timeline">
                {day.entries.map((entry) => (
                  <li key={`${day.label}-${entry.time}-${entry.title}`}>
                    <time>{entry.time}</time>
                    <h3>{entry.title}</h3>
                    <p>{entry.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>

        <section className="kalia-section" id="evals">
          <div className="kalia-section-head">
            <h2 className="kalia-section-title">What the model actually does</h2>
            <p className="kalia-section-note">0-shot, 500 samples, lm-evaluation-harness</p>
          </div>
          <div className="kalia-bench">
            {BENCHMARKS.map((bench) => (
              <div className="kalia-bench-row" key={bench.task}>
                <span className="kalia-bench-name">{bench.task}</span>
                <span className="kalia-bench-track">
                  <span className="kalia-bench-fill" style={{ width: `${bench.score}%` }} />
                  {bench.chance > 0 ? (
                    <span className="kalia-bench-chance" style={{ left: `${bench.chance}%` }} />
                  ) : null}
                </span>
                <span className="kalia-bench-score">{bench.score.toFixed(1)}%</span>
                <span className="kalia-bench-note">{bench.note}</span>
              </div>
            ))}
          </div>
          <p className="kalia-prose" style={{ marginTop: '1.6rem' }}>
            A 58M storyteller at <strong>61.4% PIQA</strong> and <strong>45.8% ARC-Easy</strong> is
            competitive with 125M-class models trained on roughly 160x more tokens — and it is
            hopeless at the one task that needs long-range narrative memory (LAMBADA, 23%). The
            custom metric is the one that matters next: the <strong>Abhimanyu gap</strong> —
            reversed-text loss (9.29) minus forward loss (3.23) — is <strong>6.06 nats</strong>.
            The model can enter fluent text but cannot exit it. A pre-registered experiment tests
            whether chunk-preserving reversal training closes that gap.
          </p>
        </section>

        <section className="kalia-section" id="samples">
          <div className="kalia-section-head">
            <h2 className="kalia-section-title">Unedited samples</h2>
            <p className="kalia-section-note">temperature 0.8, top-k 200, checkpoint step 3,478</p>
          </div>
          <div className="kalia-samples">
            {SAMPLES.map((sample) => (
              <article className="kalia-sample" key={sample.prompt}>
                <span className="kalia-label">prompt: {sample.prompt}</span>
                <p>{sample.text}</p>
                <p className="kalia-sample-note">{sample.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="kalia-section" id="decisions">
          <div className="kalia-section-head">
            <h2 className="kalia-section-title">Every decision</h2>
            <p className="kalia-section-note">41 numbered entries, including the rejected ones</p>
          </div>
          <div className="kalia-decisions">
            {DECISIONS.map((item) => (
              <div className="kalia-decision" key={item.id}>
                <span className="kalia-decision-id">{item.id}</span>
                <span className="kalia-decision-text">{item.decision}</span>
                <span className={pillClass(item.outcome)}>{item.outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="kalia-section" id="incidents">
          <div className="kalia-section-head">
            <h2 className="kalia-section-title">Every incident</h2>
            <p className="kalia-section-note">12 published, because this is the useful part</p>
          </div>
          <div className="kalia-incidents">
            {INCIDENTS.map((incident) => (
              <article className="kalia-incident" key={incident.id}>
                <h3>
                  <span>{incident.id}</span>
                  {incident.title}
                </h3>
                <p>{incident.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="kalia-section" id="recipe">
          <div className="kalia-section-head">
            <h2 className="kalia-section-title">The recipe</h2>
            <p className="kalia-section-note">frozen by pre-registration before v0.2.0</p>
          </div>
          <div className="kalia-recipe">
            {RECIPE.map(([key, value]) => (
              <div className="kalia-recipe-row" key={key}>
                <span>{key}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="kalia-section" id="links">
          <div className="kalia-section-head">
            <h2 className="kalia-section-title">Verify everything</h2>
            <p className="kalia-section-note">the receipts, in public</p>
          </div>
          <div className="kalia-links">
            <a
              className="kalia-link-card"
              href="https://github.com/subhajitlucky/kalia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Source + journal</strong>
              <span>Training code, 64 tests, the dated journal, and the full incident record.</span>
            </a>
            <a
              className="kalia-link-card"
              href="https://huggingface.co/kalia-lm/kalia-v012"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Weights + model card</strong>
              <span>Apache-2.0 weights, safetensors and resumable checkpoint, full model card.</span>
            </a>
            <a
              className="kalia-link-card"
              href="https://github.com/subhajitlucky/kalia/blob/main/docs/preregistrations/LEDGER.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Pre-registration ledger</strong>
              <span>SHA-256 hashes proving each prediction existed before its result.</span>
            </a>
            <a
              className="kalia-link-card"
              href="https://github.com/subhajitlucky/kalia/tree/main/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Full decision log</strong>
              <span>Every numbered decision, incident, and evaluation report, unedited.</span>
            </a>
          </div>
        </section>

        <footer className="kalia-outro">
          <p>
            KALIA is a personal research project. Not affiliated with any government scheme,
            company, or other project using a similar name. Training data is never redistributed;
            every source is attributed in the model card.
          </p>
          <p>
            <Link href="/projects/kalia">Case study</Link> &middot;{' '}
            <Link href="/writing/kalia-build-log">Technical write-up</Link> &middot;{' '}
            <Link href="/">Back to the portfolio</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
