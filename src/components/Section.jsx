/* eslint-disable react/prop-types */

function Section({ children, className = '', eyebrow, headingLevel = 2, id, title }) {
  const headingId = id ? `${id}-heading` : undefined;
  const HeadingTag = `h${headingLevel}`;
  const classes = ['section', className].filter(Boolean).join(' ');

  return (
    <section className={classes} id={id} aria-labelledby={headingId}>
      <div className="section__header">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <HeadingTag id={headingId}>{title}</HeadingTag>
      </div>
      <div className="section__body">{children}</div>
    </section>
  );
}

export default Section;
