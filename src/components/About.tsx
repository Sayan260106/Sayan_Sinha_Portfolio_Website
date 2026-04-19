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
                <div key={index} className="relative pl-8 border-l border-zinc-800">
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
      </div>
    </section>
  );
}
