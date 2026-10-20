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
  INCIDENTS,
  RECIPE,
  SAMPLES,
  TIMELINE,
  TRAINING_DATA,
  TRAINING_MIXTURE,
  VERSIONS,
} from './data';
import { figureDimensions } from '@/lib/kalia-figures';

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

export function KaliaNav() {
  return (
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
  );
}

export function KaliaHero() {
  return (
    <header className="kalia-hero">
      <p className="kalia-eyebrow">open model release &middot; 2026-09-23 &middot; $0 compute</p>
      <h1 className="kalia-title">KALIA</h1>
      <p className="kalia-tagline">
        <span lang="sa">अथ शब्दानुशासनम्</span> — <strong>&ldquo;Now begins the discipline of words.&rdquo;</strong>
      </p>
      <p className="kalia-lead">
        This page documents KALIA, a 58M-parameter language model trained from random initialization
        to coherent story generation on free-tier Kaggle GPUs at zero compute cost, with training
        continuing in public. Section&nbsp;1 fixes the model specification; Section&nbsp;2 compares
        the two checkpoints on one yardstick; Section&nbsp;3 documents the corpus; Section&nbsp;4
        reports the release evaluation; Sections&nbsp;5 and&nbsp;6 present unedited samples and an
        interactive replay of the training log. The appendices record the chapter-by-chapter log,
        every numbered decision, and every incident. Every experiment was pre-registered before it
        ran, and no claim on this page is a screenshot — each links to the primary log.
      </p>

      <div className="kalia-stats">
        {HERO_STATS.map((stat) => (
          <div className="kalia-stat-cell" key={stat.label}>
            <span className="kalia-label">{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>
      <p className="kalia-stat-note">
        Val loss and bits/byte in this row are KALIA 0.1.2 on the original held-out set. Section 2
        re-baselines both checkpoints on the rebuilt set; the two yardsticks are never compared.
      </p>

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
  );
}

export function ModelSection() {
  return (
    <section className="kalia-section" id="model">
      <div className="kalia-section-head">
        <h2 className="kalia-section-title">1. Model specification</h2>
        <p className="kalia-section-note">Table 1 &middot; frozen by pre-registration</p>
      </div>
      <p className="kalia-prose">
        A decoder-only transformer trained from <strong>random initialization</strong> — no
        pretrained weights, no distillation, no fine-tuning. Everything below was fixed before the
        final run started, and the next version may only change what passes a hashed promotion rule.
      </p>
      <table className="kalia-recipe" aria-label="Model specification">
        <tbody>
          {RECIPE.map(([key, value]) => (
            <tr className="kalia-recipe-row" key={key}>
              <th scope="row">{key}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function VersionsSection() {
  const benchDimensions = figureDimensions('/kalia/bench-compare.svg');

  return (
    <section className="kalia-section" id="versions">
      <div className="kalia-section-head">
        <h2 className="kalia-section-title">2. Two checkpoints, one yardstick</h2>
        <p className="kalia-section-note">
          Table 2 &middot; deterministic 100-batch evaluation, 819,200 tokens, fixed seed
        </p>
      </div>
      <p className="kalia-prose">
        The corpus was rebuilt for licence compliance, which replaced a held-out set and made it{' '}
        <strong>0.62 nats harder for identical weights</strong>. So v0.1.2 was re-measured on the
        rebuilt set before anything could be compared, and the older figure of 2.4366 is never
        tabulated next to a rebuilt one. Both versions below are scored the same way, by the same
        code path, on the same data.
      </p>
      <table className="kalia-recipe" aria-label="Checkpoint comparison">
        <tbody>
          {VERSIONS.map((v) => (
            <tr className="kalia-recipe-row" key={v.id}>
              <th scope="row">
                KALIA {v.label}{' '}
                <strong>{v.status === 'released' ? 'released' : 'experiment'}</strong>
              </th>
              <td>
                val {v.valLoss.toFixed(4)} &middot; {v.bitsPerByte.toFixed(4)} bpB &middot;{' '}
                {v.tokens} tokens &middot; {v.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="kalia-prose" style={{ marginTop: '1.4rem' }}>
        That is <strong>0.2285 nats</strong> better &mdash; 4.6&times; the pre-registered 0.05 bar
        &mdash; from changing nothing but the data.
      </p>

      <figure className="kalia-figure" style={{ marginTop: '2.2rem' }}>
        <Image
          src="/kalia/bench-compare.svg"
          alt="Grouped bars for five zero-shot tasks, both versions side by side, each over a grey band showing plus or minus one standard error of about two points. The three gains sit within 1.5 standard errors; the two that fell — LAMBADA and ARC-Easy — fail the pre-registered regression rule."
          width={benchDimensions.width}
          height={benchDimensions.height}
        />
        <figcaption>
          Both versions, same harness, same 500 samples, same code path. The grey band is the
          measurement&rsquo;s own uncertainty, so a reader can see which bars actually separate and
          which merely look like they do.
        </figcaption>
      </figure>
      <h3 className="kalia-section-title" style={{ marginTop: '2.2rem', fontSize: '1.05rem' }}>
        The same five tasks as exact numbers
      </h3>
      <table className="kalia-bench" aria-label="Zero-shot benchmark comparison">
        <tbody>
          {BENCH_COMPARISON.map((row) => {
            const delta = row.v020 - row.v012;
            const sigma = Math.abs(delta) / row.stderr;
            const flat = sigma < 1;
            return (
              <tr className="kalia-bench-row" key={row.task}>
                <th scope="row" className="kalia-bench-name">
                  {row.task}
                </th>
                <td className="kalia-bench-track" aria-hidden="true">
                  <span className="kalia-bench-fill" style={{ width: `${row.v020}%` }} />
                  {row.chance > 0 ? (
                    <span className="kalia-bench-chance" style={{ left: `${row.chance}%` }} />
                  ) : null}
                </td>
                <td className="kalia-bench-score">{row.v020.toFixed(1)}%</td>
                <td className="kalia-bench-note">
                  was {row.v012.toFixed(1)} &middot;{' '}
                  <strong style={{ color: delta < 0 ? 'var(--k-bad)' : 'var(--k-good)' }}>
                    {delta >= 0 ? '+' : ''}
                    {delta.toFixed(2)}
                  </strong>
                  {flat ? ' (inside noise)' : ` (${sigma.toFixed(1)}σ)`} &middot; {row.note}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="kalia-prose" style={{ marginTop: '1.6rem' }}>
        Read that table with the error bars attached. At 500 samples these benchmarks carry a
        standard error of roughly <strong>2 points</strong>, and the{' '}
        <strong>three gains &mdash; PIQA, HellaSwag, WinoGrande &mdash; all sit within 1.6&sigma;</strong>:
        none of them can be called an improvement. The two that fell &mdash; ARC-Easy at 1.7&sigma;
        and LAMBADA at 1.2&sigma; &mdash; are the honest signal, and they are why v0.2.0 is published
        as an experiment rather than as a release.
      </p>
      <p className="kalia-prose" style={{ marginTop: '1rem' }}>
        The pre-registered rule was that no task may regress by more than 1.0 point.
        <strong> v0.2.0 fails it on two.</strong> The thresholds were not moved afterwards, and the
        noise floor was published beside the verdict rather than used to rescue it.
      </p>
    </section>
  );
}

export function DataSection() {
  const dimensions = figureDimensions('/kalia/training-data.svg');

  return (
    <section className="kalia-section" id="data">
      <div className="kalia-section-head">
        <h2 className="kalia-section-title">3. Where the tokens came from</h2>
        <p className="kalia-section-note">Table 3 &middot; 2.4B tokens</p>
      </div>
      <table className="kalia-recipe" aria-label="Training data mixture">
        <tbody>
          {TRAINING_DATA.map((src) => (
            <tr className="kalia-recipe-row" key={src.name}>
              <th scope="row">
                {src.name} &middot; {src.share}%
              </th>
              <td>
                {src.license} &middot; {src.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <figure className="kalia-figure" style={{ marginTop: '1.8rem' }}>
        <Image
          src="/kalia/training-data.svg"
          alt="The training mixture as a stacked bar, beside the share of each source whose documents are at least as long as the 1,024-token context: 26.2% for FineWeb-Edu, 0.03% for TinyStories, 13.2% for Cosmopedia, and 17.7% for the mixture overall."
          width={dimensions.width}
          height={dimensions.height}
        />
        <figcaption>
          The mixture on the left looks balanced. The panel on the right is why it isn&rsquo;t: only
          <strong>0.03%</strong> of TinyStories&rsquo; documents are long enough to fill the context,
          so a fifth of the tokens contributes almost none of the long-document mass, and only{' '}
          <strong>17.7%</strong> of the corpus clears the bar at all. That number is invisible in a
          table of proportions.
        </figcaption>
      </figure>
      <p className="kalia-prose">
        Only <strong>{TRAINING_MIXTURE.longDocShare}%</strong> of training tokens sit inside a
        document at least as long as the {TRAINING_MIXTURE.contextLen}-token context. TinyStories
        &mdash; a fifth of the mixture &mdash; has only <strong>0.03%</strong> of its documents long
        enough, so it contributes almost none of the long-document mass. LAMBADA asks a model to hold
        a discourse and recall its final word, so its regression is the predicted direction for this
        corpus rather than a mystery. The same probe found a candidate source at{' '}
        <strong>{TRAINING_MIXTURE.candidate.longDocShare}%</strong>, which makes the remedy measured
        rather than guessed.
      </p>
      <p className="kalia-prose" style={{ marginTop: '1rem' }}>
        One thing was found here that nobody was looking for. The Python slice of the{' '}
        <em>previous</em> corpus was built without a licence check, and sampling 20,000 source files
        measured <strong>41.7% of characters under copyleft licences</strong> &mdash; about 2% of
        that training set. The filter that prevents this existed, was tested, and was simply written
        40 minutes after the corpus that needed it. It is disclosed on the released model card rather
        than quietly fixed.
      </p>
    </section>
  );
}

export function ResultsSection() {
  return (
    <section className="kalia-section" id="results">
      <div className="kalia-section-head">
        <h2 className="kalia-section-title">4. Evaluation — KALIA 0.1.2, first release</h2>
        <p className="kalia-section-note">Table 4 &middot; 0-shot, 500 samples, lm-evaluation-harness</p>
      </div>
      <table className="kalia-bench" aria-label="KALIA 0.1.2 zero-shot benchmarks">
        <tbody>
          {BENCHMARKS.map((bench) => (
            <tr className="kalia-bench-row" key={bench.task}>
              <th scope="row" className="kalia-bench-name">
                {bench.task}
              </th>
              <td className="kalia-bench-track" aria-hidden="true">
                <span className="kalia-bench-fill" style={{ width: `${bench.score}%` }} />
                {bench.chance > 0 ? (
                  <span className="kalia-bench-chance" style={{ left: `${bench.chance}%` }} />
                ) : null}
              </td>
              <td className="kalia-bench-score">{bench.score.toFixed(1)}%</td>
              <td className="kalia-bench-note">{bench.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="kalia-prose" style={{ marginTop: '1.6rem' }}>
        Held-out loss on the deterministic 100-batch evaluation is <strong>2.4366</strong> (819,200
        tokens, fixed seed) — <strong>0.8184 bits-per-byte</strong>, measured on the original
        corpus&rsquo;s held-out set. That set was later rebuilt for licence compliance; the rebuilt
        one is 0.62 nats harder for these same weights (3.0533), which is why v0.2.0 is scored
        against the rebuilt set and the two figures are never tabulated together. A 58M storyteller
        at <strong>61.4% PIQA</strong> and <strong>45.8% ARC-Easy</strong> is competitive with
        125M-class models trained on roughly 160x more tokens, and weakest on the one task that
        requires long-range narrative memory (LAMBADA, 23%). The custom metric is the one that
        matters next: the <strong>Abhimanyu gap</strong> — reversed-text loss (9.29) minus forward
        loss (3.23) — is <strong>6.06 nats</strong>. The model can enter fluent text but cannot exit
        it.
      </p>
      <p className="kalia-prose" style={{ marginTop: '1rem' }}>
        The pre-registered experiment that tested whether training on chunk-preserving reversal
        closes that gap has now run, and it <strong>failed</strong> — reported here with the same
        prominence a win would have had. At 30M parameters, control models showed a{' '}
        <strong>5.11-nat</strong> gap (confirming the effect is architectural, not an artifact of
        scale), and the treatment trained on 50% reversed chunks made it <strong>worse</strong>: gap
        5.25 (+0.14) and forward loss +0.08, missing both pre-registered bars on both seeds.
        Reversing chunk <em>order</em> while preserving intra-chunk order does not teach token-level
        reversal. The transform was rejected by the hashed promotion rule and never shipped, and a
        stronger form is now a separate hypothesis rather than a quiet retry.{' '}
      </p>
    </section>
  );
}

export function SamplesSection() {
  return (
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
  );
}

export function RunSection() {
  return (
    <section className="kalia-section" id="run">
      <div className="kalia-section-head">
        <h2 className="kalia-section-title">6. The run, replayed</h2>
        <p className="kalia-section-note">Figure 1 &middot; replayed from the primary log</p>
      </div>
      <p className="kalia-prose">
        The console replays the surviving training log — session three, steps 1,740 to 3,470, at
        every tenth step. Earlier sessions&apos; rows were lost to a resume incident (I8, Appendix C).
        Blue markers are validation evaluations; the square is the deterministic evaluation that
        established the model had not regressed.
      </p>
      <KaliaConsole />
    </section>
  );
}

export function TimelineSection() {
  return (
    <section className="kalia-section" id="timeline">
      <div className="kalia-section-head">
        <h2 className="kalia-section-title">Appendix A. Chapter-by-chapter log</h2>
        <p className="kalia-section-note">times in UTC, from the kernel run logs</p>
      </div>
      <p className="kalia-prose">
        The plan changed several times as measurements arrived. The entries below are the real order
        of events — each algorithm measured before the next was attempted — with the three decisive
        comparisons shown as figures.
      </p>
      {TIMELINE.map((day) => (
        <div className="kalia-day" key={day.label}>
          <p className="kalia-day-label">
            {day.label} — {day.title} <span>{day.date}</span>
          </p>
          <ol className="kalia-timeline">
            {day.entries.map((entry) => {
              const dimensions = entry.figure ? figureDimensions(entry.figure.src) : null;
              return (
                <li key={`${day.label}-${entry.time}-${entry.title}`}>
                  <time>{entry.time}</time>
                  <h3>{entry.title}</h3>
                  <p>{entry.body}</p>
                  {entry.figure && dimensions ? (
                    <figure className="kalia-timeline-figure">
                      <Image
                        src={entry.figure.src}
                        alt={entry.figure.alt}
                        width={dimensions.width}
                        height={dimensions.height}
                        unoptimized
                      />
                      <figcaption>{entry.figure.caption}</figcaption>
                    </figure>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </section>
  );
}

export function DecisionsSection() {
  return (
    <section className="kalia-section" id="decisions">
      <div className="kalia-section-head">
        <h2 className="kalia-section-title">Appendix B. Every decision</h2>
        <p className="kalia-section-note">every numbered entry, including the rejected ones</p>
      </div>
      <ol className="kalia-decisions">
        {DECISIONS.map((item) => (
          <li className="kalia-decision" key={item.id}>
            <span className="kalia-decision-id">{item.id}</span>
            <span className="kalia-decision-text">{item.decision}</span>
            <span className={pillClass(item.outcome)}>{item.outcome}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function IncidentsSection() {
  return (
    <section className="kalia-section" id="incidents">
      <div className="kalia-section-head">
        <h2 className="kalia-section-title">Appendix C. Every incident</h2>
        <p className="kalia-section-note">every incident, in full</p>
      </div>
      <div className="kalia-incidents">
        {INCIDENTS.map((incident) => (
          <article className="kalia-incident" key={incident.id}>
            <h3>
              <span>{incident.id}</span> {incident.title}
            </h3>
            <p>{incident.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function LinksSection() {
  return (
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
          <span>Training code, the dated journal, and the full incident record.</span>
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
        <pre className="kalia-mono" tabIndex={0}>
          {CITATION}
        </pre>
      </div>
    </section>
  );
}

export function KaliaOutro() {
  return (
    <footer className="kalia-outro">
      <p>
        KALIA is a personal research project. Not affiliated with any government scheme, company, or
        other project using a similar name. Training data is never redistributed; every source is
        attributed in the model card.
      </p>
      <p>
        <Link href="/projects/kalia">Case study</Link> &middot;{' '}
        <Link href="/writing/kalia-build-log">Technical write-up</Link> &middot;{' '}
        <Link href="/">Back to the portfolio</Link>
      </p>
    </footer>
  );
}
