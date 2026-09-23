import { DECISIONS, HERO_STATS, INCIDENTS, RECIPE, SAMPLES, TIMELINE } from './data';
import { DETERMINISTIC_EVAL, PLANNED_STEPS, STOP_STEP, TRAIN_LOG, VAL_POINTS } from './train-log';

describe('kalia page data', () => {
  it('carries the full record: every decision and every incident', () => {
    expect(DECISIONS).toHaveLength(41);
    expect(INCIDENTS).toHaveLength(12);
    expect(new Set(DECISIONS.map((entry) => entry.id)).size).toBe(DECISIONS.length);
    expect(new Set(INCIDENTS.map((entry) => entry.id)).size).toBe(INCIDENTS.length);
  });

  it('tells the story across both days with real timestamps', () => {
    expect(TIMELINE.map((day) => day.label)).toEqual(['Day 1', 'Day 2']);
    for (const day of TIMELINE) {
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

  it('publishes headline stats, samples, and the recipe', () => {
    expect(HERO_STATS.length).toBeGreaterThanOrEqual(6);
    expect(SAMPLES).toHaveLength(3);
    expect(RECIPE.length).toBeGreaterThanOrEqual(10);
  });
});
