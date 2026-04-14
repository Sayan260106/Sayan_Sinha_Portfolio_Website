/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Contact from './components/Contact';
import LoadingScreen from './components/LodingScreen';
import CustomCursor from './components/CustomCursor';
import { AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <>
            <CustomCursor />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Blog />
              <Contact />
            </main>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
