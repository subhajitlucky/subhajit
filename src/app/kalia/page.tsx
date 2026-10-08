import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { KaliaConsole } from './KaliaConsole';
import { KaliaThemeToggle } from './KaliaThemeToggle';
import {
  BENCH_COMPARISON,
  BENCHMARKS,
  CITATION,
  DECISIONS,
  HERO_STATS,
  TRAINING_DATA,
  TRAINING_MIXTURE,
  VERSIONS,
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
  'Two days, zero dollars, every experiment pre-registered: the full record of training a 58M-parameter language model on free Kaggle GPUs — model specification, evaluation, real logs, every decision, every incident.';

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
  { label: 'model', href: '#model' },
  { label: 'results', href: '#results' },
  { label: 'samples', href: '#samples' },
  { label: 'replay', href: '#run' },
  { label: 'log', href: '#timeline' },
  { label: 'decisions', href: '#decisions' },
  { label: 'incidents', href: '#incidents' },
  { label: 'verify', href: '#links' },
];

function pillClass(outcome: string): string {
  if (['done', 'fixed', 'enforced', 'built', 'held'].includes(outcome)) return 'kalia-pill kalia-pill-good';
  if (outcome.includes('rejected')) return 'kalia-pill kalia-pill-bad';
  if (['closed', 'superseded'].includes(outcome)) return 'kalia-pill kalia-pill-dim';
  return 'kalia-pill kalia-pill-info';
}

