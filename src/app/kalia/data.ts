export type TimelineFigure = {
  src: string;
  alt: string;
  caption: string;
};

export type TimelineEntry = {
  time: string;
  title: string;
  body: string;
  figure?: TimelineFigure;
};

export type TimelineDay = {
  label: string;
  date: string;
  entries: TimelineEntry[];
};

export const TIMELINE: TimelineDay[] = [
  {
    label: 'Day 1',
    date: '2026-09-22',
    entries: [
      {
        time: '06:30',
        title: 'A repository and a rule',
        body: 'The first commit lands at 06:30 UTC: a design document, an implementation plan, and a scaffold. The rule is fixed from the start — no pretrained weights, ever. The architecture is a small decoder-only transformer (10 layers, 512 dimensions, RoPE, RMSNorm, SwiGLU) chosen to fit two T4s without gradient checkpointing. The suite grows test-first from the first minute.',
      },
      {
        time: '07:37',
        title: 'Tokenizing on free CPU',
        body: 'Data preparation runs on a Kaggle CPU notebook, which costs no GPU quota. TinyStories and FineWeb-Edu become 2.46B tokens of uint16 shards in about 37 minutes: 473,992,236 tokens of stories and 2,000,001,223 tokens of educational web text.',
      },
      {
        time: '08:52',
        title: 'First GPU run: out-of-memory at step one',
        body: 'The first training run fails at step one with an OutOfMemoryError. Batch 32 at context 1024 does not fit a T4. The fix is the standard one — micro-batch 8 with 32 gradient-accumulation steps, the same effective batch — plus expandable memory segments. Three further incidents land in the same hour: API runs cannot read secrets, the dataset uploader drops subdirectories, and a failed subprocess is silently marked complete. All four are fixed and recorded.',
      },
      {
        time: 'morning',
        title: 'Micro-ablations before full runs',
        body: 'Micro-ablations run at 30M parameters on 50M tokens, about 30 minutes per arm. AdamW scores 3.8041 step-700 validation loss; Muon scores 3.5937; Muon with QK-Norm and logit soft-capping scores 3.5103. The ordering holds at every checkpoint, so it is not noise. Only the winner receives full-scale quota.',
        figure: {
          src: '/kalia/optimizer-ablation.svg',
          alt: 'Bar chart of step-700 validation loss for AdamW (3.8041), Muon (3.5937), and Muon with QK-Norm and logit soft-capping (3.5103); lower is better.',
          caption: 'Figure A1 — the optimizer screen: each change measured at 30M parameters before any full run.',
        },
      },
      {
        time: 'evening',
        title: 'Two full runs launch',
        body: 'The AdamW baseline and the new Muon recipe train in parallel sessions. The baseline finishes its first session at step 2,250 with validation loss 3.2702. The Muon recipe ends at step 1,738 at 3.2214 — already past the baseline final loss with roughly 23% fewer tokens.',
      },
    ],
  },
  {
    label: 'Day 2',
    date: '2026-09-23',
    entries: [
      {
        time: '04:38',
        title: 'Resume, after fixing the race',
        body: 'Overnight, session two crashed on resume: both distributed workers wrote the same checkpoint file and one read it mid-write. The fix is a single downloader, an atomic file swap, and a barrier. Session three resumes cleanly and runs for eight and a half hours.',
      },
      {
        time: 'morning',
        title: 'Muon+ validated, not promoted',
        body: 'Muon+ — one post-polar normalization step — beats plain Muon on 7 of 7 checkpoints, by 0.015 nats. The promotion threshold, fixed before the run, was 0.02. It is not promoted. The full-scale model keeps plain Muon, and the result is recorded as validated but below the bar.',
      },
      {
        time: 'morning',
        title: 'The learning-rate sweep closes',
        body: 'Four arms: 0.015 scores 3.4943, 0.02 scores 3.4941, 0.03 scores 3.5027, 0.06 scores 3.5380. The recipe needed no change. Hyperparameter tuning is now closed — there is no headroom left to buy.',
      },
      {
        time: '07:18',
        title: 'The v2 corpus, then the compliance rebuild',
        body: 'A new mixture is built for v0.2.0: FineWeb-Edu, TinyStories, Cosmopedia, and permissively licensed Python. Git history shows why the first code shard was never filtered — the corpus that built v0.1.2 was created 40 minutes before the per-file license filter existed, so the shard streamed with no licence check at all. It is rebuilt with that filter — MIT, Apache, BSD, ISC, Unlicense, CC0 only. Nothing unclear-licensed will ever train a public model.',
      },
      {
        time: '08:40',
        title: 'Architecture ablation',
        body: 'Four arms, same data, same seed: control, looped depth (the same weights applied twice), thin-and-deep, and grouped-query attention. Control wins at 3.4924. Looped and GQA are quality-neutral; thin-and-deep loses 0.2 nats. One finding survives: the looped model runs 1.35x slower per step, not 2x, because reused weights stay hot in cache.',
        figure: {
          src: '/kalia/architecture-ablation.svg',
          alt: 'Bar chart of step-700 validation loss for the control architecture (3.4924), looped depth (3.5012), thin-and-deep (3.6969), and grouped-query attention (3.5031).',
          caption: 'Figure A2 — the architecture screen: no variant beats control by the pre-set 0.02 margin.',
        },
      },
      {
        time: '10:22',
        title: 'A validation plateau',
        body: 'Validation loss has not moved for a thousand steps — flat between 2.53 and 2.63 — while training loss keeps falling. A noisy evaluation and a real plateau are indistinguishable from a single point, so both possibilities are recorded and the run continues.',
        figure: {
          src: '/kalia/val-loss.svg',
          alt: 'Line chart of validation loss from step 250 to 3250: a steep descent from 4.0881 to 2.5270 by step 1500, then a plateau band between 2.40 and 2.63 for the remaining 1,750 steps, and a separate deterministic evaluation point at step 3478 with loss 2.4366.',
          caption: 'Figure A3 — the full curve: the descent finishes by step 1,500, and everything after it oscillates inside 0.23 nats. The first half was recovered from the model repository commit history (incident I14).',
        },
      },
      {
        time: '11:06',
        title: 'Quota exhausted',
        body: 'Two events land in the same minute. The architecture verdict: nothing beats control by the pre-set margin, so the recipe is unchanged. Then the quota push fails — the week\u2019s 30 GPU-hours are exhausted. Experiments stop and the plan is revised.',
      },
      {
        time: '13:11',
        title: 'Session three ends at 73%',
        body: 'The training session reaches step 3,478 of 4,770 — 73% of the cosine schedule — and stops at the session limit. The last logged validation eval was noisy (2.5138), so the question stands: did the model regress, or is the eval noisy?',
      },
      {
        time: 'afternoon',
        title: 'The deterministic eval',
        body: 'A CPU evaluation — free, no GPU quota — runs 100 fixed-seed batches over 819,200 tokens: 2.4366 loss, 0.8184 bits-per-byte, on the held-out set of the corpus as it then stood. The model never regressed; the swings were sampling noise. Under the pre-registered stopping rule, the plateau plus the quota wall make the stop final at step 3,478.',
      },
      {
        time: 'afternoon',
        title: 'Evaluation on CPU',
        body: 'Zero-shot benchmarks via lm-evaluation-harness: PIQA 61.4%, ARC-Easy 45.8%, HellaSwag 36.8%, WinoGrande 50.2%, LAMBADA 23.0% accuracy at 194 perplexity. And the custom metric: the Abhimanyu gap — reversed-text loss minus forward loss — is 6.06 nats. The model can enter fluent text but cannot exit it.',
      },
      {
        time: '14:00',
        title: 'Release',
        body: 'Decision D41: stop, document the plateau, save the remaining quota for v0.2.0. Within the hour the repository and the model weights are public: 41 numbered decisions, 12 published incidents, two hash-anchored pre-registrations, and every evaluation log. Total compute: about 20 GPU-hours on the free tier. Cost: zero dollars.',
      },
    ],
  },
  {
    label: 'Day 3',
    date: '2026-09-27',
    entries: [
      {
        time: 'Sunday',
        title: 'The experiment that was supposed to work',
        body: 'X16 tests the one hypothesis that could explain the 6.06-nat gap: that a model can only learn to exit a sequence, never to enter one reversed. Four arms, two seeds, 500 steps each — control against 50% chunk-preserving reversal training. The prediction was registered with a hash before the run: close the gap by at least 0.10 nats, at no more than 0.02 nats of forward-loss cost.',
      },
      {
        time: '14:56',
        title: 'It failed',
        body: 'Control gap 5.11 nats, treatment 5.25 — the gap got 0.14 nats worse, and forward loss rose 0.08. Both bars missed, on both seeds, in the same direction. The prediction that did hold is the more useful one: the gap is already 5.1 nats at 30M parameters, so it is a property of the architecture, not a symptom of undertraining.',
      },
      {
        time: '16:20',
        title: 'The published loss curve was missing its first half',
        body: 'The training log on Hugging Face began at step 1,740, because a fix that restores logs on resume landed one session after that session had already started with the old code. 347 logged steps \u2014 the whole descent from 10.7 down to the plateau \u2014 were gone from the public record. Rebuilt from the repository\u2019s own commit history, checked for gaps, and republished. The recovered curve supports the stop decision: the descent finishes by step 1,500 and the remaining 1,750 oscillate inside noise.',
      },
      {
        time: '19:05',
        title: 'The rebuilt corpus quietly replaced the measuring stick',
        body: 'The new run\u2019s first validation point reads 0.74 nats worse than the previous version\u2019s while its training loss is better, which looks exactly like a catastrophic regression. It is not. The corpus rebuild replaced the held-out set, and the old weights score 2.3915 on the old set and 3.1070 on the new one \u2014 the set alone explains the entire gap. Both versions were re-measured on the rebuilt set so that anything crossing the rebuild boundary is believed only after being checked on both sides. A yardstick that moves silently is indistinguishable from a model that does.',
        figure: {
          src: '/kalia/val-loss.svg',
          alt: 'Validation loss for v0.2.0 falling from 4.83 to 2.88 over 4,770 steps, flat from step 3,250, with deterministic reference points of 3.0533 for v0.1.2 and 2.8248 for v0.2.0 on the same rebuilt yardstick.',
          caption:
            'The answer to that question, once both versions were re-measured on the same set. The shaded band is the 1,500 steps at the end that bought nothing measurable.',
        },
      },
      {
        time: '15:00',
        title: 'The rule does the deciding',
        body: 'The promotion rule was hashed before the results existed, so there is nothing to renegotiate: the transform is rejected and never enters v0.2.0 (decision D42). A 50% reversed training mixture is not the same problem as reversing tokens, and the honest reading is that the chunk-order transform teaches nothing about entry into a reversed sequence. Token-level reversal stays on the list as a separate hypothesis, not a quiet retry.',
      },
    ],
  },
  {
    label: 'Day 4',
    date: '2026-09-28',
    entries: [
      {
        time: '02:06',
        title: 'v0.2.0 starts',
        body: 'The next run begins on a compliance-clean corpus rebuilt shard by shard (2.4B tokens; the code slice is now filtered to permissive licences only) with the frozen recipe, since the rejected experiment changed nothing about the recipe. Checkpoints sync to Hugging Face every 30 minutes so sessions can be interrupted safely.',
      },
      {
        time: '10:34',
        title: 'The benchmarks disagree with the loss curve',
        body: 'An evaluation at the step-3,470 checkpoint splits the two signals we had trusted to agree. Deterministic loss improves by 0.169 nats on identical weights and an identical protocol, but ARC-Easy falls 4.6 points and LAMBADA 4.6. Read alone this looks like a catastrophic corpus regression. It is a mid-run reading, recorded here precisely because it turned out to be the wrong one.',
      },
      {
        time: '11:03',
        title: 'A frontier architecture arm',
        body: 'Two 2026 changes screened against control at 30M parameters: rotary embeddings dropped on some layers, and a gated residual stream borrowed from a 125B model. Both pre-registered with hashed thresholds before the run, including an honest prior that the more interesting one was the likelier to be noise. Three arms, 500 steps, one seed.',
      },
      {
        time: '11:50',
        title: '41.7% of the code corpus is copyleft',
        body: 'Twenty thousand files, 197 million characters, eleven minutes of CPU. 58.1% permissive, 41.7% not, and GPL-family licences alone cover 39.5% of all files. The published card had been listing three of the four training sources and omitting the code slice entirely — the one dataset that needed disclosing. The interpretation had been fixed before the number was known: a material share means the rebuild is the remediation, and the rebuild was already under way.',
      },
      {
        time: '12:20',
        title: 'Windows were crossing documents',
        body: 'Auditing the data path finds the corpus is EOS-delimited and training never used that fact. Documents run about 200 tokens against a 1,024-token context, so nearly every window crossed a boundary with unmasked attention, and 0.3% spliced two corpora outright because the mixer writes in million-token round-robin blocks. Invisible to every metric being optimised — visible only by reading the mixer. Fixed with a block-diagonal document mask behind a config flag, pre-registered as an experiment at the same 0.010-nat bar that once rejected a loss-saving change.',
      },
      {
        time: '13:11',
        title: 'A long-form probe, and a source that cannot be loaded',
        body: 'The LAMBADA hypothesis gets measured properly: what share of each source\u2019s documents is at least as long as the context. The first source tried, a famous book corpus, turns out to ship a loading script that modern tooling refuses to execute, and the two obvious parquet mirrors of it declare no licence at all. Only one candidate passes both tests, at 99.3% long documents — but its median document is 104,719 tokens, one hundred times the context, so the passing number is also a warning.',
        figure: {
          src: '/kalia/training-data.svg',
          alt: 'The training mixture as a stacked bar, beside the share of each source whose documents reach the 1,024-token context: 26.2% for FineWeb-Edu, 0.03% for TinyStories, 13.2% for Cosmopedia, and 17.7% for the mixture overall.',
          caption:
            'What that probe found, and it is the reason LAMBADA moved: a fifth of the corpus supplies 0.03% of its long documents.',
        },
      },
      {
        time: '19:23',
        title: 'Session three, and the run finishes',
        body: 'The final session runs 6.35 hours to complete all 4,770 steps — 2.50 billion tokens, 477 contiguous log rows, no gaps. Validation loss reaches 2.8248 against 3.0533 for the previous version on the identical 100-batch protocol: 0.2285 nats better, 4.6 times the pre-registered bar. But the curve has been flat since step 3,250, so the last 31% of training bought nothing, exactly as the first version\u2019s curve did.',
      },
    ],
  },
  {
    label: 'Day 5',
    date: '2026-09-29',
    entries: [
      {
        time: '03:46',
        title: 'The gate never opened',
        body: 'The architecture arm finished 0.0436 nats ahead of control \u2014 4.4 times its bar, the largest effect any architecture arm has produced here \u2014 and nobody could say why. Measured on a hundred real validation batches, the learned gate sits at 0.0192 against a 0.018 floor and a 0.05 threshold. It never opened. That conclusion came from a single average, which is not a safe inference, so it was pre-registered as a test aimed at my own reading before any GPU time was spent; variation in response to input turned out to be 5e-06. The mechanism is not inert on average, it is inert everywhere.',
      },
      {
        time: '04:10',
        title: 'Our accuracy bars were below our own noise',
        body: 'The same arm passed its accuracy prediction \u2014 1.2 points on WinoGrande against a half-point bar \u2014 and the pass was worthless. The standard errors on these benchmarks at 500 samples are about two points, so the bar sat four and a half times under the noise and the result was 0.54 sigma: the expected size of nothing. The same flaw was in the promotion rule for the version that had just finished, which allowed one point of regression. The thresholds stay exactly as registered and the noise floor is published beside the verdict rather than used to rescue it. But the interim regressions now split cleanly: ARC-Easy and LAMBADA are real, and the other three were inside the noise all along.',
      },
      {
        time: '05:20',
        title: 'Reading the licence changed the answer',
        body: 'I had assumed the sharing licence on the children\u2019s stories blocked redistribution, and said publish the recipe rather than the data. Reading it, that was wrong. It explicitly places results \u2014 the outputs of training, our weights \u2014 beyond any obligation, and grants the right to train outright. So all three text sources permit both training and weight release, and this version\u2019s corpus is shippable under three cheap attribution conditions. The asymmetry is unflattering: the licence-clean checkpoint is the one that scores worse, and the earlier version, with copyleft in its training data, is the one whose bytes will never be published.',
      },
      {
        time: '06:30',
        title: 'The missing fifth task',
        body: 'The registered evaluation came back with four of five benchmarks. LAMBADA had silently failed to load: the dataset still ships a loading script and modern tooling refuses to run those. The data was never missing \u2014 six parquet files, the standard 5,153 examples \u2014 only the loader path the harness requested was dead. Fixing it took five attempts and four different wrong turns, each an assumption I had not checked, and the fix now lives in the repository with tests rather than inside a notebook. Final answer: 20.8, a 2.2 point drop.',
        figure: {
          src: '/kalia/bench-compare.svg',
          alt: 'Grouped bars for five zero-shot tasks, both versions, each with a grey band showing plus or minus one standard error of about two points. Three movements fall inside their own band.',
          caption:
            'The completed evaluation. The grey band is the measurement\u2019s own uncertainty, which is why three of the five movements cannot be called a change.',
        },
      },
      {
        time: '07:00',
        title: 'Four kernels died behind green uploads',
        body: 'The dataset publisher defaults to skipping directories, so the code dataset had been shipping with no config folder, no eval folder, and no JSON at all \u2014 which is why a measurement had never been reachable even though the code supported it. Every upload reported success. Then four kernels in a row failed on unchecked assumptions: a missing file, an import used before it was defined, a directory that was never there, and a parser handed markdown where it expected JSON. The publisher now stages one layout, always zips it, refuses an incomplete payload, and then downloads the result back to check seventeen files really are there. Assert the interface, then trust it.',
      },
    ],
  },
];

