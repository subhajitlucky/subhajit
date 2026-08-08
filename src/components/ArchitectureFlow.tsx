import type { Project } from '@/data/projects';

type ArchitectureFlowProps = {
  steps: Project['flow'];
};

export function ArchitectureFlow({ steps }: ArchitectureFlowProps) {
  return (
    <ol className="architecture-flow">
      {steps.map((step, index) => (
        <li key={step.label}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div>
            <strong>{step.label}</strong>
            <p>{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
