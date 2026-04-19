import { motion } from 'motion/react';
import { SKILL_GROUPS, CERTIFICATIONS } from '../constants';
import { Award, ExternalLink } from 'lucide-react';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-16 text-white">
              Technical <span className="text-teal-400 drop-shadow-[0_0_12px_rgba(20,184,166,0.3)]">Stack.</span>
            </h3>

            <div className="space-y-20">
              {SKILL_GROUPS.map((group, groupIndex) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: groupIndex * 0.1 }}
                  className="flex flex-col items-center md:items-start"
                >
                  <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-10 pl-2 border-l-2 border-blue-500/50">
                    {group.category}
                  </h4>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
                    {group.skills.map((skill, skillIndex) => (
                      <motion.a
                        key={skill.name}
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ 
                          scale: 1.15,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.4 }
                        }}
                        viewport={{ once: true }}
                        transition={{ delay: (groupIndex * 0.1) + (skillIndex * 0.05) }}
                        className="group relative flex flex-col items-center gap-3"
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                        
                        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center p-3 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/40 hover:bg-zinc-800 transition-all duration-300">
                          <img 
                            src={skill.icon} 
                            alt={skill.name} 
                            className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:text-blue-400 transition-all duration-300">
                          {skill.name}
                        </span>
                        
                        <ExternalLink size={10} className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-50 text-white transition-opacity" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:pt-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">Achievements</h2>
            <h3 className="text-2xl font-display font-bold mb-10 text-white leading-tight">Certifications</h3>
            
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 rounded-3xl glass flex items-start gap-5 group hover:border-amber-500/30 transition-all duration-500 hover:bg-white/5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-all duration-500">
                    <Award size={24} />
                  </div>
                  <div>
                    <h5 className="text-sm md:text-base font-bold mb-1 group-hover:text-amber-400 transition-colors">{cert.title}</h5>
                    <p className="text-xs text-zinc-500 mb-2">{cert.issuer}</p>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-800 px-2 py-0.5 rounded-full">
                        {cert.date}
                      </span>
                    </div>
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
