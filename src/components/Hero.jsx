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

        <div className="hero-cta">
          <p className="hero-tagline">
            "The only way to do great work is to love what you do" - Steve Jobs
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero; 