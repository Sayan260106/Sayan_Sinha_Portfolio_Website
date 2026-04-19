import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

type CursorMode = 'default' | 'hover' | 'click';

export default function CustomCursor() {
  const [mode, setMode]         = useState<CursorMode>('default');
  const [visible, setVisible]   = useState(false);

  // Single source of truth – updated on every mousemove
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive =
        t.tagName === 'A'      ||
        t.tagName === 'BUTTON' ||
        !!t.closest('a')       ||
        !!t.closest('button')  ||
        t.classList.contains('cursor-pointer');
      setMode(prev => (prev === 'click' ? 'click' : interactive ? 'hover' : 'default'));
    };

    const onDown = () => setMode('click');
    const onUp   = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive =
        t.tagName === 'A' || t.tagName === 'BUTTON' ||
        !!t.closest('a') || !!t.closest('button')   ||
        t.classList.contains('cursor-pointer');
      setMode(interactive ? 'hover' : 'default');
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove',   onMove,  { passive: true });
    window.addEventListener('mouseover',   onOver);
    window.addEventListener('mousedown',   onDown);
    window.addEventListener('mouseup',     onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove',   onMove);
      window.removeEventListener('mouseover',   onOver);
      window.removeEventListener('mousedown',   onDown);
      window.removeEventListener('mouseup',     onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [cursorX, cursorY, visible]);

  const isHover = mode === 'hover';
  const isClick = mode === 'click';

  return (
    <>
      {/* ── Outer aura ring (direct position = zero lag) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full border"
          animate={{
            width:           isHover ? 52 : isClick ? 20 : 34,
            height:          isHover ? 52 : isClick ? 20 : 34,
            borderColor:     isHover ? 'rgba(52,211,153,1)'   : 'rgba(52,211,153,0.45)',
            backgroundColor: isHover ? 'rgba(52,211,153,0.08)': 'transparent',
            rotate:          isHover ? 45 : 0,
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 28, mass: 0.6 }}
          style={{
            boxShadow: isHover
              ? '0 0 24px 4px rgba(52,211,153,0.35), inset 0 0 16px rgba(52,211,153,0.12)'
              : isClick
              ? '0 0 14px 2px rgba(52,211,153,0.6)'
              : '0 0 8px rgba(52,211,153,0.2)',
          }}
        />
      </motion.div>

      {/* ── Secondary orbit ring (hover only) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full border border-cyan-400/30"
          animate={{
            width:   isHover ? 72 : 0,
            height:  isHover ? 72 : 0,
            opacity: isHover ? 1  : 0,
            rotate:  isHover ? -45 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            boxShadow: '0 0 16px rgba(34,211,238,0.2)',
          }}
        />
      </motion.div>

      {/* ── Centre dot (pure direct tracking, no animation lag) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width:  isHover ? 7 : isClick ? 3 : 5,
            height: isHover ? 7 : isClick ? 3 : 5,
            backgroundColor: isHover ? '#34d399' : '#10b981',
          }}
          transition={{ type: 'spring', stiffness: 700, damping: 35 }}
          style={{
            boxShadow: isHover
              ? '0 0 14px 3px rgba(52,211,153,0.8)'
              : '0 0 5px rgba(16,185,129,0.6)',
          }}
        />
      </motion.div>
    </>
  );
}