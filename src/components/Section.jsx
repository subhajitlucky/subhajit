/* eslint-disable react/prop-types */

function Section({ children, className = '', eyebrow, id, title }) {
  const headingId = id ? `${id}-heading` : undefined;
  const classes = ['section', className].filter(Boolean).join(' ');

  return (
    <section className={classes} id={id} aria-labelledby={headingId}>
      <div className="section__header">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 id={headingId}>{title}</h2>
      </div>
      <div className="section__body">{children}</div>
    </section>
  );
}

export default Section;