/* ---------------------------------------------------------------- versions */

export type Version = {
  id: string;
  label: string;
  status: 'released' | 'experiment';
  tokens: string;
  valLoss: number;
  bitsPerByte: number;
  note: string;
};

/**
 * Two checkpoints, one yardstick. v0.1.2 was re-measured on the rebuilt (v2b)
 * held-out set at 3.0533 so the two are comparable at all; the 2.4366 that
 * appears elsewhere in this project is v0.1.2 on the *original* set and is never
 * tabulated next to a rebuilt one.
 */
export const VERSIONS: Version[] = [
  {
    id: 'v0.1.2',
    label: '0.1.2',
    status: 'released',
    tokens: '1.82B',
    valLoss: 3.0533,
    bitsPerByte: 0.9992,
    note: 'stopped at 73% of its schedule; the first public release',
  },
  {
    id: 'v0.2.0',
    label: '0.2.0',
    status: 'experiment',
    tokens: '2.50B',
    valLoss: 2.8248,
    bitsPerByte: 0.9244,
    note: 'same recipe, compliance-rebuilt corpus; full 4,770-step schedule',
  },
];

export type BenchComparison = {
  task: string;
  chance: number;
  note: string;
  v012: number;
  v020: number;
  /** lm-eval standard error at limit=500, in points. See D45. */
  stderr: number;
};

