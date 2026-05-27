const projects = [
  {
    title: 'Tarka Sabha',
    slug: 'tarka-sabha',
    role: 'Full-stack engineer',
    oneLine:
      'Multi-agent AI debate platform with provider orchestration and secure credential management.',
    description:
      'Multi-agent AI debate platform with provider orchestration and secure credential management.',
    problem:
      'AI debate workflows need a structured way to coordinate multiple model providers, user prompts, and credentials without mixing product logic with provider-specific details.',
    usersOrContext:
      'Built for users who want to run and compare AI-assisted debate flows through a web interface.',
    workflow:
      'A user defines the debate context, configures model access, starts the debate flow, and reviews generated arguments from the participating agents.',
    architecture:
      'React powers the client experience, while a Node.js backend coordinates provider requests, credential handling, and debate workflow state.',
    decisions: [
      'Separated provider orchestration from the interface so model integrations can change without reshaping the user flow.',
      'Kept credential handling behind backend boundaries instead of exposing provider keys to the browser.',
    ],
    tradeoffs: [
      'Supporting multiple providers increases orchestration complexity compared with a single-model implementation.',
    ],
    nextImprovements: [
      'Add richer debate history views and clearer comparison tools for generated responses.',
    ],
    stack: ['React', 'Node.js', 'AI provider APIs'],
    tags: ['React', 'Node.js', 'AI'],
    github: 'https://github.com/subhajitlucky/tarka-sabha',
    demo: 'https://github.com/subhajitlucky/tarka-sabha',
  },
  {
    title: 'IntentPay',
    slug: 'intentpay',
    role: 'Full-stack and smart contract engineer',
    oneLine:
      'AI-driven intent layer that translates natural language into on-chain DeFi transactions.',
    description:
      'AI-driven intent layer that translates natural language into on-chain DeFi transactions.',
    problem:
      'On-chain transaction flows can require users to understand protocol actions, wallet steps, and contract interactions before completing a payment or DeFi operation.',
    usersOrContext:
      'Built for crypto users exploring natural-language transaction intent as an interface layer for Web3 workflows.',
    workflow:
      'A user enters a transaction intent, the application interprets the requested action, prepares the related on-chain interaction, and routes the user through wallet execution.',
    architecture:
      'A TypeScript application connects AI intent parsing with Solidity contracts and wallet-based transaction execution.',
    decisions: [
      'Modeled the product around user intent first, then mapped interpreted actions to explicit transaction steps.',
      'Kept smart contract interactions visible in the workflow so users can review execution before confirming through a wallet.',
    ],
    tradeoffs: [
      'Natural-language input improves accessibility but requires careful validation before any blockchain transaction is prepared.',
    ],
    nextImprovements: [
      'Add stronger intent validation and clearer transaction previews before wallet confirmation.',
    ],
    stack: ['TypeScript', 'Solidity', 'AI workflows', 'Ethers.js'],
    tags: ['TypeScript', 'Solidity', 'AI'],
    github: 'https://github.com/subhajitlucky/intentpay',
    demo: 'https://github.com/subhajitlucky/intentpay',
  },
  {
    title: 'CampusHelper',
    slug: 'campushelper',
    role: 'Full-stack engineer',
    oneLine:
      'Full-stack lost-and-found system with authentication, file uploads, and full-text search.',
    description:
      'Full-stack lost-and-found system with authentication, file uploads, and full-text search.',
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
    ],
    tradeoffs: [
      'Adding uploads and search increases backend surface area compared with a static listing board.',
    ],
    nextImprovements: [
      'Improve moderation and matching flows for duplicate or related item reports.',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL'],
    tags: ['React', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/subhajitlucky/campushelper',
    demo: 'https://campushelper.vercel.app',
  },
];

export default projects;
