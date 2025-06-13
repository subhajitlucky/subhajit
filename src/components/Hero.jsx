import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-name">Subhajit Pradhan</h1>
        
        <p className="hero-intro">
          I love computers and love to build fun things
        </p>
        
        <p className="hero-location">
          📍 Odisha, India
        </p>

        <div className="hero-contact">
          <p className="contact-title">Reach me:</p>
          
          <div className="contact-links">
            <a 
              href="mailto:subhajitpradhan310@gmail.com" 
              className="contact-link"
            >
              📧 Gmail
            </a>

            <a 
              href="https://github.com/subhajitlucky" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              🔗 GitHub
            </a>

            <a 
              href="https://linkedin.com/in/subhajitlucky" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              💼 LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero; 