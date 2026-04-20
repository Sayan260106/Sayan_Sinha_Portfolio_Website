import { motion } from 'motion/react';
import { GraduationCap, MapPin, Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION } from '../constants';

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white">
              Passionate about <br />
              <span className="text-teal-400 drop-shadow-[0_0_12px_rgba(20,184,166,0.3)]">Solving Problems.</span>
            </h3>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8 font-medium">
              {PERSONAL_INFO.about}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-emerald-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Location</p>
                  <p className="text-sm font-medium">{PERSONAL_INFO.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-emerald-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Email</p>
                  <p className="text-sm font-medium truncate max-w-[150px]">{PERSONAL_INFO.email}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400 mb-8 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">Education</h2>
            <div className="space-y-8">
              {EDUCATION.map((edu, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-emerald-500/50">
                  <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <p className="text-xs font-bold text-zinc-500 mb-1">{edu.duration}</p>
                  <h4 className="text-lg font-bold mb-1">{edu.degree}</h4>
                  <p className="text-blue-400 text-sm font-medium mb-2">{edu.institution}</p>
                  <p className="text-zinc-500 text-xs mb-2">{edu.details}</p>
                  <div className="inline-block px-2 py-1 rounded bg-zinc-900 text-zinc-300 text-xs font-mono">
                    GPA: {edu.gpa}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Current Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-32 p-8 md:p-12 glass rounded-[2.5rem] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <div className="font-mono text-[120px] font-bold leading-none select-none">GROWTH</div>
          </div>

          <div className="relative z-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400 mb-10 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-emerald-500/50"></span>
              What I'm Currently Learning
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-teal-400 border border-white/5">
                  <span className="font-mono text-xl font-bold">01</span>
                </div>
                <h4 className="text-xl font-bold text-white">Learning</h4>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-emerald-500/30 transition-colors">
                  <p className="text-zinc-300 font-medium">System Design Basics</p>
                  <p className="text-xs text-zinc-500 mt-1">Mastering scalability and distributed architectures.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-emerald-400 border border-white/5">
                  <span className="font-mono text-xl font-bold">02</span>
                </div>
                <h4 className="text-xl font-bold text-white">Exploring</h4>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-emerald-500/30 transition-colors">
                  <p className="text-zinc-300 font-medium">LLMs / GenAI</p>
                  <p className="text-xs text-zinc-500 mt-1">Diving deep into RAG, fine-tuning, and AI agents.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-blue-400 border border-white/5">
                  <span className="font-mono text-xl font-bold">03</span>
                </div>
                <h4 className="text-xl font-bold text-white">Building</h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-emerald-500/30 transition-colors">
                    <p className="text-zinc-100 font-bold">LabZero</p>
                    <p className="text-xs text-zinc-500 font-mono italic">Software Project</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-emerald-500/30 transition-colors">
                    <p className="text-zinc-100 font-bold">Smart Energy Saver</p>
                    <p className="text-xs text-zinc-500 font-mono italic">Hardware Project</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
