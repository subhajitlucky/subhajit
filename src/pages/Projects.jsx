import { useState, useEffect } from 'react';
import '../styles/Projects.css';

function Projects() {
  const [isSpaceTheme, setIsSpaceTheme] = useState(false);

  useEffect(() => {
    // Check initial theme from body attribute
    const checkTheme = () => {
      const theme = document.body.getAttribute('data-theme');
      setIsSpaceTheme(theme === 'space');
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          checkTheme();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    
    {
      title: "DeMarket",
      description: "Advanced decentralized marketplace on Ethereum with 73% gas optimization, event-based data architecture, and enterprise-grade security. Features real-time analytics, MetaMask integration, and comprehensive testing suite.",
      tech: "Solidity, React, Ethers.js, Hardhat, Vite, Smart Contracts",
      github: "https://github.com/subhajitlucky/demarket",
      demo: "https://demarketplace.vercel.app",
      year: "2025",
      featured: true
    },
    {
      title: "PradhanFresh",
      description: "A comprehensive full-stack e-commerce platform for fresh produce delivery. Features user authentication, product management, and modern TypeScript architecture with PostgreSQL backend.",
      tech: "TypeScript, React, Node.js, PostgreSQL, Prisma",
      github: "https://github.com/subhajitlucky/pradhanfresh",
      demo: "https://pradhanfresh.vercel.app",
      year: "2025",
      featured: true
    },
    {
      title: "QuantumTicket",
      description: "Blockchain-powered event ticketing platform that mints verifiable NFT tickets on-chain. Provides seamless purchase flow, QR code verification, and secondary resale with royalty support.",
      tech: "React, Vite, Solidity, Ethers.js, NFT, Smart Contracts",
      github: "https://github.com/subhajitlucky/quantumTicket",
      demo: "https://quantumticket.vercel.app/",
      year: "2025",
      featured: true
    },
    {
      title: "TokenVault",
      description: "Professional multi-chain portfolio tracker supporting 8+ blockchain networks. Provides real-time balance tracking, automatic token detection, and unified portfolio analytics across Solana, Ethereum, Polygon, Arbitrum, and more.",
      tech: "React, Ethers.js, Solana Web3.js, Multi-Chain APIs",
      github: "https://github.com/subhajitlucky/tokenVault",
      demo: "https://tokenvault.vercel.app/",
      year: "2025",
      featured: true
    },
    {
      title: "Shree Jagannatha Temple",
      description: "A tourism website dedicated to the sacred Shree Jagannatha Temple in Puri, Odisha. Features stunning visual animations, comprehensive temple information, festival guides for devotees and tourists.",
      tech: "React, Vite, Chakra UI, CSS3 Animations, Responsive Design",
      github: "https://github.com/subhajitlucky/Shree_Jagannatha",
      demo: "https://shreejagannatha.vercel.app",
      year: "2025",
      featured: true
    },
    {
      title: "ICP Token Wallet",
      description: "A secure and user-friendly wallet for managing Internet Computer (ICP) tokens with advanced transaction handling and portfolio tracking capabilities.",
      tech: "JavaScript, React, Rust, Internet Computer",
      github: "https://github.com/subhajitlucky/icp-token-wallet",
      year: "2025"
    },
    {
      title: "Authentication System",
      description: "A robust authentication system built with MERN stack providing secure user registration, login, and session management with JWT tokens and bcrypt encryption.",
      tech: "MERN Stack, JWT, Security, bcrypt",
      github: "https://github.com/subhajitlucky/authentication",
      year: "2025"
    },
    {
      title: "Task Manager",
      description: "A full-stack MERN application with complete CRUD functionality for task management, featuring user authentication and responsive design.",
      tech: "MERN Stack (MongoDB, Express, React, Node.js)",
      github: "https://github.com/subhajitlucky/task_manager",
      year: "2025"
    },
    {
      title: "Contest Radar",
      description: "A modern, responsive web application for tracking upcoming coding contests from various competitive programming platforms with real-time updates and notifications.",
      tech: "JavaScript, React, API Integration",
      github: "https://github.com/subhajitlucky/contest_radar",
      year: "2025"
    },
    {
      title: "Guess the Thief",
      description: "A real-time multiplayer social deduction game where players must identify the Thief among them. Implements lobby management, role assignment, and gameplay entirely in real-time using WebSockets.",
      tech: "Node.js, Express, Socket.IO, React, Vite, WebSockets",
      github: "https://github.com/subhajitlucky/guess_the_thief",
      year: "2025"
    }
  ];

  return (
    <div className="projects-page">
      {/* Complete Cosmic Elements - Only show in space theme */}
      {isSpaceTheme && (
        <>
          {/* Animated Starfield Background */}
          <div className="starfield">
            <div className="stars stars-small"></div>
            <div className="stars stars-medium"></div>
            <div className="stars stars-large"></div>
          </div>
          
          {/* Floating Particles */}
          <div className="particles">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className={`particle particle-${i + 1}`}></div>
            ))}
          </div>
          
          {/* Shooting Stars */}
          <div className="shooting-stars">
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
          </div>
        </>
      )}

      <div className="container">
        <h1>Projects</h1>
        <p className="projects-intro">
          Here are some of my featured projects showcasing expertise in blockchain development, 
          full-stack web applications, and modern JavaScript technologies.
        </p>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className={`project-card ${project.featured ? 'featured' : ''}`}>
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
                {project.demo && (
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link demo-link"
                  >
                    🚀 Live Demo
                  </a>
                )}
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