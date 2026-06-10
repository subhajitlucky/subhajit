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
    stack: ['React', 'Node.js', 'AI provider APIs'],
    tags: ['AI', 'React', 'Node.js'],
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
    stack: ['React', 'Node.js', 'PostgreSQL'],
    tags: ['Full Stack', 'PostgreSQL', 'Product'],
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
