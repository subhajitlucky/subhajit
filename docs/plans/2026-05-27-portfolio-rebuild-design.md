# Portfolio Rebuild Design

Date: 2026-05-27

## Goal

Rebuild the portfolio as an AI full-stack engineering site that demonstrates product thinking, engineering judgment, and maintainable execution without relying on generic portfolio aesthetics or visual gimmicks.

## Positioning

Primary positioning: AI Full-Stack Engineer.

The site should communicate that Subhajit builds AI-powered web applications end to end, from user workflow and frontend implementation through backend orchestration, data modeling, APIs, and deployment. Web3 remains a useful secondary signal where relevant, but it should not dominate the portfolio.

## Selected Direction

Use a technical case-study-first portfolio with recruiter-first scanning discipline.

The homepage should be easy to scan quickly, but the strongest signal should come from real project thinking. The site should avoid shallow visual flash and instead show problem framing, architecture, engineering decisions, tradeoffs, and next improvements.

## Information Architecture

The portfolio becomes a small intentional site:

- `/`: homepage engineering dossier
- `/projects/tarka-sabha`: AI orchestration case study
- `/projects/intentpay`: AI intent and transaction abstraction case study
- `/projects/campushelper`: practical full-stack product case study
- Resume remains a direct PDF link
- Contact remains simple: email, GitHub, LinkedIn

Homepage order:

1. Hero: "AI Full-Stack Engineer" with a concise paragraph about building AI-powered web systems end to end.
2. Proof snapshot: three evidence points covering AI orchestration, full-stack product workflows, and backend/data/auth foundations.
3. Selected work: Tarka Sabha, IntentPay, and CampusHelper as serious project briefs.
4. Engineering range: stack grouped by purpose.
5. Experience and education: compact and factual.
6. Contact footer: direct links.

Case-study page order:

1. Problem
2. Product workflow
3. Architecture
4. Key engineering decisions
5. Tradeoffs and limitations
6. Next improvements
7. GitHub and demo links

## Visual Direction

Use a restrained engineering dossier style.

Guidelines:

- Neutral-first design with strong readability.
- Keep dark mode only if it is implemented with equal care.
- Use structured sections, tables, timelines, and evidence blocks.
- Treat project entries as technical briefs, not decorative cards.
- Use one restrained accent color for focus states and section markers.
- Avoid cursor followers, mascot animations, random creatures, decorative gradient blobs, fake terminal theatrics, glassmorphism, and excessive motion.
- Use minimal motion: hover and focus transitions only.
- Use cards only for repeated project or case-study blocks.
- Prioritize mobile reading order, tap targets, and text clarity.

The memorable quality should be: this person explains engineering decisions clearly.

## Content Model

Move from plain project descriptions to structured project data.

Each featured project should support:

- `title`
- `slug`
- `role`
- `oneLine`
- `problem`
- `usersOrContext`
- `workflow`
- `architecture`
- `decisions`
- `tradeoffs`
- `nextImprovements`
- `stack`
- `github`
- `demo`
- optional `screenshots`

Homepage project briefs should show:

- one-line summary
- problem
- two or three engineering decisions
- compact stack
- links to case study, GitHub, and demo

Case-study pages should show the full structure.

Skills should be grouped by purpose:

- Frontend
- Backend
- Data
- AI
- Infrastructure
- Web3

## Code Architecture

Proposed structure:

```text
src/
  App.jsx
  main.jsx
  data/
    profile.js
    projects.js
  pages/
    Home.jsx
    ProjectCaseStudy.jsx
  components/
    SiteHeader.jsx
    SiteFooter.jsx
    Section.jsx
    ProjectBrief.jsx
    EvidenceList.jsx
    StackGroup.jsx
  styles/
    base.css
    theme.css
    layout.css
```

Routing:

- Use `react-router-dom`, already installed.
- `/` renders `Home`.
- `/projects/:slug` renders `ProjectCaseStudy`.
- Unknown slugs show a simple not-found state with a link home.

## Accessibility And UX Requirements

- Semantic headings.
- Skip link.
- Visible keyboard focus.
- Good contrast in both themes if dark mode remains.
- Tap targets around 44px where practical.
- No body scroll lock.
- Reduced-motion support.
- External links clearly labeled for screen readers.
- Case-study pages readable without JavaScript tricks.

## Verification

Required checks:

- `npm run lint`
- `npm run build`
- Manual browser check for `/`
- Manual browser check for all three case-study routes
- Mobile-width check
- Keyboard tab-order check
- Resume, email, GitHub, LinkedIn, GitHub project, and demo link checks

## Non-Goals

- No fake metrics.
- No unrelated blog system.
- No generic dashboard skin.
- No new UI library unless the implementation shows a clear need.
- No decorative animation system.
- No overbroad rewrite outside the portfolio surface.