/**
 * 0-shot, 500 samples, lm-evaluation-harness 0.4.9.
 *
 * `stderr` is carried because it changes how the table must be read: at this
 * sample size three of these five movements are smaller than the measurement's
 * own standard error and are not separable from v0.1.2 at all. The table is
 * directional; the loss number above it is the result.
 */
export const BENCH_COMPARISON: BenchComparison[] = [
  { task: 'PIQA', chance: 50, note: 'physical commonsense', v012: 61.4, v020: 63.8, stderr: 2.15 },
  {
    task: 'HellaSwag',
    chance: 25,
    note: 'sentence completion (normalized)',
    v012: 36.8,
    v020: 39.8,
    stderr: 1.99,
  },
  { task: 'WinoGrande', chance: 50, note: 'coreference', v012: 50.2, v020: 50.8, stderr: 2.24 },
  { task: 'LAMBADA', chance: 0, note: 'long-range cloze', v012: 23.0, v020: 20.8, stderr: 1.82 },
  { task: 'ARC-Easy', chance: 25, note: 'science questions', v012: 45.8, v020: 42.0, stderr: 2.21 },
];

/* ----------------------------------------------------------- training data */

export type TrainingSource = {
  name: string;
  share: number;
  license: string;
  /** Share of that source's documents at least as long as the 1,024-token context. */
  longDocShare: number | null;
  note: string;
};

