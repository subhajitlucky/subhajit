# AI Full-Stack Portfolio Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the portfolio into a restrained AI full-stack engineering dossier with homepage proof sections and three project case-study routes.

**Architecture:** Keep the app as a Vite + React single-page site, but split the current single component into data, pages, and reusable presentational components. Use `react-router-dom` for `/` and `/projects/:slug`, with structured project data powering both homepage briefs and case-study pages.

**Tech Stack:** React 18, Vite, React Router DOM, plain CSS, Vitest, Testing Library, Vercel Analytics.

---

### Task 1: Stabilize Tests And Structured Data

**Files:**
- Create: `src/__tests__/setupTests.js`
- Create: `src/data/profile.js`
- Modify: `src/data/projects.js`
- Create: `src/data/projects.test.js`

**Step 1: Create the missing Vitest setup file**

```js
import '@testing-library/jest-dom/vitest';
```

**Step 2: Create `src/data/profile.js`**

```js
export const profile = {
  name: 'Subhajit Pradhan',
  role: 'AI Full-Stack Engineer',
  location: 'Odisha, India',
  email: 'subhajitpradhan310@gmail.com',
  resume: '/assets/Subhajit_ResumeV8.pdf',
  links: {
    github: 'https://github.com/subhajitlucky',
    linkedin: 'https://www.linkedin.com/in/subhajit-pradhan-profile',
  },
  summary:
    'I build AI-powered web applications end to end, from product workflow and frontend UX to backend orchestration, data, APIs, and deployment.',
  proof: [
    'AI orchestration across providers, credentials, and product workflows.',
    'Full-stack systems with authentication, search, uploads, APIs, and database-backed flows.',
    'Engineering decisions documented through architecture, tradeoffs, and next improvements.',
  ],
  stack: {
    Frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS'],
    Backend: ['Node.js', 'Express', 'NestJS', 'Go', 'Python'],
    Data: ['PostgreSQL', 'MongoDB', 'Redis'],
    AI: ['LLM provider orchestration', 'Prompt workflows', 'Agentic systems'],
    Infrastructure: ['Docker', 'Linux', 'Git', 'AWS', 'Vercel'],
    Web3: ['Solidity', 'Ethers.js', 'Hardhat'],
  },
  experience: [
    {
      organization: 'uElement',
      title: 'Software Engineer Intern',
      period: '2026',
    },
    {
      organization: 'QuadB Technologies',
      title: 'Software Engineer Trainee',
      period: '2025',
    },
    {
      organization: 'Centurion University',
      title: 'BCA · 8.9 CGPA',
      period: '2022-2025',
    },
  ],
};
```

**Step 3: Replace `src/data/projects.js` with structured case-study data**

Keep only the three approved featured projects:

- `tarka-sabha`
- `intentpay`
- `campushelper`

Each project object must include: `title`, `slug`, `role`, `oneLine`, `problem`, `usersOrContext`, `workflow`, `architecture`, `decisions`, `tradeoffs`, `nextImprovements`, `stack`, `github`, and `demo`.

Use factual language only. Do not add unverifiable metrics.

**Step 4: Write the failing data-shape test**

```js
import { describe, expect, it } from 'vitest';
import projects from './projects';

const requiredFields = [
  'title',
  'slug',
  'role',
  'oneLine',
  'problem',
  'usersOrContext',
  'workflow',
  'architecture',
  'decisions',
  'tradeoffs',
  'nextImprovements',
  'stack',
  'github',
  'demo',
];

describe('projects data', () => {
  it('contains the approved featured project slugs', () => {
    expect(projects.map((project) => project.slug)).toEqual([
      'tarka-sabha',
      'intentpay',
      'campushelper',
    ]);
  });

  it('has the required case-study fields for every project', () => {
    for (const project of projects) {
      for (const field of requiredFields) {
        expect(project[field], `${project.slug}.${field}`).toBeTruthy();
      }
      expect(project.decisions.length).toBeGreaterThanOrEqual(2);
      expect(project.tradeoffs.length).toBeGreaterThanOrEqual(1);
      expect(project.nextImprovements.length).toBeGreaterThanOrEqual(1);
      expect(project.stack.length).toBeGreaterThanOrEqual(3);
    }
  });
});
```

**Step 5: Run the data test**

Run: `npm run test -- src/data/projects.test.js --run`

Expected: PASS after the structured data exists.

**Step 6: Commit**

