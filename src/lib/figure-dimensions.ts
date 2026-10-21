export const KALIA_FIGURE_DIMENSIONS = {
  '/kalia/architecture-ablation.svg': { width: 720, height: 286 },
  '/kalia/bench-compare.svg': { width: 720, height: 424 },
  '/kalia/benchmarks.svg': { width: 720, height: 286 },
  '/kalia/optimizer-ablation.svg': { width: 720, height: 242 },
  '/kalia/replication-collapse.svg': { width: 720, height: 430 },
  '/kalia/seed-spread.svg': { width: 720, height: 242 },
  '/kalia/training-data.svg': { width: 720, height: 320 },
  '/kalia/val-loss.svg': { width: 720, height: 420 },
  '/kalia/val-loss-v012.svg': { width: 720, height: 400 },
  '/tarka/council.svg': { width: 720, height: 360 },
  '/sutra/tokens-per-message.svg': { width: 720, height: 310 },
  '/sutra/comprehension.svg': { width: 720, height: 360 },
  '/sutra/journey.svg': { width: 720, height: 330 },
  '/rls/study-patterns.svg': { width: 720, height: 380 },
} as const;

export function figureDimensions(src: string) {
  return (
    KALIA_FIGURE_DIMENSIONS[src as keyof typeof KALIA_FIGURE_DIMENSIONS] ?? {
      width: 720,
      height: 400,
    }
  );
}
