import { FaReact, FaEthereum } from "react-icons/fa";
import { SiSolidity, SiTailwindcss } from "react-icons/si";

export default function Skills() {
  const skills = [
    { name: "React", icon: <FaReact className="w-8 h-8" />, type: "web2" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="w-8 h-8" />, type: "web2" },
    { name: "Solidity", icon: <SiSolidity className="w-8 h-8" />, type: "web3" },
    { name: "Ethereum", icon: <FaEthereum className="w-8 h-8" />, type: "web3" },
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-accent font-spaceMono">
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-secondary p-6 rounded-lg text-center hover:border-accent border border-transparent transition-all"
            >
              <div className="text-accent mb-2 flex justify-center">
                {skill.icon}
              </div>
              <h3 className="font-medium">{skill.name}</h3>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}