import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import {
  BENCH_COMPARISON,
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
import { DETERMINISTIC_EVAL, PLANNED_STEPS, STOP_STEP, TRAIN_LOG, VAL_POINTS } from './train-log';

function repoFile(relativePath: string) {
  let directory = process.cwd();

  while (true) {
    const candidate = join(directory, relativePath);
    if (existsSync(candidate)) return candidate;

    const parent = dirname(directory);
    if (parent === directory) throw new Error(`Could not find ${relativePath}`);
    directory = parent;
  }
}

describe('kalia page data', () => {
  it('carries the full record: every decision and every incident, with no gaps', () => {
    expect(DECISIONS).toHaveLength(51);
    expect(INCIDENTS).toHaveLength(24);
    expect(DECISIONS.map((entry) => Number(entry.id.slice(1)))).toEqual(
      Array.from({ length: 51 }, (_, index) => index + 1),
    );
    expect(INCIDENTS.map((entry) => Number(entry.id.slice(1)))).toEqual(
      Array.from({ length: 24 }, (_, index) => index + 1),
    );
  });

  it('tells the story across all eight chapters with real timestamps', () => {
    expect(TIMELINE.map((day) => day.label)).toEqual([
      'Chapter 1',
      'Chapter 2',
      'Chapter 3',
      'Chapter 4',
      'Chapter 5',
      'Chapter 6',
      'Chapter 7',
      'Chapter 8',
    ]);
    for (const day of TIMELINE) {
      expect(day.title.length).toBeGreaterThan(0);
      expect(day.entries.length).toBeGreaterThan(4);
      for (const entry of day.entries) {
        expect(entry.time.length).toBeGreaterThan(0);
        expect(entry.title.length).toBeGreaterThan(0);
        expect(entry.body.length).toBeGreaterThan(40);
      }
    }
  });

  it('keeps the replay data honest and ordered', () => {
    expect(TRAIN_LOG.length).toBeGreaterThan(150);
    for (let i = 1; i < TRAIN_LOG.length; i += 1) {
      expect(TRAIN_LOG[i][0]).toBeGreaterThan(TRAIN_LOG[i - 1][0]);
      expect(TRAIN_LOG[i][4]).toBeGreaterThan(TRAIN_LOG[i - 1][4]);
    }
    expect(STOP_STEP).toBeLessThan(PLANNED_STEPS);
    expect(VAL_POINTS.length).toBeGreaterThan(5);
    const valLosses = VAL_POINTS.map(([, loss]) => loss);
    expect(DETERMINISTIC_EVAL[0]).toBe(STOP_STEP);
    expect(DETERMINISTIC_EVAL[1]).toBeGreaterThanOrEqual(Math.min(...valLosses));
    expect(DETERMINISTIC_EVAL[1]).toBeLessThanOrEqual(Math.max(...valLosses));
  });

  it('keeps derived checkpoint numbers consistent', () => {
    const v012 = VERSIONS.find((version) => version.id === 'v0.1.2');
    const v020 = VERSIONS.find((version) => version.id === 'v0.2.0');

    expect(v012).toBeDefined();
    expect(v020).toBeDefined();
    if (!v012 || !v020) return;

    expect(Math.round((v012.valLoss - v020.valLoss) * 10000) / 10000).toBe(0.2285);
    expect((v012.valLoss - v020.valLoss) / 0.05).toBeCloseTo(4.57, 2);
  });

  it('keeps benchmark comparisons within the published noise rule', () => {
    expect(BENCH_COMPARISON).toHaveLength(5);

    for (const row of BENCH_COMPARISON) {
      expect(row.stderr).toBeGreaterThan(0);
      expect(Math.abs(row.v020 - row.v012) / row.stderr).toBeLessThan(2);
    }

    expect(BENCH_COMPARISON.filter((row) => row.v020 < row.v012)).toHaveLength(2);
  });

  it('keeps numeric timeline times in order within each chapter', () => {
    for (const day of TIMELINE) {
      const times = day.entries
        .map((entry) => entry.time)
        .filter((time) => /^\d{2}:\d{2}$/.test(time))
        .map((time) => Number(time.replace(':', '')));

      expect(times).toEqual([...times].sort((a, b) => a - b));
    }
  });

  it('keeps the training mixture internally consistent', () => {
    expect(TRAINING_DATA.reduce((total, source) => total + source.share, 0)).toBe(100);
    expect(TRAINING_MIXTURE.longDocShare).toBe(17.7);
    expect(TRAINING_MIXTURE.candidate.longDocShare).toBe(99.3);
  });

  it('keeps the replay CSV and TypeScript log in sync', () => {
    const trainCsv = readFileSync(repoFile('public/kalia/logs/train_log.csv'), 'utf8')
      .trim()
      .split('\n')
      .slice(1)
      .map((line) => line.split(','))
      .map(([step, loss, lr, tokens, elapsed]) => [
        Number(step),
        Number(loss),
        Number(lr),
        Number(tokens),
        Number(elapsed),
      ]);

    expect(trainCsv).toEqual(TRAIN_LOG);

    const valCsv = readFileSync(repoFile('public/kalia/logs/val_log.csv'), 'utf8')
      .trim()
      .split('\n')
      .slice(1)
      .map((line) => line.split(','))
      .map(([step, loss]) => [Number(step), Number(loss)]);

    expect(valCsv).toEqual(VAL_POINTS);
  });

  it('publishes headline stats, samples, and the recipe', () => {
    expect(HERO_STATS.length).toBeGreaterThanOrEqual(6);
    expect(SAMPLES).toHaveLength(3);
    expect(RECIPE.length).toBeGreaterThanOrEqual(10);
  });
});