/**
 * The 2.4B-token mixture, and the measurement that explains the LAMBADA
 * regression: `longDocShare` is the share of each source's documents at least as
 * long as the model's context window. Token-weighted only 17.7% of the corpus
 * qualifies, and TinyStories - a fifth of the mixture - supplies 0.03% of it.
 */
export const TRAINING_DATA: TrainingSource[] = [
  {
    name: 'FineWeb-Edu (dedup)',
    share: 60,
    license: 'ODC-By-1.0',
    longDocShare: 26.2,
    note: 'educational web text',
  },
  {
    name: 'TinyStories',
    share: 20,
    license: 'CDLA-Sharing-1.0',
    longDocShare: 0.03,
    note: "children's stories; almost none long enough to matter",
  },
  {
    name: 'Cosmopedia v2',
    share: 15,
    license: 'Apache-2.0',
    longDocShare: 13.2,
    note: 'synthetic textbooks',
  },
  {
    name: 'Python (per-file filtered)',
    share: 5,
    license: '7 permissive licences',
    longDocShare: null,
    note: 'the earlier unfiltered slice was 41.7% copyleft',
  },
];

export const TRAINING_MIXTURE = {
  trainTokens: 2_400_000_000,
  valTokens: 10_000_000,
  contextLen: 1024,
  /** Token-weighted share of training tokens inside a document >= contextLen. */
  longDocShare: 17.7,
  /** The source the probe found at 99.3%, i.e. the measured remedy. */
  candidate: { name: 'Gutenberg (MIT)', longDocShare: 99.3 },
};

