import '../styles/Hero.css';
import SpaceBackground from './SpaceBackground';
import useSpaceTheme from '../hooks/useSpaceTheme';

function Hero() {
  const isSpaceTheme = useSpaceTheme();

  return (
    <section className="hero">
      {/* Conditional Space Elements - Only show in space theme */}
      {isSpaceTheme && <SpaceBackground />}

      <div className="hero-container">
        
        
        <h1 className={`hero-name ${isSpaceTheme ? 'cosmic-glow' : ''}`}>
          Subhajit Pradhan
        </h1>

        {/* <p className={`hero-title ${isSpaceTheme ? 'cosmic-title' : ''}`}>
          Software Engineer
        </p> */}
        
        <p className={`hero-intro ${isSpaceTheme ? 'stellar-text' : ''}`}>
          I love computers and love to build fun things
        </p>
        
        {/* Constellation - Only show in space theme */}
        {isSpaceTheme && (
          <div className="constellation-dots" aria-hidden="true" role="presentation">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
            <div className="dot dot-4"></div>
            <div className="dot dot-5"></div>
            <svg className="constellation-lines">
              <line x1="30%" y1="20%" x2="50%" y2="40%" />
              <line x1="50%" y1="40%" x2="70%" y2="25%" />
              <line x1="70%" y1="25%" x2="60%" y2="60%" />
              <line x1="60%" y1="60%" x2="40%" y2="70%" />
            </svg>
          </div>
        )}
        
        <p className={`hero-location ${isSpaceTheme ? 'cosmic-location' : ''}`}>
          {isSpaceTheme ? '🌍' : '📍'} Odisha, India
        </p>

        <div className={`hero-cta ${isSpaceTheme ? 'cosmic-quote' : ''}`}>
          <p className="hero-tagline">
            &quot;The only way to do great work is to love what you do&quot; - Steve Jobs
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero; 