export type Project = {
  title: string;
  slug: string;
  role: string;
  year: string;
  status: string;
  oneLine: string;
  description: string;
  proof: string[];
  problem: string;
  usersOrContext: string;
  workflow: string;
  architecture: string;
  decisions: string[];
  tradeoffs: string[];
  nextImprovements: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  architectureDiagram: {
    label: string;
    detail: string;
  }[];
  stack: string[];
  tags: string[];
  github: string;
  demo?: string;
  visual: {
    title: string;
    caption: string;
    steps: string[];
  };
  inspectionLinks: {
    label: string;
    href: string;
  }[];
  seoKeywords: string[];
};

export const projects: Project[] = [
  {
    title: 'IntentPay',
    slug: 'intentpay',
    role: 'Full-stack and smart contract engineer',
    year: '2026',
    status: 'Currently building',
    oneLine:
      'AI-driven intent layer that translates natural language into on-chain DeFi transaction workflows.',
    description:
      'IntentPay connects natural-language transaction intent with blockchain execution flows, smart contracts, and wallet confirmation steps.',
    proof: [
      'Separates AI interpretation from irreversible contract execution.',
      'Keeps wallet review visible before transaction confirmation.',
    ],
    problem:
      'On-chain transaction flows can force users to understand protocol actions, contract interactions, wallet steps, and irreversible execution before they can complete a payment or DeFi operation.',
    usersOrContext:
      'Built for crypto users and product teams exploring natural-language transaction intent as a safer interface layer for Web3 workflows.',
    workflow:
      'A user enters a transaction intent, the application interprets the requested action, prepares the related on-chain interaction, and routes the user through review and wallet execution.',
    architecture:
      'A TypeScript product layer connects AI intent parsing with Solidity contracts, Ethers.js wallet interactions, and explicit transaction preview states.',
    decisions: [
      'Modeled the interface around user intent first, then mapped interpreted actions to explicit blockchain transaction steps.',
      'Kept wallet execution visible so users can inspect the operation before confirming an on-chain action.',
      'Separated AI interpretation from contract execution because natural language output should never directly trigger irreversible transactions.',
    ],
    tradeoffs: [
      'Natural-language input improves accessibility but requires stronger validation before transaction preparation.',
      'Blockchain transparency adds trust, but it also requires clear UX around gas, wallet state, and failure cases.',
    ],
    nextImprovements: [
      'Add stricter intent validation and safer transaction previews.',
      'Document the contract boundaries and supported transaction types.',
    ],
    metrics: [
      { label: 'Safety boundary', value: 'AI drafts, wallet executes' },
      { label: 'Core layers', value: 'Intent, preview, contract, wallet' },
      { label: 'Primary risk handled', value: 'Irreversible on-chain actions' },
      { label: 'Review state', value: 'Before every wallet confirmation' },
    ],
    architectureDiagram: [
      {
        label: 'User intent',
        detail: 'Natural-language transaction request starts the flow.',
      },
      {
        label: 'AI planner',
        detail: 'Interprets the request and prepares a structured action plan.',
      },
      {
        label: 'Transaction preview',
        detail: 'Shows the action, wallet impact, and confirmation context.',
      },
      {
        label: 'Wallet execution',
        detail: 'User approval remains the boundary before on-chain execution.',
      },
      {
        label: 'Smart contract',
        detail: 'Solidity logic receives the confirmed transaction only after review.',
      },
    ],
    stack: ['TypeScript', 'Solidity', 'Ethers.js', 'AI workflows'],
    tags: ['Blockchain', 'AI', 'Full Stack'],
    github: 'https://github.com/subhajitlucky/intentpay',
    demo: 'https://github.com/subhajitlucky/intentpay',
    visual: {
      title: 'Intent review boundary',
      caption: 'Natural language is converted into an inspectable transaction plan before any wallet action.',
      steps: ['Intent input', 'AI planning', 'Transaction preview', 'Wallet confirmation'],
    },
    inspectionLinks: [
      {
        label: 'AI planner',
        href: 'https://github.com/subhajitlucky/intentpay/blob/main/ai-agent.js',
      },
      {
        label: 'Wallet manager',
        href: 'https://github.com/subhajitlucky/intentpay/blob/main/wallet-manager.js',
      },
      {
        label: 'Frontend',
        href: 'https://github.com/subhajitlucky/intentpay/tree/main/frontend',
      },
    ],
    seoKeywords: [
      'Subhajit Pradhan blockchain developer',
      'intent driven blockchain interface',
      'Solidity full stack project',
    ],
  },
  {
    title: 'CSCosmos',
    slug: 'cscosmos',
    role: 'Product and frontend platform engineer',
    year: '2026',
    status: 'Live platform',
    oneLine:
      'Curated computer science learning hub organizing 172 visual microsite modules across eight engineering domains.',
    description:
      'CSCosmos is a React and TypeScript learning platform that maps 172 computer science topics, tracks 34 live microsites, and routes learners through domain pages, search, topic details, and live module launches.',
    proof: [
      'Models 172 topics across Full Stack, DSA, Web3, Security, AI, Core CS, DevOps, and Advanced Systems.',
      'Links 34 live microsites from a single searchable hub with active versus coming-soon states.',
      'Ships metadata, robots.txt, sitemap.xml, and llms.txt to make the platform easier to inspect.',
    ],
    problem:
      'Computer science visualizers are usually scattered across separate demos and articles, which makes it hard for learners to see relationships between fundamentals, system internals, Web3, AI, DevOps, and advanced engineering topics.',
    usersOrContext:
      'Built for self-directed developers who want a navigable map of computer science topics and direct links into focused visual learning modules.',
    workflow:
      'A learner searches or browses by domain, opens a topic detail page, checks whether the module is live, and launches the related microsite when available.',
    architecture:
      'A Vite React SPA uses React Router for domain and topic routes, TypeScript data modules for the topic catalog, Tailwind CSS for the UI, local storage for theme persistence, and Vercel rewrites for deep-link support.',
    decisions: [
      'Kept the topic catalog in TypeScript so counts, badges, routes, and launch links all derive from one source of truth.',
      'Separated domains from topics to support both high-level browsing and direct topic discovery.',
      'Used active and coming-soon states so the platform can honestly show live modules while preserving the broader roadmap.',
      'Added static discovery files around the SPA so reviewers and AI tools can understand the project even before client-side rendering.',
    ],
    tradeoffs: [
      'The Vite SPA keeps the hub fast to build and easy to deploy, but it does not produce rich per-route HTML before hydration.',
      'Separate microsite deployments isolate each topic, but they increase maintenance work across many small projects.',
      'A TypeScript data catalog is simple and reviewable now, but a larger platform may eventually need MDX, generated content, or a CMS.',
    ],
    nextImprovements: [
      'Migrate the hub to static or server-rendered routes so each domain and topic page ships crawlable HTML.',
      'Generate sitemap entries for every active topic and live microsite.',
      'Add screenshots, difficulty labels, prerequisites, and related-topic links for stronger learning paths.',
    ],
    metrics: [
      { label: 'Planned modules', value: '172' },
      { label: 'Live microsites', value: '34' },
      { label: 'Domains', value: '8' },
      { label: 'Core routes', value: 'Home, topics, about, domain, detail' },
    ],
    architectureDiagram: [
      {
        label: 'Topic catalog',
        detail: 'TypeScript data source for 172 modules, status, domains, slugs, and URLs.',
      },
      {
        label: 'Domain routes',
        detail: 'React Router groups modules into Full Stack, DSA, Web3, Security, AI, Core CS, DevOps, and Advanced Systems.',
      },
      {
        label: 'Search and filters',
        detail: 'Learners can find topics without knowing the domain hierarchy first.',
      },
      {
        label: 'Topic detail',
        detail: 'Each module exposes status, context, and a launch path when live.',
      },
      {
        label: 'Microsites',
        detail: 'Live modules run as focused deployments linked from the central hub.',
      },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router'],
    tags: ['Full Stack', 'React', 'Learning Platform'],
    github: 'https://github.com/subhajitlucky/cscosmos',
    demo: 'https://cscosmos.vercel.app',
    visual: {
      title: 'Learning platform map',
      caption:
        'The hub turns a large topic catalog into searchable domains, topic detail routes, status badges, and launch paths for live microsites.',
      steps: ['Browse domain', 'Search topic', 'Inspect status', 'Launch microsite'],
    },
    inspectionLinks: [
      {
        label: 'Topic catalog',
        href: 'https://github.com/subhajitlucky/cscosmos/blob/main/src/data/topics.ts',
      },
      {
        label: 'Route tree',
        href: 'https://github.com/subhajitlucky/cscosmos/blob/main/src/App.tsx',
      },
      {
        label: 'README proof',
        href: 'https://github.com/subhajitlucky/cscosmos/blob/main/README.md',
      },
    ],
    seoKeywords: [
      'Subhajit Pradhan React developer',
      'computer science learning platform',
      'React TypeScript Vite portfolio project',
      'CSCosmos visual learning hub',
    ],
  },
  {
    title: 'Tarka Sabha',
    slug: 'tarka-sabha',
    role: 'Full-stack engineer',
    year: '2026',
    status: 'Active project',
    oneLine:
      'Multi-agent AI debate platform with provider orchestration and secure credential management.',
    description:
      'Tarka Sabha is a multi-agent AI debate platform that coordinates prompts, provider access, generated arguments, and debate-state flows.',
    proof: [
      'Backend boundary keeps provider credentials out of the browser.',
      'Debate workflow state is separated from provider-specific logic.',
    ],
    problem:
      'AI debate workflows need a structured way to coordinate multiple model providers, user prompts, and credentials without mixing product logic with provider-specific details.',
    usersOrContext:
      'Built for users who want to run and compare AI-assisted debate flows through a web interface.',
    workflow:
      'A user defines the debate context, configures model access, starts the debate flow, and reviews generated arguments from participating AI agents.',
    architecture:
      'React powers the client experience, while a Node.js backend coordinates provider requests, credential handling, and debate workflow state.',
    decisions: [
      'Separated provider orchestration from the interface so model integrations can change without reshaping the user flow.',
      'Kept credential handling behind backend boundaries instead of exposing provider keys to the browser.',
      'Structured the project around the debate workflow rather than scattered prompt experiments.',
    ],
    tradeoffs: [
      'Supporting multiple providers increases orchestration complexity compared with a single-model implementation.',
    ],
    nextImprovements: [
      'Add richer debate history views.',
      'Improve response comparison and citation displays.',
    ],
    metrics: [
      { label: 'Model boundary', value: 'Provider calls stay server-side' },
      { label: 'Core workflow', value: 'Topic, roles, turns, output' },
      { label: 'Primary design goal', value: 'Inspectable multi-agent state' },
      { label: 'Data layer', value: 'Prisma-backed workflow records' },
    ],
    architectureDiagram: [
      {
        label: 'Debate setup',
        detail: 'User defines the topic, debate context, and agent roles.',
      },
      {
        label: 'Workflow state',
        detail: 'Application state tracks agent turns and generated arguments.',
      },
      {
        label: 'Backend boundary',
        detail: 'Provider keys and model calls stay outside the browser.',
      },
      {
        label: 'AI providers',
        detail: 'Model-specific responses are coordinated behind the same product flow.',
      },
      {
        label: 'Review UI',
        detail: 'The interface presents generated arguments for comparison and inspection.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    tags: ['AI', 'Next.js', 'TypeScript'],
    github: 'https://github.com/subhajitlucky/tarkaSabha',
    demo: 'https://tarkasabha.vercel.app',
    visual: {
      title: 'Debate workflow state',
      caption: 'The product separates debate setup, agent turns, provider calls, and generated output.',
      steps: ['Topic setup', 'Agent roles', 'Provider boundary', 'Debate output'],
    },
    inspectionLinks: [
      {
        label: 'App source',
        href: 'https://github.com/subhajitlucky/tarkaSabha/tree/main/src',
      },
      {
        label: 'Data model',
        href: 'https://github.com/subhajitlucky/tarkaSabha/tree/main/prisma',
      },
      {
        label: 'README',
        href: 'https://github.com/subhajitlucky/tarkaSabha/blob/main/README.md',
      },
    ],
    seoKeywords: [
      'Subhajit Pradhan developer',
      'multi agent AI debate platform',
      'React Node AI project',
    ],
  },
  {
    title: 'CampusHelper',
    slug: 'campushelper',
    role: 'Full-stack engineer',
    year: '2025',
    status: 'Live demo',
    oneLine:
      'Full-stack lost-and-found system with authentication, file uploads, and full-text search.',
    description:
      'CampusHelper is a practical campus lost-and-found system with authenticated reporting, image uploads, search, and a live deployment.',
    proof: [
      'Ships auth, image uploads, PostgreSQL-backed data, and search.',
      'Live deployment proves the flow runs beyond a local demo.',
    ],
    problem:
      'Campus lost-and-found posts need a searchable, authenticated flow where users can report items, add images, and find relevant matches.',
    usersOrContext:
      'Built for campus communities that need a practical web flow for reporting and searching lost or found items.',
    workflow:
      'Users sign in, create item reports with details and uploads, search existing posts, and review relevant lost-and-found entries.',
    architecture:
      'A React frontend connects to a Node.js backend with PostgreSQL-backed data flows for authentication, uploads, and search.',
    decisions: [
      'Used authenticated flows so item reports can be tied to accountable user actions.',
      'Included uploads and full-text search to make reports easier to identify and retrieve.',
      'Shipped a live deployment to prove the product can run beyond a local tutorial demo.',
    ],
    tradeoffs: [
      'Adding uploads and search increases backend surface area compared with a static listing board.',
    ],
    nextImprovements: [
      'Improve moderation and matching flows for duplicate or related item reports.',
    ],
    metrics: [
      { label: 'Core flows', value: 'Auth, report, upload, search' },
      { label: 'Data model', value: 'User-owned item reports' },
      { label: 'Storage surface', value: 'Images plus structured item fields' },
      { label: 'Primary UX goal', value: 'Find matching lost/found items faster' },
    ],
    architectureDiagram: [
      {
        label: 'Authenticated user',
        detail: 'Users sign in before creating or managing item reports.',
      },
      {
        label: 'Report form',
        detail: 'Item metadata and uploaded evidence are captured together.',
      },
      {
        label: 'Application API',
        detail: 'Backend routes validate requests and coordinate persistence.',
      },
      {
        label: 'Database',
        detail: 'Structured records support browsing, ownership, and search.',
      },
      {
        label: 'Search results',
        detail: 'Users review relevant lost-and-found entries from stored reports.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Supabase'],
    tags: ['Full Stack', 'Next.js', 'PostgreSQL'],
    github: 'https://github.com/subhajitlucky/campushelper',
    demo: 'https://campushelper.vercel.app',
    visual: {
      title: 'Lost-and-found product loop',
      caption: 'Reports move through authenticated creation, uploaded evidence, searchable records, and review.',
      steps: ['Sign in', 'Create report', 'Upload image', 'Search records'],
    },
    inspectionLinks: [
      {
        label: 'App source',
        href: 'https://github.com/subhajitlucky/campushelper/tree/main/src',
      },
      {
        label: 'Prisma schema',
        href: 'https://github.com/subhajitlucky/campushelper/tree/main/prisma',
      },
      {
        label: 'README',
        href: 'https://github.com/subhajitlucky/campushelper/blob/main/README.md',
      },
    ],
    seoKeywords: [
      'Subhajit Pradhan full stack developer',
      'React Node PostgreSQL project',
      'full stack lost and found app',
    ],
  },
  {
    title: 'QuantumTicket',
    slug: 'quantumticket',
    role: 'Blockchain developer',
    year: '2025',
    status: 'Live demo',
    oneLine:
      'On-chain NFT ticketing system for minting, transferring, and verifying event tickets.',
    description:
      'QuantumTicket explores a blockchain ticketing workflow where event tickets can be represented and verified through smart contracts.',
    proof: [
      'Models ticket ownership and transfer through NFT contract state.',
      'Treats verification as a first-class user flow, not an afterthought.',
    ],
    problem:
      'Event tickets need tamper-resistant ownership, transfer history, and a verification path that is harder to fake than static QR screenshots.',
    usersOrContext:
      'Built as a blockchain developer project for event organizers and attendees exploring NFT-based ticket ownership.',
    workflow:
      'An event ticket can be minted, transferred, and verified through a wallet-connected interface backed by smart contract state.',
    architecture:
      'Solidity contracts define ticket behavior, while a React interface and Ethers.js connect users to wallet-based contract interactions.',
    decisions: [
      'Used NFT ticket representation because it naturally models ownership and transferability.',
      'Kept verification as a first-class flow rather than treating minting as the only important action.',
    ],
    tradeoffs: [
      'Public blockchain verification increases transparency, but user experience depends on wallet readiness and network conditions.',
    ],
    nextImprovements: [
      'Add event admin tooling and clearer contract deployment documentation.',
    ],
    metrics: [
      { label: 'Core flows', value: 'Mint, transfer, verify' },
      { label: 'Ownership model', value: 'NFT-backed ticket state' },
      { label: 'Verification path', value: 'Wallet-connected contract reads' },
      { label: 'Primary risk handled', value: 'Fake static ticket screenshots' },
    ],
    architectureDiagram: [
      {
        label: 'Event setup',
        detail: 'Ticket configuration defines what can be minted and verified.',
      },
      {
        label: 'Smart contract',
        detail: 'Solidity contract owns ticket state and transfer behavior.',
      },
      {
        label: 'Wallet interface',
        detail: 'React and Ethers.js connect user actions to contract calls.',
      },
      {
        label: 'Ownership transfer',
        detail: 'Ticket movement is represented through NFT ownership state.',
      },
      {
        label: 'Entry verification',
        detail: 'Verification checks contract-backed ownership instead of static images.',
      },
    ],
    stack: ['Solidity', 'Ethers.js', 'React'],
    tags: ['Blockchain', 'Solidity', 'NFT'],
    github: 'https://github.com/subhajitlucky/quantumTicket',
    demo: 'https://quantumticket.vercel.app',
    visual: {
      title: 'NFT ticket lifecycle',
      caption: 'Tickets are created, transferred, and verified through wallet-connected contract state.',
      steps: ['Event setup', 'Mint ticket', 'Transfer owner', 'Verify entry'],
    },
    inspectionLinks: [
      {
        label: 'Smart contracts',
        href: 'https://github.com/subhajitlucky/quantumTicket/tree/main/blockchain',
      },
      {
        label: 'Frontend',
        href: 'https://github.com/subhajitlucky/quantumTicket/tree/main/frontend',
      },
      {
        label: 'Roadmap',
        href: 'https://github.com/subhajitlucky/quantumTicket/blob/main/ROADMAP.md',
      },
    ],
    seoKeywords: [
      'Subhajit Pradhan blockchain developer',
      'Solidity NFT ticketing project',
      'Ethers.js React smart contract app',
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