export type Decision = {
  id: string;
  decision: string;
  outcome: string;
};

export const DECISIONS: Decision[] = [
  { id: 'D1', decision: 'Kaggle as the platform: 30 GPU-hours per week, 2x T4', outcome: 'held' },
  { id: 'D2', decision: 'From-scratch only; no fine-tuning, no distillation', outcome: 'held' },
  { id: 'D3', decision: '58M params: 10 layers x 512 dim, context 1024', outcome: 'held' },
  { id: 'D4', decision: 'TinyStories + FineWeb-Edu corpus', outcome: 'held' },
  { id: 'D5', decision: 'One change per version, incremental ladder', outcome: 'held' },
  { id: 'D6', decision: 'Micro-ablation before every full run', outcome: 'held' },
  { id: 'D7', decision: 'Pre-register experiments with hashed predictions', outcome: 'held' },
  { id: 'D8', decision: 'Journal every session; three sources per research claim', outcome: 'held' },
  { id: 'D9', decision: 'Micro-batch 8 x accum 32: OOM fix at equal effective batch', outcome: 'held' },
  { id: 'D10', decision: 'Browser-started runs only: API runs cannot read secrets', outcome: 'held' },
  { id: 'D11', decision: 'Freeze v0.1.0 as the equal-token baseline', outcome: 'held' },
  { id: 'D12', decision: 'Screen changes at 30M params, 50M tokens, ~30 min', outcome: 'held' },
  { id: 'D13', decision: 'Journal everything; verify every claim', outcome: 'held' },
  { id: 'D14', decision: 'Implement Muon+ as experiment E1', outcome: 'validated, below threshold' },
  { id: 'D15', decision: 'E1 at -0.015 misses the 0.02 threshold; do not promote', outcome: 'enforced' },
  { id: 'D16', decision: 'Fix resume race: single downloader, atomic swap, barrier', outcome: 'fixed' },
  { id: 'D17', decision: 'Expert reprioritization: sweeps first, recipe lock, data before architecture', outcome: 'held' },
  { id: 'D18', decision: 'Finish v0.1.2 instead of abandoning at 71%', outcome: 'held' },
  { id: 'D19', decision: 'v2 mixture: 60/20/15/5 FineWeb-Edu / TinyStories / Cosmopedia / code', outcome: 'built' },
  { id: 'D20', decision: 'Punch above weight: token efficiency and data quality before scale', outcome: 'held' },
  { id: 'D21', decision: 'Distillation rejected: KALIA stays a pure from-scratch lineage', outcome: 'closed' },
  { id: 'D22', decision: 'Adopt test-time training and self-teaching research track', outcome: 'queued' },
  { id: 'D23', decision: 'Invention target: entity memory + in-place test-time weights', outcome: 'queued' },
  { id: 'D24', decision: 'Looped depth promoted to front of queue', outcome: 'tested, rejected' },
  { id: 'D25', decision: 'RL self-play and MoE/DSA rejected at this scale, on evidence', outcome: 'closed' },
  { id: 'D26', decision: 'Continual-learning recipe planned for post-training', outcome: 'planned' },
  { id: 'D27', decision: 'Publish minimum footprint, honest only, never redistribute data', outcome: 'enforced' },
  { id: 'D28', decision: 'Rebuild v2 code shard with a per-file license filter', outcome: 'done' },
  { id: 'D29', decision: 'Build an evaluation harness: probes, bpB, comparison tool', outcome: 'done' },
  { id: 'D30', decision: 'Reasoning policy: public methods, our own weights, no RLVR yet', outcome: 'held' },
  { id: 'D31', decision: 'Freeze Muon LR at 0.02; sweep complete', outcome: 'closed' },
  { id: 'D32', decision: 'Three ancient-text-inspired designs queued (Kautilya, Utsarga, Apoha)', outcome: 'queued' },
  { id: 'D33', decision: 'Four more queued; Jata-patha becomes the reversal experiment X16', outcome: 'queued' },
  { id: 'D34', decision: 'Three Veda-derived designs recorded', outcome: 'queued' },
  { id: 'D35', decision: 'Gita compilation adapted; prior art cited, not claimed as novel', outcome: 'queued' },
  { id: 'D36', decision: 'Entity-consistency harness built; novelty claim narrowed after prior-art check', outcome: 'active' },
  { id: 'D37', decision: 'Chakravyuha dismissal corrected; Abhimanyu-gap metric built', outcome: 'active' },
  { id: 'D38', decision: 'Hash-anchored pre-registration and pre-registered stopping adopted', outcome: 'active' },
  { id: 'D39', decision: 'Strategic audit: finish, test, publish, then v0.2.0; freeze the queue', outcome: 'held' },
  { id: 'D40', decision: 'Quota-exhaustion response: defer the experiment, publish assets now', outcome: 'superseded' },
  { id: 'D41', decision: 'Stop v0.1.2 at step 3,478: converged within noise, quota to v0.2.0', outcome: 'done' },
  { id: 'D42', decision: 'X16 rejected: reversal made the gap worse on both seeds; frozen recipe to v0.2.0', outcome: 'enforced' },
  { id: 'D43', decision: 'The rebuilt corpus redefines the yardstick: v2b val is canonical, v0.1.2 re-baselined on it', outcome: 'active' },
  { id: 'D44', decision: 'Licence finding disclosed; publish the filtered corpus plus the filter, never the raw corpus', outcome: 'active' },
  { id: 'D45', decision: 'Accuracy thresholds must sit above the benchmark noise floor; X18 and S-A were both under-powered', outcome: 'active' },
];

