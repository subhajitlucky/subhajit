import './Blog.css';

function Blog() {
  return (
    <div className="blog-page">
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
              I'm currently working on creating engaging content. Stay tuned for fascinating topics 
              about space, technology, and everything in between!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog; 