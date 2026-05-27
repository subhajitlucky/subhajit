import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: SectionProps) {
  return (
    <section className={`section ${className ?? ''}`} id={id} aria-labelledby={`${id}-heading`}>
      <div className="section__intro">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-heading`}>{title}</h2>
      </div>
      <div className="section__body">{children}</div>
    </section>
  );
}