export type Incident = {
  id: string;
  title: string;
  detail: string;
};

export const INCIDENTS: Incident[] = [
  { id: 'I1', title: 'API runs cannot read secrets', detail: 'Secrets attach per notebook in the UI only. Real runs now start from the browser, with a fail-fast connection test.' },
  { id: 'I2', title: 'Config missing in the first GPU run', detail: 'The dataset uploader skips subdirectories. Configs were flattened into the dataset root and the notebook now asserts they exist.' },
  { id: 'I3', title: 'Out of memory at step one', detail: 'Batch 32 at context 1024 exceeded a T4. Fixed with micro-batch 8 x accum 32 and expandable memory segments.' },
  { id: 'I4', title: 'A failed run marked complete', detail: 'Shell-style commands do not fail notebook cells. Replaced with subprocess calls that assert their exit codes.' },
  { id: 'I5', title: 'Repository hygiene', detail: 'Early drafts carried environment-specific wording and inconsistent authorship. Documentation was normalized.' },
  { id: 'I6', title: 'Resume crash (EOFError)', detail: 'Both distributed workers wrote and read the same checkpoint file. Fixed with a single downloader, an atomic swap, and a barrier.' },
  { id: 'I7', title: 'Latent crash on older checkpoints', detail: 'The optimizer loader dropped keys added after those checkpoints were saved. Defaults are restored, with a regression test.' },
  { id: 'I8', title: 'Log history lost across sessions', detail: 'Each session starts with an empty workspace, so pushing logs replaced them. Resume now pulls and appends. The first session rows are recorded as a known loss.' },
  { id: 'I9', title: 'Mix step failed after two hours', detail: 'Relative paths resolved against the wrong directory after a cd. Absolute paths now; a mix-only kernel reuses the completed shards.' },
  { id: 'I10', title: 'Wrong mount path and stale code', detail: 'Dataset mounts live under /kaggle/input/datasets/<owner>/<slug>/, and the dataset had not been re-versioned. Both corrected.' },
  { id: 'I11', title: 'A misreported duration', detail: 'I described a 44-minute ablation as having run five hours, trusting my sense of time over the run-start timestamp. The correction is in the journal.' },
  { id: 'I12', title: 'Weekly GPU quota exhausted', detail: 'The push failed with 30 of 30 GPU-hours used; the UI earlier read "24 hours remaining". Only the push attempt is authoritative. Experiments deferred to the weekly reset.' },
  { id: 'I13', title: 'A queue, not a bug', detail: 'Two kernels sat QUEUED for 45 minutes at Sunday peak capacity, and a retry loop pushed the account past its limit — the cap of two batch GPU sessions counts queued ones, so a retry that assumes a failure can consume the retry\'s own budget. Deleting the duplicate and pushing once started the run immediately.' },
  { id: 'I14', title: 'The published loss curve was missing its first half', detail: 'The v0.1.2 training log on Hugging Face began at step 1740: a code change adding log-restore-on-resume landed at 06:00 UTC, one session after that session had already started with the old code, so 347 logged steps vanished from the public record. Rebuilt from the repository\'s own commit history, verified contiguous (steps 10 to 3470, no gaps) and republished. The recovered curve supports the stop decision: the descent finishes by step 1,500 and the remaining 1,750 steps oscillate inside noise.' },
  { id: 'I15', title: 'Training windows ignored document boundaries', detail: 'The corpus is EOS-delimited — all four sources, median document ~200 tokens — but windows were sampled with no document awareness and attention ran unmasked, so nearly every 1,024-token window crossed a boundary. Worse, the mixer writes the four corpora in million-token round-robin blocks, so 0.3% of windows splice two corpora with no separator at all. Invisible to loss and to every benchmark we tracked: found by reading the mixer. Fixed with a block-diagonal document mask behind a config flag, and pre-registered as an experiment (X17) at the same 0.010-nat bar that once rejected Muon+.' },
  { id: 'I16', title: '41.7% of the code corpus is copyleft, and it shipped', detail: 'A 20,000-file sample of the code corpus measures 41.7% of characters under non-permissive licences, with GPL-family terms covering 39.5% of all files. The licence filter was written, tested, and correct — it just landed 40 minutes after the corpus that needed it, and nothing tied a new filter to a rebuild of the datasets already built. v0.1.2 therefore trained on roughly 50M copyleft tokens, about 2% of its training set, and its published card had listed three of the four sources while omitting the code slice entirely. Eleven minutes of CPU and one random sample found what no loss curve could. The v0.1.2 card now discloses it, and publishing training data is redefined as publishing the filtered corpus plus the filter — never the raw corpus, because redistributing copyleft text is the step that actually triggers the obligation.' },
  { id: 'I17', title: 'The dataset was silently dropping two directories', detail: 'kaggle datasets version defaults to --dir-mode skip, which ignores subdirectories entirely. The code dataset had been published flat, so configs/ and eval/ were both absent and it contained zero JSON files — meaning no kernel could resolve eval/probe_sentences.json, which is the real reason the Abhimanyu gap was never measurable even though the code supported it. The upload reported success every time. Four kernels failed in a row behind a green upload, each from one unchecked assumption: a missing file, an import used before it was defined, a missing directory, and a parser handed markdown where it expected JSON. The dataset publisher now stages one layout, always uses -r zip, refuses to publish an incomplete payload, then downloads the result back and asserts seventeen required files resolve. Assert the interface, then trust it.' },
];

