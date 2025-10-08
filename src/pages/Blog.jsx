import { useState, useEffect } from 'react';
import '../styles/Blog.css';

function Blog() {
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

  const upcomingTopics = [
    "🚀 Space Exploration",
    "⚛️ Quantum Physics", 
    "🏛️ Ancient History",
    "💻 Programming Tips",
    "🌌 Cosmic Mysteries",
    "🔬 Science Breakthroughs"
  ];

  return (
    <div className="blog-page">
      {/* Complete Cosmic Elements - Only show in space theme */}
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

      <div className="container">
        <div className="blog-header">
          <h1>Blog</h1>
          <p className="blog-intro">
            Welcome to my blog! Here I share my thoughts and insights on space, physics, history, 
            programming, and everything that fascinates me about our universe and technology.
          </p>
        </div>

        <div className="blog-coming-soon">
          <div className="coming-soon-card">
            <h3>🚀 Coming Soon!</h3>
            <p>
              I&apos;m currently working on creating engaging content. Stay tuned for fascinating topics 
              about space, technology, and everything in between!
            </p>
          </div>
        </div>

        <div className="blog-topics-preview">
          <h4>What to Expect</h4>
          <div className="topic-tags">
            {upcomingTopics.map((topic, index) => (
              <span key={index} className="topic-tag">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog; 