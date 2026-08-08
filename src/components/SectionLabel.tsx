type SectionLabelProps = {
  index: string;
  children: string;
};

export function SectionLabel({ index, children }: SectionLabelProps) {
  return (
    <p className="section-label">
      <span>{index}</span>
      <span>{children}</span>
    </p>
  );
}
