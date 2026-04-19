import { motion } from 'motion/react';
import { SKILLS, CERTIFICATIONS } from '../constants';
import { Award, CheckCircle2 } from 'lucide-react';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-500 mb-4">Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-12">
              Technical <span className="text-zinc-500">Stack.</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {Object.entries(SKILLS).map(([category, skills], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-zinc-800"></span>
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skills.map(skill => (
                      <motion.div
                        key={skill}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                          borderColor: "rgba(59, 130, 246, 0.5)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium cursor-default"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-500 mb-4">Achievements</h2>
            <h3 className="text-2xl font-display font-bold mb-8">Certifications</h3>
            
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-2xl glass flex items-start gap-4 group hover:border-amber-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold mb-1 group-hover:text-amber-400 transition-colors">{cert.title}</h5>
                    <p className="text-xs text-zinc-500 mb-1">{cert.issuer}</p>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{cert.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
