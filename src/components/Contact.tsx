import { motion } from 'motion/react';
import { Send, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-[40px] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-16 lg:border-r border-zinc-800">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500 mb-4">Contact</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-8">
                Let's build <br />
                <span className="text-zinc-500">Something Great.</span>
              </h3>
              
              <p className="text-zinc-400 text-lg mb-12">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Email Me</p>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-lg font-bold hover:text-emerald-400 transition-colors">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:bg-blue-500 group-hover:text-zinc-950 transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Call Me</p>
                    <p className="text-lg font-bold">{PERSONAL_INFO.phone}</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex gap-4">
                {PERSONAL_INFO.socials.map((social) => (
                  <motion.a
                    key={social.name}
                    whileHover={{ y: -5 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-all"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-16 bg-zinc-900/30">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Project Inquiry"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-emerald-500 text-zinc-950 font-bold flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors"
                >
                  Send Message
                  <Send size={18} />
                </motion.button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Sayan Sinha. Built with React, Three.js & Tailwind.
          </p>
        </div>
      </div>
    </section>
  );
}
