import { motion } from 'motion/react';
import { GraduationCap, MapPin, Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION } from '../constants';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500 mb-4">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Passionate about <br />
              <span className="text-zinc-500">Solving Problems.</span>
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
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
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-500 mb-8">Education</h2>
            <div className="space-y-8">
              {EDUCATION.map((edu, index) => (
                <div key={index} className="relative pl-8 border-l border-zinc-800">
                  <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
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
