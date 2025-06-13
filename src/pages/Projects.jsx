import './Projects.css';

function Projects() {
  const projects = [
    {
      title: "DeMarket",
      description: "A decentralized local marketplace platform that enables users to buy and sell goods and services using cryptocurrencies.",
      tech: "JavaScript, React, Solidity",
      github: "https://github.com/subhajitlucky/DeMarket",
      year: "2025"
    },
    {
      title: "PradhanFresh",
      description: "A family-owned business dedicated to bringing the freshest fruits and vegetables directly from local farms to your table.",
      tech: "TypeScript, React, Node.js, PostgreSQL",
      github: "https://github.com/subhajitlucky/pradhanfresh",
      year: "2025"
    },
    {
      title: "ICP Token Wallet",
      description: "A secure and user-friendly wallet for managing Internet Computer (ICP) tokens efficiently.",
      tech: "JavaScript, React, Rust",
      github: "https://github.com/subhajitlucky/icp-token-wallet",
      year: "2025"
    },
    {
      title: "Task Manager",
      description: "A full-stack MERN (MongoDB, Express.js, React, Node.js) task management application that allows users to create, read, update, and delete tasks.",
      tech: "MERN Stack",
      github: "https://github.com/subhajitlucky/task_manager",
      year: "2025"
    },
    {
      title: "Contest Radar",
      description: "A modern, responsive web application for tracking upcoming coding contests from various competitive programming platforms.",
      tech: "JavaScript, React, API Integration",
      github: "https://github.com/subhajitlucky/contest_radar",
      year: "2025"
    },
    {
      title: "Guess the Thief",
      description: "A real-time multiplayer game where players must use their wits to identify the Thief.",
      tech: "JavaScript, Real-time Gaming",
      github: "https://github.com/subhajitlucky/guess_the_thief",
      year: "2025"
    },
    {
      title: "Solana Wallet Checker",
      description: "A simple web application to check the SOL balance of any Solana wallet address on Devnet or Mainnet, built with React and Vite.",
      tech: "JavaScript, React, Solana",
      github: "https://github.com/subhajitlucky/solana_wallet_checker",
      year: "2025"
    },
    {
      title: "Auth System",
      description: "Authentication system built with MERN stack providing secure user registration and login functionality.",
      tech: "MERN Stack, JWT, Security",
      github: "https://github.com/subhajitlucky/auth-system",
      year: "2025"
    }
  ];

  return (
    <div className="projects-page">
      <div className="container">
        <h1>Projects</h1>
        <p className="projects-intro">Here are some of the projects I&apos;ve built while exploring different technologies and solving real-world problems.</p>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-year">{project.year}</span>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                <span className="tech-label">Tech:</span>
                <span className="tech-stack">{project.tech}</span>
              </div>
              
              <div className="project-links">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  🔗 GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="more-projects">
          <p>
            View all my projects on{" "}
            <a 
              href="https://github.com/subhajitlucky?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Projects; 