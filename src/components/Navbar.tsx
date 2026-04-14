import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../constants';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
          isScrolled ? "bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Magnetic strength={0.1}>
            <a href="#" className="text-xl font-display font-bold tracking-tighter text-gradient">
              SS.
            </a>
          </Magnetic>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Magnetic key={item.name} strength={0.2}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors px-2 py-1"
                >
                  {item.name}
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {PERSONAL_INFO.socials.map((social) => (
              <Magnetic key={social.name} strength={0.3}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <social.icon size={18} />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[60] w-12 h-12 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center shadow-lg hover:bg-emerald-400 transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