```bash
git add src/__tests__/setupTests.js src/data/profile.js src/data/projects.js src/data/projects.test.js
git commit -m "test: add structured portfolio data"
```

### Task 2: Add Routing Shell And Site Chrome

**Files:**
- Modify: `src/App.jsx`
- Create: `src/components/SiteHeader.jsx`
- Create: `src/components/SiteFooter.jsx`
- Create: `src/components/Section.jsx`
- Create: `src/styles/base.css`
- Create: `src/styles/theme.css`
- Create: `src/styles/layout.css`
- Modify: `src/main.jsx`
- Create: `src/App.test.jsx`

**Step 1: Write the failing routing smoke test**

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App routing', () => {
  it('renders the homepage route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /AI Full-Stack Engineer/i })).toBeInTheDocument();
  });

  it('renders a project route', () => {
    render(
      <MemoryRouter initialEntries={['/projects/tarka-sabha']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /Tarka Sabha/i })).toBeInTheDocument();
  });
});
```

**Step 2: Run the test to verify it fails**

Run: `npm run test -- src/App.test.jsx --run`

Expected: FAIL because `Home` and `ProjectCaseStudy` do not exist yet.

**Step 3: Update `main.jsx` to own `BrowserRouter`**

Wrap `<App />` with `<BrowserRouter>` and keep `<Analytics />`.

**Step 4: Update `App.jsx`**

Implement routes for:

- `/`
- `/projects/:slug`
- `*`

Do not import `ResumePortfolio` or `ModernTheme.css`.

**Step 5: Add site chrome components**

`SiteHeader` must include:

- skip link
- name/home link
- resume link
- email link
- GitHub link
- LinkedIn link

`SiteFooter` must include:

- concise copyright
- same direct contact links

`Section` must standardize section headings and optional eyebrow text.

**Step 6: Add base styles**

`base.css`, `theme.css`, and `layout.css` must include:

- CSS reset
- semantic typography scale
- neutral-first theme tokens
- visible focus styles
- reduced-motion handling
- responsive page shell
- accessible link and button states

**Step 7: Run the routing test**

Run: `npm run test -- src/App.test.jsx --run`

Expected: PASS once placeholder `Home` and `ProjectCaseStudy` pages exist.

**Step 8: Commit**

```bash
git add src/App.jsx src/main.jsx src/components/SiteHeader.jsx src/components/SiteFooter.jsx src/components/Section.jsx src/styles/base.css src/styles/theme.css src/styles/layout.css src/App.test.jsx
git commit -m "feat: add portfolio routing shell"
```

### Task 3: Build The Homepage Dossier

**Files:**
- Create: `src/pages/Home.jsx`
- Create: `src/components/ProjectBrief.jsx`
- Create: `src/components/EvidenceList.jsx`
- Create: `src/components/StackGroup.jsx`
- Create: `src/pages/Home.test.jsx`
- Modify: `src/styles/layout.css`

**Step 1: Write the failing homepage test**

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from './Home';

describe('Home', () => {
  it('shows positioning, proof, selected work, stack, and experience', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /AI Full-Stack Engineer/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Selected Work/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Read Tarka Sabha case study/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Engineering Range/i })).toBeInTheDocument();
    expect(screen.getByText(/uElement/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run the test to verify it fails**

Run: `npm run test -- src/pages/Home.test.jsx --run`

Expected: FAIL because the homepage content is not implemented.

**Step 3: Implement `EvidenceList`**

Render the three proof statements from `profile.proof` as a semantic list.

**Step 4: Implement `StackGroup`**

Render grouped stack data from `profile.stack`; avoid badge clutter by using compact rows.

**Step 5: Implement `ProjectBrief`**

Each brief must include:

- project title
- role
- one-line summary
- problem
- two or three engineering decisions
- stack
- case-study link
- GitHub link
- demo link when different from GitHub

**Step 6: Implement `Home`**

Render sections in this order:

1. Hero
2. Proof snapshot
3. Selected work
4. Engineering range
5. Experience and education
6. Contact prompt in footer only

**Step 7: Style the homepage**

Use a restrained dossier layout:

- no gradient blobs
- no cursor effects
- no fake terminals
- no decorative glass panels
- consistent spacing
- readable line lengths
- mobile-first stacked layout

**Step 8: Run the homepage test**

Run: `npm run test -- src/pages/Home.test.jsx --run`

Expected: PASS.

**Step 9: Commit**

```bash
git add src/pages/Home.jsx src/components/ProjectBrief.jsx src/components/EvidenceList.jsx src/components/StackGroup.jsx src/pages/Home.test.jsx src/styles/layout.css
git commit -m "feat: build homepage engineering dossier"
```

### Task 4: Build Project Case-Study Pages

**Files:**
- Create: `src/pages/ProjectCaseStudy.jsx`
- Create: `src/pages/ProjectCaseStudy.test.jsx`
- Modify: `src/styles/layout.css`

**Step 1: Write the failing project page tests**

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProjectCaseStudy from './ProjectCaseStudy';

function renderRoute(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProjectCaseStudy', () => {
  it('renders a known project case study', () => {
    renderRoute('/projects/tarka-sabha');

    expect(screen.getByRole('heading', { name: /Tarka Sabha/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Problem/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Architecture/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Tradeoffs/i })).toBeInTheDocument();
  });

  it('renders a useful not-found state for an unknown slug', () => {
    renderRoute('/projects/not-real');

    expect(screen.getByRole('heading', { name: /Project not found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to home/i })).toBeInTheDocument();
  });
});
```

