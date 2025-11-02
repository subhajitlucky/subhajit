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
          <h1>Writing</h1>
        </div>

        <div className="blog-content">
          <article className="blog-post-preview">
            <p className="blog-status">Currently writing</p>
            <p className="blog-description">
              I share technical insights, lessons learned from building projects,
              and thoughts on software development. Currently working on several posts
              covering blockchain development, full-stack architecture, and debugging techniques.
            </p>
          </article>

          <div className="blog-topics">
            <h2>Topics</h2>
            <ul className="topic-list">
              {blogTopics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}

export default Blog; 