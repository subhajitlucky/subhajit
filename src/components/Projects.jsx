import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-primary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-accent font-spaceMono">
          Projects
        </h2>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-secondary p-6 rounded-lg border border-transparent hover:border-accent transition-all"
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  className="text-accent hover:opacity-80 flex items-center gap-1"
                >
                  <FiGithub /> Code
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  className="text-accent hover:opacity-80 flex items-center gap-1"
                >
                  <FiExternalLink /> Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}