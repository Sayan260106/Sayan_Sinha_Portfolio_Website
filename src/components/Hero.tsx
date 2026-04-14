import { motion } from 'motion/react';
import { ChevronRight, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import ThreeCanvas from './ThreeCanvas';
import Magnetic from './Magnetic';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      <ThreeCanvas />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for new projects
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight leading-[0.9] mb-6">
            Building the <br />
            <span className="text-gradient">Future</span> with Code.
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            Hi, I'm <span className="text-zinc-100 font-medium">{PERSONAL_INFO.name}</span>. 
            A {PERSONAL_INFO.role} passionate about AI, Machine Learning, and creating immersive web experiences.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Magnetic strength={0.2}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold flex items-center gap-2 hover:bg-emerald-400 transition-colors"
              >
                View Projects
                <ChevronRight size={18} />
              </motion.a>
            </Magnetic>
            
            <Magnetic strength={0.2}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-100 font-bold flex items-center gap-2 hover:bg-zinc-800 transition-colors"
              >
                Contact Me
                <Mail size={18} />
              </motion.a>
            </Magnetic>
          </div>
        </motion.div>
        
        <div className="hidden lg:block relative h-[600px]">
          {/* This side is mostly covered by the 3D canvas, but we could add some floating UI elements here */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-1/4 right-0 glass p-6 rounded-2xl max-w-xs rotate-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <ChevronRight size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Latest Project</p>
                <p className="text-sm font-bold">LabZero Virtual Lab</p>
              </div>
            </div>
            <p className="text-xs text-zinc-400">Simulating science experiments with Three.js and React.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="absolute bottom-1/4 left-0 glass p-6 rounded-2xl max-w-xs -rotate-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ChevronRight size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Specialization</p>
                <p className="text-sm font-bold">Machine Learning</p>
              </div>
            </div>
            <p className="text-xs text-zinc-400">Building data-driven applications for real-world problems.</p>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500"
      >
        <div className="w-6 h-10 border-2 border-zinc-800 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-zinc-800 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
