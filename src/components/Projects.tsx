import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ChevronRight, X, AlertCircle, Lightbulb, Zap } from 'lucide-react';
import { PROJECTS } from '../constants';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500 mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">
              Featured <span className="text-zinc-500">Projects.</span>
            </h3>
          </div>
          <p className="text-zinc-400 max-w-md">
            A collection of my recent work in web development, machine learning, and interactive design. Click on a card to see more details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              variants={{
                initial: { opacity: 0, y: 30 },
                animate: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.215, 0.61, 0.355, 1]
                  }
                },
                hover: {
                  y: -10,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              onClick={() => setSelectedProject(project)}
              className={cn(
                "group relative glass rounded-3xl overflow-hidden p-8 flex flex-col h-full cursor-pointer hover:border-emerald-500/30 transition-all",
                index === 0 ? "md:col-span-2 lg:col-span-2" : ""
              )}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                  <a href="#" className="text-zinc-500 hover:text-zinc-100 transition-colors">
                    <Github size={18} />
                  </a>
                  <a href="#" className="text-zinc-500 hover:text-zinc-100 transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <h4 className="text-2xl font-display font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h4>
              
              <p className="text-zinc-400 text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-2 mb-8">
                {project.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-500">
                    <ChevronRight size={14} className="mt-0.5 text-emerald-500 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{project.duration}</span>
                <motion.button
                  variants={{
                    initial: { opacity: 0, x: 20 },
                    hover: { opacity: 1, x: 0 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-xs font-bold flex items-center gap-1 text-emerald-500"
                >
                  View Details <ChevronRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl glass rounded-[32px] overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-zinc-100 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12 overflow-y-auto max-h-[85vh]">
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient">
                  {selectedProject.title}
                </h3>
                
                <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs mb-8">
                  {selectedProject.duration}
                </p>

                <div className="space-y-10">
                  <section>
                    <div className="flex items-center gap-3 mb-4 text-amber-500">
                      <AlertCircle size={20} />
                      <h4 className="text-lg font-bold uppercase tracking-wider">The Problem</h4>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-4 text-emerald-500">
                      <Lightbulb size={20} />
                      <h4 className="text-lg font-bold uppercase tracking-wider">The Solution</h4>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-4 text-blue-500">
                      <Zap size={20} />
                      <h4 className="text-lg font-bold uppercase tracking-wider">Key Challenges</h4>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      {selectedProject.challenges}
                    </p>
                  </section>

                  <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4">
                    <a 
                      href="#" 
                      className="px-6 py-3 rounded-xl bg-zinc-100 text-zinc-950 font-bold flex items-center gap-2 hover:bg-white transition-colors"
                    >
                      <Github size={18} />
                      Source Code
                    </a>
                    <a 
                      href="#" 
                      className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 font-bold flex items-center gap-2 hover:bg-zinc-800 transition-colors"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
