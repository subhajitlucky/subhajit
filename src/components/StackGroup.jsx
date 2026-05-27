/* eslint-disable react/prop-types */

function StackGroup({ stack }) {
  return (
    <dl className="stack-groups">
      {Object.entries(stack).map(([group, items]) => (
        <div className="stack-group" key={group}>
          <dt>{group}</dt>
          <dd>{items.join(' · ')}</dd>
        </div>
      ))}
    </dl>
  );
}

export default StackGroup;