**Step 2: Run the test to verify it fails**

Run: `npm run test -- src/pages/ProjectCaseStudy.test.jsx --run`

Expected: FAIL until the page exists.

**Step 3: Implement `ProjectCaseStudy`**

Use `useParams()` to find the matching project by slug.

Render:

- title and role
- one-line summary
- Problem
- Product workflow
- Architecture
- Key engineering decisions
- Tradeoffs and limitations
- Next improvements
- GitHub and demo links

Unknown slugs render a not-found section with a home link.

**Step 4: Style case-study pages**

Prioritize reading:

- max-width content column
- section dividers
- lists for decisions, tradeoffs, and next improvements
- compact metadata row for stack and links

**Step 5: Run the project page test**

Run: `npm run test -- src/pages/ProjectCaseStudy.test.jsx --run`

Expected: PASS.

**Step 6: Commit**

```bash
git add src/pages/ProjectCaseStudy.jsx src/pages/ProjectCaseStudy.test.jsx src/styles/layout.css
git commit -m "feat: add project case study pages"
```

### Task 5: Remove Old Portfolio Surface And Update Metadata

**Files:**
- Delete: `src/components/ResumePortfolio.jsx`
- Delete: `src/styles/ModernTheme.css`
- Modify: `README.md`
- Modify: `index.html`

**Step 1: Confirm old files are unused**

Run: `rg "ResumePortfolio|ModernTheme" src index.html README.md`

Expected: no references after Tasks 2-4 are complete.

**Step 2: Delete old files**

Remove the old single-component portfolio and old acid-noir stylesheet.

**Step 3: Update `index.html` metadata**

Use:

- title: `Subhajit Pradhan - AI Full-Stack Engineer`
- description: `AI full-stack engineer building web applications across product UX, backend orchestration, data, APIs, and deployment.`
- Open Graph and Twitter descriptions matching the new positioning
- schema jobTitle: `AI Full-Stack Engineer`

**Step 4: Update `README.md`**

Replace stale structure and project descriptions with the new site structure:

- homepage dossier
- project case-study routes
- test/build commands
- current selected projects

**Step 5: Commit**

```bash
git add README.md index.html
git rm src/components/ResumePortfolio.jsx src/styles/ModernTheme.css
git commit -m "chore: remove legacy portfolio surface"
```

### Task 6: Final Verification And Polish

**Files:**
- Modify as needed based on failures: `src/**/*.jsx`, `src/**/*.css`, `README.md`, `index.html`

**Step 1: Run all tests**

Run: `npm run test -- --run`

Expected: PASS.

**Step 2: Run lint**

Run: `npm run lint`

Expected: PASS.

**Step 3: Run production build**

Run: `npm run build`

Expected: PASS.

**Step 4: Start local server**

Run: `npm run dev -- --host 0.0.0.0`

Expected: Vite dev server prints a local URL, usually `http://localhost:5173/`.

**Step 5: Manual browser checks**

Check:

- `/`
- `/projects/tarka-sabha`
- `/projects/intentpay`
- `/projects/campushelper`
- unknown route behavior
- mobile viewport around 390px wide
- keyboard tab order from top to footer
- resume link
- email link
- GitHub and LinkedIn links
- project GitHub and demo links

**Step 6: Final commit**

```bash
git add .
git commit -m "polish: verify portfolio rebuild"
```

Only make this commit if the final verification required additional code changes. If no changes are needed after the prior commits, skip it.
