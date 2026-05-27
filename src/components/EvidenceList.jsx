/* eslint-disable react/prop-types */

function EvidenceList({ items }) {
  return (
    <ul className="evidence-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default EvidenceList;
