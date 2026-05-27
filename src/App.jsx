import { Link, Route, Routes } from 'react-router-dom';
import Section from './components/Section';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import Home from './pages/Home';
import ProjectCaseStudy from './pages/ProjectCaseStudy';

function NotFound() {
  return (
    <Section eyebrow="404" headingLevel={1} title="Page not found">
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
