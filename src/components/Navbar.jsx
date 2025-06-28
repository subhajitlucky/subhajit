import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [isSpaceTheme, setIsSpaceTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolioTheme');
    return savedTheme ? savedTheme === 'space' : false;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', isSpaceTheme ? 'space' : 'day');
    localStorage.setItem('portfolioTheme', isSpaceTheme ? 'space' : 'day');
  }, [isSpaceTheme]);

  const toggleTheme = () => {
    setIsSpaceTheme(!isSpaceTheme);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          Subhajit
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/projects" className="nav-link" onClick={closeMobileMenu}>
            Projects
          </Link>
          <Link to="/blog" className="nav-link" onClick={closeMobileMenu}>
            Blog
          </Link>
          <a 
            href="./assets/Subhajit_Resume.pdf"
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Resume
          </a>
          
          {/* Theme Toggle */}
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${isSpaceTheme ? 'day' : 'space'} theme`}
          >
            {isSpaceTheme ? '☀️' : '🌌'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 