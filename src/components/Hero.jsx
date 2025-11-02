import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';
import SpaceBackground from './SpaceBackground';
import useSpaceTheme from '../hooks/useSpaceTheme';

function Hero() {
  const isSpaceTheme = useSpaceTheme();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const titles = [
    'Full Stack Developer',
    'Software Engineer',
    'Blockchain Developer',
    'Backend Developer'
  ];

  useEffect(() => {
    const currentTitle = titles[currentIndex];
    let charIndex = 0;
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < currentTitle.length) {
        setDisplayText(currentTitle.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        setTimeout(() => {
          const deletingInterval = setInterval(() => {
            if (charIndex > 0) {
              charIndex--;
              setDisplayText(currentTitle.slice(0, charIndex));
            } else {
              clearInterval(deletingInterval);
              setCurrentIndex((prev) => (prev + 1) % titles.length);
            }
          }, 50);
        }, 1500);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  return (
    <section className="hero">
      {isSpaceTheme && <SpaceBackground />}

      <div className="hero-container">
        <h1 className={`hero-name ${isSpaceTheme ? 'cosmic-glow' : ''}`}>
          Subhajit Pradhan
        </h1>

        <div className={`hero-title-wrapper ${isSpaceTheme ? 'cosmic-title' : ''}`}>
          <span className="typed-text">{displayText}</span>
          {isTyping && <span className="cursor">|</span>}
        </div>

        <p className={`hero-quote ${isSpaceTheme ? 'cosmic-quote' : ''}`}>
          "The only way to do great work is to love what you do"
        </p>

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

        <div className="hero-cta">
          <Link to="/projects" className="hero-projects-btn">
            View my work →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero; 