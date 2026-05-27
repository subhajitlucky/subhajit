import { Link } from 'react-router-dom';
import { profile } from '../data/profile';

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        <Link className="site-nav__home" to="/">
          {profile.name}
        </Link>

        <div className="site-nav__links">
          <a href={profile.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </nav>
    </header>
  );
}

export default SiteHeader;
