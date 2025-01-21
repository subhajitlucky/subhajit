// Desc: Home page hero section

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    // Hero Section
    <section className="min-h-screen bg-primary relative overflow-hidden">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-primary/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Your Name*/}
          
          
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-accent font-spaceMono"
          >
            Subhajit
          </motion.h1>
          {/* Navigation Links*/}
          <div className="flex gap-6 items-center">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, color: "#00FF88" }}
              className="text-gray-300 hover:text-accent transition-all"
            >
              Projects
            </motion.a>
            <motion.a
              href='/assets/resume.pdf'
              target='_blank'
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, color: "#00FF88" }}
              className="text-gray-300 hover:text-accent transition-all cursor-pointer"
            >
              Resume
            </motion.a>
            <motion.a
              href="#skills"
              whileHover={{ scale: 1.05, color: "#00FF88" }}
              className="text-gray-300 hover:text-accent transition-all"
            >
                Skills
            </motion.a>
            <motion.a
              href="#web3-demo"
              whileHover={{ scale: 1.05, color: "#00FF88" }}
              className="text-gray-300 hover:text-accent transition-all"
            >
              Web3 Demo
            </motion.a>
          </div>
        </div>
      </nav>
      {/* Hero Content */}
      <div className="h-screen flex items-center justify-center text-center px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
              Building the Future of the Web
            </h1>
            {/*Short Info*/}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Full-stack developer specializing in{" "}
              <span className="text-accent">React</span>,{" "}
              <span className="text-purple-400">Node.js</span>, and{" "}
              <span className="text-blue-400">Web3</span>. Turning ideas into
              reality.
            </motion.p>
            {/*CTA Buttons*/}
            <div className="flex gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                className="bg-accent text-black px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all"
              >
                Let's Build Together
                <span className="text-2xl">🚀</span>
              </motion.a>
              {/*Social Links*/}
              <motion.a
                href="https://github.com/subhajitlucky"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-full border border-accent text-accent hover:bg-accent/10 transition-all"
              >
                <FiGithub size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/subhajitlucky"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-full border border-accent text-accent hover:bg-accent/10 transition-all"
              >
                <FiLinkedin size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
