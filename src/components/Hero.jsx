import { useState, useEffect } from 'react';
import '../styles/Hero.css';

function Hero() {
  const [isSpaceTheme, setIsSpaceTheme] = useState(false);

  useEffect(() => {
    // Check initial theme from body attribute
    const checkTheme = () => {
      const theme = document.body.getAttribute('data-theme');
      setIsSpaceTheme(theme === 'space');
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          checkTheme();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero">
      {/* Conditional Space Elements - Only show in space theme */}
      {isSpaceTheme && (
        <>
          {/* Animated Starfield Background */}
          <div className="starfield">
            <div className="stars stars-small"></div>
            <div className="stars stars-medium"></div>
            <div className="stars stars-large"></div>
          </div>
          
          {/* Floating Particles */}
          <div className="particles">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className={`particle particle-${i + 1}`}></div>
            ))}
          </div>
          
          {/* Shooting Stars */}
          <div className="shooting-stars">
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
          </div>
        </>
      )}

      <div className="hero-container">
        <h1 className={`hero-name ${isSpaceTheme ? 'cosmic-glow' : ''}`}>
          Subhajit Pradhan
        </h1>
        
        <p className={`hero-intro ${isSpaceTheme ? 'stellar-text' : ''}`}>
          I love computers and love to build fun things
        </p>
        
        {/* Constellation - Only show in space theme */}
        {isSpaceTheme && (
          <div className="constellation-dots">
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