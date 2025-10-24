import '../styles/Blog.css';
import SpaceBackground from '../components/SpaceBackground';
import ScrollToTop from '../components/ScrollToTop';
import useSpaceTheme from '../hooks/useSpaceTheme';
import blogTopics from '../data/blogTopics';

function Blog() {
  const isSpaceTheme = useSpaceTheme();

  return (
    <div className="blog-page">
      {/* Complete Cosmic Elements - Only show in space theme */}
      {isSpaceTheme && <SpaceBackground />}

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
            <h2>🚀 Coming Soon!</h2>
            <p>
              I&apos;m currently working on creating engaging content. Stay tuned for fascinating topics 
              about space, technology, and everything in between!
            </p>
          </div>
        </div>

        <div className="blog-topics-preview">
          <h2>What to Expect</h2>
          <ul className="topic-tags" aria-label="Upcoming blog topics">
            {blogTopics.map((topic, index) => (
              <li key={index} className="topic-tag">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}

export default Blog; 