export default function KaliaPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{var s=localStorage.getItem('kalia-theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.kaliaTheme=t;}catch(e){}",
        }}
      />
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
            <KaliaThemeToggle />
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
              This page documents a 58M-parameter language model trained from random
              initialization to coherent story generation in two days, on free-tier Kaggle GPUs,
              at zero compute cost. Section&nbsp;1 fixes the model specification; Section&nbsp;2
              reports the evaluation; Sections&nbsp;3 and&nbsp;4 present unedited samples and an
              interactive replay of the training log.               The appendices record the chapter-by-chapter log, every numbered decision, and
              every incident. Every experiment was pre-registered
              before it ran, and no claim on this page is a screenshot — each links to the
              primary log.
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

          <section className="kalia-section" id="model">
            <div className="kalia-section-head">
              <h2 className="kalia-section-title">1. Model specification</h2>
              <p className="kalia-section-note">Table 1 &middot; frozen by pre-registration</p>
            </div>
            <p className="kalia-prose">
              A decoder-only transformer trained from <strong>random initialization</strong> — no
              pretrained weights, no distillation, no fine-tuning. Everything below was fixed
              before the final run started, and the next version may only change what passes a
              hashed promotion rule.
            </p>
            <div className="kalia-recipe">
              {RECIPE.map(([key, value]) => (
                <div className="kalia-recipe-row" key={key}>
                  <span>{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="kalia-section" id="versions">
            <div className="kalia-section-head">
              <h2 className="kalia-section-title">2. Two checkpoints, one yardstick</h2>
              <p className="kalia-section-note">
                Table 2 &middot; deterministic 100-batch evaluation, 819,200 tokens, fixed seed
              </p>
            </div>
            <p className="kalia-prose">
              The corpus was rebuilt for licence compliance, which replaced a held-out set and
              made it <strong>0.62 nats harder for identical weights</strong>. So v0.1.2 was
              re-measured on the rebuilt set before anything could be compared, and the older
              figure of 2.4366 is never tabulated next to a rebuilt one. Both versions below are
              scored the same way, by the same code path, on the same data.
            </p>
            <div className="kalia-recipe">
              {VERSIONS.map((v) => (
                <div className="kalia-recipe-row" key={v.id}>
                  <span>
                    KALIA {v.label}{' '}
                    <strong>{v.status === 'released' ? 'released' : 'experiment'}</strong>
                  </span>
                  <span>
                    val {v.valLoss.toFixed(4)} &middot; {v.bitsPerByte.toFixed(4)} bpB &middot;{' '}
                    {v.tokens} tokens &middot; {v.note}
                  </span>
                </div>
              ))}
            </div>
            <p className="kalia-prose" style={{ marginTop: '1.4rem' }}>
              That is <strong>0.2285 nats</strong> better &mdash; 4.6&times; the pre-registered
              0.05 bar &mdash; from changing nothing but the data.
            </p>

            <figure className="kalia-figure" style={{ marginTop: '2.2rem' }}>
              <Image
                src="/kalia/bench-compare.svg"
                alt="Grouped bars for five zero-shot tasks, both versions side by side, each over a grey band showing plus or minus one standard error of about two points. PIQA, HellaSwag and WinoGrande move up but sit inside their own error bands; LAMBADA and ARC-Easy move down by more than one band."
                width={720}
                height={424}
              />
              <figcaption>
                Both versions, same harness, same 500 samples, same code path. The grey band is
                the measurement&rsquo;s own uncertainty, so a reader can see which bars actually
                separate and which merely look like they do.
              </figcaption>
            </figure>
            <h3 className="kalia-section-title" style={{ marginTop: '2.2rem', fontSize: '1.05rem' }}>
              The same five tasks as exact numbers
            </h3>
            <div className="kalia-bench" style={{ marginTop: '1rem' }}>
              {BENCH_COMPARISON.map((row) => {
                const delta = row.v020 - row.v012;
                const sigma = Math.abs(delta) / row.stderr;
                const flat = sigma < 1;
                return (
                  <div className="kalia-bench-row" key={row.task}>
                    <span className="kalia-bench-name">{row.task}</span>
                    <span className="kalia-bench-track">
                      <span className="kalia-bench-fill" style={{ width: `${row.v020}%` }} />
                      {row.chance > 0 ? (
                        <span className="kalia-bench-chance" style={{ left: `${row.chance}%` }} />
                      ) : null}
                    </span>
                    <span className="kalia-bench-score">{row.v020.toFixed(1)}%</span>
                    <span className="kalia-bench-note">
                      was {row.v012.toFixed(1)} &middot;{' '}
                      <strong style={{ color: delta < 0 ? '#b91c1c' : '#15803d' }}>
                        {delta >= 0 ? '+' : ''}
                        {delta.toFixed(2)}
                      </strong>
                      {flat ? ' (inside noise)' : ` (${sigma.toFixed(1)}σ)`} &middot; {row.note}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="kalia-prose" style={{ marginTop: '1.6rem' }}>
              Read that table with the error bars attached. At 500 samples these benchmarks carry
              a standard error of roughly <strong>2 points</strong>, so{' '}
              <strong>three of the five movements are smaller than the measurement&rsquo;s own
              noise</strong> and cannot be called improvements. The two that fell &mdash; ARC-Easy
              at 1.7&sigma; and LAMBADA at 1.2&sigma; &mdash; are the honest signal, and they are
              why v0.2.0 is published as an experiment rather than as a release.
            </p>
            <p className="kalia-prose" style={{ marginTop: '1rem' }}>
              The pre-registered rule was that no task may regress by more than 1.0 point.
              <strong> v0.2.0 fails it on two.</strong> The thresholds were not moved afterwards,
              and the noise floor was published beside the verdict rather than used to rescue it.
            </p>
          </section>

          <section className="kalia-section" id="data">
            <div className="kalia-section-head">
              <h2 className="kalia-section-title">3. Where the tokens came from</h2>
              <p className="kalia-section-note">
                Table 3 &middot; 2.4B tokens
              </p>
            </div>
            <div className="kalia-recipe">
              {TRAINING_DATA.map((src) => (
                <div className="kalia-recipe-row" key={src.name}>
                  <span>
                    {src.name} &middot; {src.share}%
                  </span>
                  <span>
                    {src.license} &middot; {src.note}
                  </span>
                </div>
              ))}
            </div>
            <figure className="kalia-figure" style={{ marginTop: '1.8rem' }}>
              <Image
                src="/kalia/training-data.svg"
                alt="The training mixture as a stacked bar, beside the share of each source whose documents are at least as long as the 1,024-token context: 26.2% for FineWeb-Edu, 0.03% for TinyStories, 13.2% for Cosmopedia, and 17.7% for the mixture overall."
                width={720}
                height={380}
              />
              <figcaption>
                The mixture on the left looks balanced. The panel on the right is why it
                isn&rsquo;t: a fifth of the tokens supply <strong>0.03%</strong> of the documents
                long enough for the model to see even one whole document, and only{' '}
                <strong>17.7%</strong> of the corpus clears the bar at all. That number is
                invisible in a table of proportions.
              </figcaption>
            </figure>
            <p className="kalia-prose">
              Only <strong>{TRAINING_MIXTURE.longDocShare}%</strong> of training tokens sit inside
              a document at least as long as the {TRAINING_MIXTURE.contextLen}-token context.
              TinyStories &mdash; a fifth of the mixture &mdash; supplies{' '}
              <strong>0.03%</strong> of them. LAMBADA asks a model to hold a discourse and recall
              its final word, so its regression is the predicted direction for this corpus rather
              than a mystery. The same probe found a candidate source at{' '}
              <strong>{TRAINING_MIXTURE.candidate.longDocShare}%</strong>, which makes the remedy
              measured rather than guessed.
            </p>
            <p className="kalia-prose" style={{ marginTop: '1rem' }}>
              One thing was found here that nobody was looking for. The Python slice of the{' '}
              <em>previous</em> corpus was built without a licence check, and sampling 20,000
              source files measured{' '}
              <strong>41.7% of characters under copyleft licences</strong> &mdash; about 2% of
              that training set. The filter that prevents this existed, was tested, and was simply
              written 40 minutes after the corpus that needed it. It is disclosed on the released
              model card rather than quietly fixed.
            </p>
          </section>

          <section className="kalia-section" id="results">
            <div className="kalia-section-head">
              <h2 className="kalia-section-title">4. Evaluation — KALIA 0.1.2, first release</h2>
              <p className="kalia-section-note">Table 2 &middot; 0-shot, 500 samples, lm-evaluation-harness</p>
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
              Held-out loss on the deterministic 100-batch evaluation is{' '}
              <strong>2.4366</strong> (819,200 tokens, fixed seed) — <strong>0.8184
              bits-per-byte</strong>, measured on the original corpus&rsquo;s held-out set. That set was
              later rebuilt for licence compliance; the rebuilt one is 0.62 nats harder for these
              same weights (3.0533), which is why v0.2.0 is scored against the rebuilt set and the
              two figures are never tabulated together. A 58M storyteller at <strong>61.4% PIQA</strong>{' '}
              and <strong>45.8% ARC-Easy</strong> is competitive with 125M-class models trained on
              roughly 160x more tokens, and weakest on the one task that requires long-range
              narrative memory (LAMBADA, 23%). The custom metric is the one that matters next: the{' '}
              <strong>Abhimanyu gap</strong> — reversed-text loss (9.29) minus forward loss (3.23)
              — is <strong>6.06 nats</strong>. The model can enter fluent text but cannot exit it.
            </p>
            <p className="kalia-prose" style={{ marginTop: '1rem' }}>
              The pre-registered experiment that tested whether training on chunk-preserving
              reversal closes that gap has now run, and it <strong>failed</strong> — reported here
              with the same prominence a win would have had. At 30M parameters, control models showed
              a <strong>5.11-nat</strong> gap (confirming the effect is architectural, not an
              artifact of scale), and the treatment trained on 50% reversed chunks made it{' '}
              <strong>worse</strong>: gap 5.25 (+0.14) and forward loss +0.08, missing both
              pre-registered bars on both seeds. Reversing chunk <em>order</em> while preserving
              intra-chunk order does not teach token-level reversal. The transform was rejected by
              the hashed promotion rule and never shipped, and a stronger form is now a separate
              hypothesis rather than a quiet retry.{' '}
            </p>
          </section>

          <section className="kalia-section" id="samples">
            <div className="kalia-section-head">
              <h2 className="kalia-section-title">5. Unedited samples</h2>
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

          <section className="kalia-section" id="run">
            <div className="kalia-section-head">
              <h2 className="kalia-section-title">6. The run, replayed</h2>
              <p className="kalia-section-note">Figure 1 &middot; replayed from the primary log</p>
            </div>
            <p className="kalia-prose">
              The console replays the surviving training log — session three, steps 1,740 to
              3,470, at every tenth step. Earlier sessions&apos; rows were lost to a resume
              incident (I8, Appendix C). Blue markers are validation evaluations; the square is
              the deterministic evaluation that established the model had not regressed.
            </p>
            <KaliaConsole />
          </section>

          <section className="kalia-section" id="timeline">
            <div className="kalia-section-head">
              <h2 className="kalia-section-title">Appendix A. Chapter-by-chapter log</h2>
              <p className="kalia-section-note">times in UTC, from the kernel run logs</p>
            </div>
            <p className="kalia-prose">
              The plan changed several times as measurements arrived. The entries below are the
              real order of events — each algorithm measured before the next was attempted — with
              the three decisive comparisons shown as figures.
            </p>
            {TIMELINE.map((day) => (
              <div className="kalia-day" key={day.label}>
                <p className="kalia-day-label">
                  {day.label} — {day.title} <span>{day.date}</span>
                </p>
                <ol className="kalia-timeline">
                  {day.entries.map((entry) => (
                    <li key={`${day.label}-${entry.time}-${entry.title}`}>
                      <time>{entry.time}</time>
                      <h3>{entry.title}</h3>
                      <p>{entry.body}</p>
                      {entry.figure ? (
                        <figure className="kalia-timeline-figure">
                          <Image
                            src={entry.figure.src}
                            alt={entry.figure.alt}
                            width={720}
                            height={400}
                            unoptimized
                          />
                          <figcaption>{entry.figure.caption}</figcaption>
                        </figure>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </section>

          <section className="kalia-section" id="decisions">
            <div className="kalia-section-head">
              <h2 className="kalia-section-title">Appendix B. Every decision</h2>
              <p className="kalia-section-note">every numbered entry, including the rejected ones</p>
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
              <h2 className="kalia-section-title">Appendix C. Every incident</h2>
              <p className="kalia-section-note">12 published in full</p>
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

          <section className="kalia-section" id="links">
            <div className="kalia-section-head">
              <h2 className="kalia-section-title">Verification and citation</h2>
              <p className="kalia-section-note">primary sources, in public</p>
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
            <div className="kalia-cite">
              <span className="kalia-label">cite this release</span>
              <pre className="kalia-mono">{CITATION}</pre>
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
    </>
  );
}
