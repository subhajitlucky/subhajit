import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Subhajit
        </Link>
        <div className="nav-links">
          <Link to="/projects" className="nav-link">Projects</Link>
          <a 
            href="./assets/Subhajit_Resume.pdf"
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 