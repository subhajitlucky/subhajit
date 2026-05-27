import { profile } from '../data/profile';

function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} {profile.name}</p>

      <nav className="site-footer__links" aria-label="Contact links">
        <a href={`mailto:${profile.email}`}>Email</a>
        <a href={profile.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </nav>
    </footer>
  );
}

export default SiteFooter;