export type Benchmark = {
  task: string;
  score: number;
  chance: number;
  note: string;
};

export const BENCHMARKS: Benchmark[] = [
  { task: 'PIQA', score: 61.4, chance: 50, note: 'physical commonsense' },
  { task: 'ARC-Easy', score: 45.8, chance: 25, note: 'science questions' },
  { task: 'HellaSwag', score: 36.8, chance: 25, note: 'sentence completion (normalized)' },
  { task: 'WinoGrande', score: 50.2, chance: 50, note: 'coreference' },
  { task: 'LAMBADA', score: 23.0, chance: 0, note: 'long-range cloze; perplexity 194' },
];

export type Sample = {
  prompt: string;
  text: string;
  note: string;
};

export const SAMPLES: Sample[] = [
  {
    prompt: 'The little fox',
    text: 'The little fox was so restless. He wanted to explore the pond, but he was too small. Suddenly, he heard a voice. It said, "Do not go near the water". The fox looked up and saw a little girl smiling at him. The girl said, "Let\'s go have some fun the next time we get closer!".',
    note: 'Coherent scene, dialogue, and a promise of more — at 58M parameters.',
  },
  {
    prompt: 'The brave rabbit',
    text: 'The brave rabbit saw two and three friends flying together in the sky. They were laughing and exploring together. The friends sang, laughed and sang. They were so happy to have a friend like the brave seeker.',
    note: 'Repetition at "two and three friends" — the model\'s small vocabulary of ideas shows here.',
  },
  {
    prompt: 'A curious cat named',
    text: 'A curious cat named Max. One day, Tim went to the pond to catch some fish to eat. The fish was not happy and swam away. Tim saw a man fishing in a nearby river.',
    note: 'The honest failure mode: Max becomes Tim within two sentences. Entity drift is the reason the next experiment exists.',
  },
];

