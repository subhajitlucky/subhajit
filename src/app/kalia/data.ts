export type TimelineEntry = {
  time: string;
  title: string;
  body: string;
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
        title: 'First GPU run, first crash',
        body: 'The first training run dies at step one: OutOfMemoryError. Batch 32 at context 1024 does not fit a T4. The fix is the standard move — micro-batch 8 with 32 gradient-accumulation steps, same effective batch — plus expandable memory segments. Three more incidents land in the same hour: API runs cannot read secrets, the dataset uploader drops subdirectories, and a failed subprocess is silently marked complete. All four are fixed and written down.',
      },
      {
        time: 'morning',
        title: 'Measure before you spend',
        body: 'Micro-ablations run at 30M parameters on 50M tokens, about 30 minutes per arm. AdamW scores 3.8041 step-700 validation loss. Muon scores 3.5937. Muon with QK-Norm and logit soft-capping scores 3.5103. The ordering holds at every checkpoint, so it is not noise. Only the winner gets full-scale quota.',
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
        title: 'The result we rejected',
        body: 'Muon+ — one post-polar normalization step — beats plain Muon on 7 of 7 checkpoints, by 0.015 nats. The promotion threshold, written down before the run, was 0.02. It does not ship. The full-scale model keeps plain Muon.',
      },
      {
        time: 'morning',
        title: 'The learning-rate sweep closes',
        body: 'Four arms: 0.015 scores 3.4943, 0.02 scores 3.4941, 0.03 scores 3.5027, 0.06 scores 3.5380. The recipe needed no change. Hyperparameter tuning is now closed — there is no headroom left to buy.',
      },
      {
        time: '07:18',
        title: 'The v2 corpus, then the compliance rebuild',
        body: 'A new mixture is built for v0.2.0: FineWeb-Edu, TinyStories, Cosmopedia, and permissively licensed Python. Then the audit finds the first code shard carried no license metadata at all. It is rebuilt with a per-file filter — MIT, Apache, BSD, ISC, Unlicense, CC0 only. Nothing unclear-licensed will ever train a public model.',
      },
      {
        time: '08:40',
        title: 'Architecture ablation',
        body: 'Four arms, same data, same seed: control, looped depth (the same weights twice), thin-and-deep, and grouped-query attention. Control wins at 3.4924. Looped and GQA are quality-neutral; thin-and-deep loses 0.2 nats. One finding survives: the looped model runs 1.35x slower per step, not 2x, because reused weights stay hot in cache.',
      },
      {
        time: '10:22',
        title: 'The plateau',
        body: 'Validation loss has not moved for a thousand steps — flat between 2.53 and 2.63 — while training loss keeps falling. It is impossible to tell a noisy eval from a real plateau from a single point, so both possibilities are written down and the run continues.',
      },
      {
        time: '11:06',
        title: 'The wall',
        body: 'Two things land in the same minute. The architecture verdict: nothing beats control by the pre-set margin, so nothing changes. And the quota push fails: 30 GPU-hours for the week are exhausted. Experiments stop; the plan changes.',
      },
      {
        time: '13:11',
        title: 'Session three ends at 73%',
        body: 'The training session reaches step 3,478 of 4,770 — 73% of the cosine schedule — and stops at the session limit. The last logged validation eval was noisy (2.5138), so the question stands: did the model regress, or is the eval noisy?',
      },
      {
        time: 'afternoon',
        title: 'The deterministic eval',
        body: 'A CPU evaluation — free, no GPU quota — runs 100 fixed-seed batches over 819,200 tokens: 2.4366 loss, 0.8184 bits-per-byte. The model never regressed; the swings were sampling noise. Under the pre-registered stopping rule, the plateau plus the quota wall make the stop final at step 3,478.',
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
];

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
