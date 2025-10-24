import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();
  const [isSpaceTheme, setIsSpaceTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolioTheme');
    return savedTheme ? savedTheme === 'space' : false;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navMenuId = 'primary-navigation';

  // Update page title based on route
  useEffect(() => {
    const titles = {
      '/': 'Subhajit Pradhan - Software Engineer | Full Stack Developer',
      '/projects': 'Projects - Subhajit Pradhan | Portfolio',
      '/blog': 'Blog - Subhajit Pradhan | Thoughts & Insights'
    };
    document.title = titles[location.pathname] || 'Subhajit Pradhan - Software Engineer';
  }, [location]);

  useEffect(() => {
    document.body.setAttribute('data-theme', isSpaceTheme ? 'space' : 'day');
    localStorage.setItem('portfolioTheme', isSpaceTheme ? 'space' : 'day');
  }, [isSpaceTheme]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <nav className="navbar" aria-label="Primary">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          Subhajit
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          type="button"
          aria-label="Toggle mobile menu"
          aria-controls={navMenuId}
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          id={navMenuId}
          className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}
        >
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
            type="button"
            aria-label={`Switch to ${isSpaceTheme ? 'day' : 'space'} theme`}
            aria-pressed={isSpaceTheme}
          >
            {isSpaceTheme ? '☀️' : '🌌'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 