export const RECIPE = [
  ['Parameters', '57,856,256'],
  ['Shape', '10 layers x 512 dim x 8 heads'],
  ['Context', '1,024 tokens'],
  ['Vocabulary', '50,257 (GPT-2 BPE)'],
  ['Optimizer', 'Muon 0.02 + AdamW 6e-4'],
  ['Schedule', 'cosine, 500-step warmup, 4,770 planned steps'],
  ['Batch', '524,288 tokens per step (8 x 32 x 1024 x 2 GPUs)'],
  ['Precision', 'fp16 with gradient scaling, DDP across 2x T4'],
  ['Corpus', 'TinyStories + FineWeb-Edu, 2.46B tokens'],
  ['Tokens seen', '1.82B (stopped at step 3,478 of 4,770)'],
  ['Compute', 'about 20 free-tier GPU-hours'],
  ['Cost', '$0'],
];

export const HERO_STATS = [
  { label: 'parameters', value: '57.9M' },
  { label: 'tokens seen', value: '1.82B' },
  { label: 'val loss', value: '2.4366' },
  { label: 'bits/byte', value: '0.8184' },
  { label: 'PIQA', value: '61.4%' },
  { label: 'Abhimanyu gap', value: '6.06 nats' },
  { label: 'GPU-hours', value: '~20' },
  { label: 'cost', value: '$0' },
];

export const CITATION = `@misc{kalia2026,
  title        = {KALIA: a 58M-parameter language model trained
                  from scratch on free GPUs},
  author       = {Pradhan, Subhajit},
  year         = {2026},
  howpublished = {\\url{https://huggingface.co/kalia-lm/kalia-v012}},
  note         = {v0.1.2; stopped at step 3,478 of 4,770 of the
                  cosine schedule; all logs, decisions, and
                  pre-registrations are public}
}`;
