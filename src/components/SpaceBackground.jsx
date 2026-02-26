import { memo } from 'react';

const PARTICLE_COUNT = 20;
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, index) => index + 1);
const SHOOTING_STARS = [0, 1, 2];

function SpaceBackground() {
  return (
    <>
      <div className="starfield" aria-hidden="true" role="presentation">
        <div className="stars stars-small"></div>
        <div className="stars stars-medium"></div>
        <div className="stars stars-large"></div>
      </div>

      <div className="particles" aria-hidden="true" role="presentation">
        {PARTICLES.map((particleIndex) => (
          <div key={particleIndex} className={`particle particle-${particleIndex}`}></div>
        ))}
      </div>

      <div className="shooting-stars" aria-hidden="true" role="presentation">
        {SHOOTING_STARS.map((item) => (
          <div key={item} className="shooting-star"></div>
        ))}
      </div>
    </>
  );
}

export default memo(SpaceBackground);
