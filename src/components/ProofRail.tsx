const proofPoints = [
  {
    index: 'A',
    label: 'Public source',
    detail: 'Inspect the repositories, decisions, tests, and limitations behind the work.',
  },
  {
    index: 'B',
    label: 'Published packages',
    detail: 'Use the developer tools directly through their public npm releases.',
  },
  {
    index: 'C',
    label: 'Live systems',
    detail: 'Open selected product work in the browser and examine the implementation.',
  },
] as const;

export function ProofRail() {
  return (
    <aside className="proof-rail" aria-label="Ways to inspect the work">
      <div className="site-frame proof-rail-inner">
        <p className="proof-rail-title">Evidence, not adjectives</p>
        <ol>
          {proofPoints.map((point) => (
            <li key={point.index}>
              <span>{point.index}</span>
              <div>
                <strong>{point.label}</strong>
                <p>{point.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
