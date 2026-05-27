# Subhajit Pradhan - AI Full-Stack Portfolio

Personal portfolio for Subhajit Pradhan, positioned as an AI full-stack engineer building web applications across product UX, backend orchestration, data, APIs, and deployment.

Live site: [subhajitxyz.vercel.app](https://subhajitxyz.vercel.app)

## Site Structure

- Homepage dossier at `/` with positioning, proof snapshot, selected work, engineering range, and experience.
- Project case-study routes at `/projects/:slug`.
- Shared profile and project content in `src/data/profile.js` and `src/data/projects.js`.
- Vite public assets in `public/`, including favicon, manifest, resume, sitemap, and social image files.

## Current Selected Projects

- **Tarka Sabha**: Multi-agent AI debate platform with provider orchestration and secure credential management.
- **IntentPay**: AI-driven intent layer that translates natural language into on-chain DeFi transactions.
- **CampusHelper**: Full-stack lost-and-found system with authentication, file uploads, and full-text search.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run test -- --run
npm run build
```

Additional deployment builds:

```bash
npm run build:vercel
npm run build:github
```

## Tech Stack

- React 18 with React Router
- Vite
- Feature-scoped CSS files
- Vitest and Testing Library
- ESLint

## Project Layout

```text
src/
├── components/             # Reusable layout, evidence, project, and stack components
├── data/
│   ├── profile.js          # Profile, links, proof, stack, and experience content
│   └── projects.js         # Selected project case-study content
├── pages/
│   ├── Home.jsx            # Homepage dossier
│   └── ProjectCaseStudy.jsx
├── App.jsx                 # Routes and app shell
├── App.css                 # App-level layout styles
└── main.jsx                # React entry point
```

## Deployment

Vercel should use `npm run build:vercel`, which builds with the root base path for [subhajitxyz.vercel.app](https://subhajitxyz.vercel.app).

GitHub Pages should use `npm run build:github`, which builds with `/subhajit/` as the base path. Publish the generated `dist/` directory through GitHub Pages or the `gh-pages` package.

The app includes the SPA redirect restore script in `index.html` so direct route visits can work when paired with the GitHub Pages redirect file.

## Contact

- Email: [subhajitpradhan310@gmail.com](mailto:subhajitpradhan310@gmail.com)
- GitHub: [subhajitlucky](https://github.com/subhajitlucky)
- LinkedIn: [subhajit-pradhan-profile](https://www.linkedin.com/in/subhajit-pradhan-profile)
- Location: Odisha, India
