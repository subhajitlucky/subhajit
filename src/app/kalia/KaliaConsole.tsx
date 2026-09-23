'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DETERMINISTIC_EVAL, PLANNED_STEPS, STOP_STEP, TRAIN_LOG, VAL_POINTS } from './train-log';

const SPEEDS = [
  { label: 'slow', rowsPerSecond: 2 },
  { label: 'normal', rowsPerSecond: 8 },
  { label: 'fast', rowsPerSecond: 40 },
] as const;

const CHART = { width: 760, height: 320, left: 52, right: 20, top: 24, bottom: 40 };
const Y_MIN = 2.3;
const Y_MAX = 3.5;
const X_MAX = PLANNED_STEPS;

function tokensPerSecond(index: number): number {
  if (index <= 0) return 0;
  const [tokens, elapsed] = [TRAIN_LOG[index][3], TRAIN_LOG[index][4]];
  const [prevTokens, prevElapsed] = [TRAIN_LOG[index - 1][3], TRAIN_LOG[index - 1][4]];
  const dt = elapsed - prevElapsed;
  return dt > 0 ? (tokens - prevTokens) / dt : 0;
}

function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}

export function KaliaConsole() {
  const total = TRAIN_LOG.length;
  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [started, setStarted] = useState(false);
  const interactedRef = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const markInteracted = useCallback(() => {
    interactedRef.current = true;
    setStarted(true);
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReducedMotion(query.matches);
      if (query.matches) setCursor(TRAIN_LOG.length - 1);
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reducedMotion || started) return;
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (interactedRef.current) return;
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          setCursor(0);
          setPlaying(true);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, started]);

  useEffect(() => {
    if (!playing) return;
    const rowsPerSecond = SPEEDS[speedIndex].rowsPerSecond;
    const interval = window.setInterval(() => {
      setCursor((current) => {
        const next = current + 1;
        if (next >= total - 1) {
          setPlaying(false);
          return total - 1;
        }
        return next;
      });
    }, 1000 / rowsPerSecond);
    return () => window.clearInterval(interval);
  }, [playing, speedIndex, total]);

  const row = TRAIN_LOG[Math.min(cursor, total - 1)];
  const finished = cursor >= total - 1;
  const tps = useMemo(() => tokensPerSecond(Math.min(cursor, total - 1)), [cursor, total]);

  const sx = useCallback(
    (step: number) => CHART.left + (step / X_MAX) * (CHART.width - CHART.left - CHART.right),
    [],
  );
  const sy = useCallback(
    (loss: number) =>
      CHART.top + ((Y_MAX - loss) / (Y_MAX - Y_MIN)) * (CHART.height - CHART.top - CHART.bottom),
    [],
  );

  const path = useMemo(() => {
    const points = TRAIN_LOG.slice(0, cursor + 1).map(
      ([step, loss]) => `${sx(step).toFixed(1)},${sy(loss).toFixed(1)}`,
    );
    if (points.length === 0) return '';
    return `M${points.join(' L')}`;
  }, [cursor, sx, sy]);

  const areaPath = useMemo(() => {
    if (!path) return '';
    const last = TRAIN_LOG[Math.min(cursor, total - 1)];
    const base = sy(Y_MIN);
    return `${path} L${sx(last[0]).toFixed(1)},${base.toFixed(1)} L${sx(TRAIN_LOG[0][0]).toFixed(1)},${base.toFixed(1)} Z`;
  }, [path, cursor, sx, sy, total]);

  const logLines = TRAIN_LOG.slice(Math.max(0, cursor - 11), cursor + 1);

  return (
    <div className="kalia-console" ref={sectionRef}>
      <div className="kalia-console-head">
        <span className="kalia-dot" aria-hidden="true" />
        <span className="kalia-mono">kalia-train-v012 &middot; session 3 replay, steps 1,740&ndash;3,470</span>
        <span className="kalia-mono kalia-console-progress">
          {formatNumber(row[0])} / {formatNumber(PLANNED_STEPS)}
        </span>
      </div>

      <div className="kalia-console-grid">
        <div className="kalia-chart" aria-hidden="true">
          <svg viewBox={`0 0 ${CHART.width} ${CHART.height}`} role="img" aria-label="Training loss replayed from the real log">
            {[2.4, 2.6, 2.8, 3.0, 3.2, 3.4].map((value) => (
              <g key={value}>
                <line
                  x1={CHART.left}
                  y1={sy(value)}
                  x2={CHART.width - CHART.right}
                  y2={sy(value)}
                  className="kalia-gridline"
                />
                <text x={CHART.left - 8} y={sy(value) + 4} className="kalia-axis" textAnchor="end">
                  {value.toFixed(1)}
                </text>
              </g>
            ))}
            {[0, 1000, 2000, 3000, 4000].map((value) => (
              <text
                key={value}
                x={sx(value)}
                y={CHART.height - CHART.bottom + 18}
                className="kalia-axis"
                textAnchor="middle"
              >
                {formatNumber(value)}
              </text>
            ))}
            <line
              x1={sx(STOP_STEP)}
              y1={CHART.top}
              x2={sx(STOP_STEP)}
              y2={CHART.height - CHART.bottom}
              className="kalia-stopline"
            />
            <text x={sx(STOP_STEP) - 6} y={CHART.top + 12} className="kalia-axis kalia-stop-label" textAnchor="end">
              quota stop &middot; 3,478
            </text>
            <line
              x1={sx(TRAIN_LOG[0][0])}
              y1={CHART.top}
              x2={sx(TRAIN_LOG[0][0])}
              y2={CHART.height - CHART.bottom}
              className="kalia-logline"
            />
            <text x={sx(TRAIN_LOG[0][0]) + 6} y={CHART.top + 12} className="kalia-axis">
              log begins &middot; 1,740
            </text>
            {areaPath ? <path d={areaPath} className="kalia-area" /> : null}
            {path ? <path d={path} className="kalia-line" /> : null}
            {VAL_POINTS.filter(([step]) => step <= row[0]).map(([step, loss]) => (
              <circle key={step} cx={sx(step)} cy={sy(loss)} r="3.5" className="kalia-valdot" />
            ))}
            {finished ? (
              <g>
                <rect
                  x={sx(DETERMINISTIC_EVAL[0]) - 4.5}
                  y={sy(DETERMINISTIC_EVAL[1]) - 4.5}
                  width="9"
                  height="9"
                  className="kalia-detdot"
                />
                <text
                  x={sx(DETERMINISTIC_EVAL[0]) - 10}
                  y={sy(DETERMINISTIC_EVAL[1]) - 10}
                  className="kalia-axis kalia-det-label"
                  textAnchor="end"
                >
                  deterministic eval 2.4366
                </text>
              </g>
            ) : null}
          </svg>
          <div className="kalia-legend kalia-mono">
            <span><i className="kalia-swatch kalia-swatch-line" /> train loss</span>
            <span><i className="kalia-swatch kalia-swatch-val" /> val evals</span>
            <span><i className="kalia-swatch kalia-swatch-det" /> deterministic eval</span>
          </div>
        </div>

        <div className="kalia-readout">
          <div className="kalia-stat">
            <span className="kalia-label">loss</span>
            <strong className="kalia-mono">{row[1].toFixed(4)}</strong>
          </div>
          <div className="kalia-stat">
            <span className="kalia-label">lr</span>
            <strong className="kalia-mono">{row[2].toExponential(2)}</strong>
          </div>
          <div className="kalia-stat">
            <span className="kalia-label">tokens</span>
            <strong className="kalia-mono">{formatNumber(row[3])}</strong>
          </div>
          <div className="kalia-stat">
            <span className="kalia-label">tok/s</span>
            <strong className="kalia-mono">{formatNumber(Math.round(tps))}</strong>
          </div>

          <div className="kalia-terminal kalia-mono" aria-hidden="true">
            {logLines.map(([step, loss, lr, , elapsed]) => (
              <div key={step} className={step === row[0] ? 'kalia-terminal-current' : undefined}>
                <span className="kalia-dim">{elapsed.toFixed(0).padStart(5, ' ')}s</span>{' '}
                step {formatNumber(step).padStart(5, ' ')} | loss {loss.toFixed(4)} | lr{' '}
                {lr.toExponential(2)}
              </div>
            ))}
          </div>

          <div className="kalia-controls">
            <button
              type="button"
              className="kalia-button"
              onClick={() => {
                markInteracted();
                if (finished) setCursor(0);
                setPlaying((value) => !value);
              }}
            >
              {playing ? 'pause' : finished ? 'replay' : 'play'}
            </button>
            <button
              type="button"
              className="kalia-button"
              onClick={() => {
                markInteracted();
                setPlaying(false);
                setCursor(total - 1);
              }}
            >
              end
            </button>
            <div className="kalia-speeds kalia-mono">
              {SPEEDS.map((speed, index) => (
                <button
                  key={speed.label}
                  type="button"
                  className={index === speedIndex ? 'kalia-speed kalia-speed-active' : 'kalia-speed'}
                  onClick={() => {
                    markInteracted();
                    setSpeedIndex(index);
                  }}
                >
                  {speed.label}
                </button>
              ))}
            </div>
          </div>

          <label className="kalia-scrub">
            <span className="kalia-label">scrub</span>
            <input
              type="range"
              min={0}
              max={total - 1}
              value={cursor}
              onChange={(event) => {
                markInteracted();
                setPlaying(false);
                setCursor(Number(event.target.value));
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
