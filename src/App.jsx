import { Link, Route, Routes, useParams } from 'react-router-dom';
import Section from './components/Section';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import { profile } from './data/profile';
import projects from './data/projects';

function Home() {
  return (
    <>
      <section className="hero-section" aria-labelledby="home-heading">
        <div className="hero-copy">
          <p className="eyebrow">{profile.name}</p>
          <h1 id="home-heading">AI Full-Stack Engineer</h1>
          <p className="lede">{profile.summary}</p>
        </div>
      </section>

      <Section eyebrow="Selected work" title="Project case studies">
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.slug}>
              <div>
                <h3>{project.title}</h3>
                <p>{project.oneLine}</p>
              </div>
              <Link
                aria-label={`Read ${project.title} case study`}
                to={`/projects/${project.slug}`}
              >
                Read case study
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

function ProjectCaseStudy() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <NotFound />;
  }

  return (
    <article className="case-study">
      <Section eyebrow={project.role} title={project.title}>
        <p className="lede">{project.description}</p>
        <dl className="case-study__facts">
          <div>
            <dt>Problem</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>Workflow</dt>
            <dd>{project.workflow}</dd>
          </div>
        </dl>
      </Section>
    </article>
  );
}

function NotFound() {
  return (
    <Section eyebrow="404" title="Page not found">
      <p>The page you are looking for is not part of this portfolio yet.</p>
      <Link to="/">Return home</Link>
    </Section>
  );
}

function App() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page-shell" id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
