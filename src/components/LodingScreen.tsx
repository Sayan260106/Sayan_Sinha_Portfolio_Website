import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   Hyperspace warp-tunnel canvas
   Stars fly outward from a central vanishing
   point; speed ramps up as progress increases,
   giving the feeling of jumping to warp.
───────────────────────────────────────────── */
function WarpCanvas({ progress }: { progress: number }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const progressRef  = useRef(progress);
  const animRef = useRef<number | null>(null);

  useEffect(() => { progressRef.current = progress; }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const STAR_COUNT = 900;
    type Star = { x: number; y: number; z: number; pz: number };

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x:  (Math.random() - 0.5) * canvas.width  * 2.5,
      y:  (Math.random() - 0.5) * canvas.height * 2.5,
      z:  Math.random() * canvas.width,
      pz: 0,
    }));
    stars.forEach(s => (s.pz = s.z));

    const FL = 320; // focal length

    const render = () => {
      const W = canvas.width;
      const H = canvas.height;
      const p = progressRef.current;

      // Speed eases in slow, then surges at the end
      const speed = 1.5 + Math.pow(p / 100, 2) * 28;

      // Trailing fade – shorter trail at slow speed, longer at warp
      const fadeAlpha = 0.12 + (p / 100) * 0.2;
      ctx.fillStyle   = `rgba(2, 7, 20, ${fadeAlpha})`;
      ctx.fillRect(0, 0, W, H);

      for (const star of stars) {
        star.pz = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.x  = (Math.random() - 0.5) * W  * 2.5;
          star.y  = (Math.random() - 0.5) * H  * 2.5;
          star.z  = W;
          star.pz = W;
        }

        const sx = (star.x / star.z)  * FL + W / 2;
        const sy = (star.y / star.z)  * FL + H / 2;
        const px = (star.x / star.pz) * FL + W / 2;
        const py = (star.y / star.pz) * FL + H / 2;

        const depth  = 1 - star.z / W;
        const size   = Math.max(0.4, depth * 2.5);
        const alpha  = Math.min(1, depth * 1.6);

        // Colour: dim blue → cyan → white-hot as star approaches
        const h = 195 - depth * 30;  // 195 → 165 (blue-cyan)
        const l = 55 + depth * 45;   // 55% → 100%

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `hsla(${h}, 80%, ${l}%, ${alpha})`;
        ctx.lineWidth   = size;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ─────────────────────────────────────────────
   Dynamic status label cycling with progress
───────────────────────────────────────────── */
function statusLabel(p: number) {
  if (p < 20)  return 'Calibrating Systems';
  if (p < 45)  return 'Loading Assets';
  if (p < 70)  return 'Building Universe';
  if (p < 90)  return 'Charging Warp Drive';
  if (p < 100) return 'Engaging Thrusters';
  return 'Launching';
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(id); return 100; }
        // Slightly uneven increments feel more organic
        return prev + (Math.random() < 0.3 ? 2 : 1);
      });
    }, 20);
    return () => clearInterval(id);
  }, []);

  const capped = Math.min(progress, 100);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[100] bg-[#020714] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Warp-speed background */}
      <WarpCanvas progress={capped} />

      {/* Radial vignette so UI stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 30%, rgba(2,7,20,0.75) 100%)',
        }}
      />

      {/* ── 3-D perspective logo ── */}
      <div className="relative z-10 flex flex-col items-center" style={{ perspective: '900px' }}>
        <motion.div
          initial={{ opacity: 0, rotateX: 80, y: 30 }}
          animate={{ opacity: 1, rotateX: 0,  y: 0  }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="mb-14"
        >
          {/* Subtle continuous 3-D rock */}
          <motion.div
            animate={{ rotateY: [0, 6, -6, 0], rotateX: [0, -4, 4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Ghost layer – depth illusion */}
            <div
              className="absolute inset-0 font-display font-bold tracking-tighter text-7xl md:text-9xl select-none"
              style={{
                transform: 'translateZ(-18px)',
                background: 'linear-gradient(135deg, rgba(52,211,153,0.15) 0%, rgba(6,182,212,0.08) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'blur(4px)',
              }}
            >
              SS.
            </div>

            {/* Main text */}
            <div
              className="font-display font-bold tracking-tighter text-7xl md:text-9xl select-none"
              style={{
                background: 'linear-gradient(135deg, #34d399 0%, #22d3ee 45%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 35px rgba(52,211,153,0.5)) drop-shadow(0 0 80px rgba(99,102,241,0.25))',
              }}
            >
              SS.
            </div>
          </motion.div>
        </motion.div>

        {/* ── Progress track ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-72 space-y-3"
        >
          {/* Bar */}
          <div className="h-[2px] w-full bg-white/[0.07] rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${capped}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #34d399 0%, #22d3ee 60%, #818cf8 100%)',
                boxShadow: '0 0 14px 2px rgba(52,211,153,0.7)',
              }}
            />
            {/* Bright leading edge pulse */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"
              style={{
                left: `calc(${capped}% - 6px)`,
                boxShadow: '0 0 12px 4px rgba(255,255,255,0.7)',
              }}
            />
          </div>

          {/* Labels */}
          <div className="flex justify-between items-center">
            <motion.span
              key={statusLabel(capped)}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500"
            >
              {statusLabel(capped)}
            </motion.span>
            <span className="text-[10px] font-mono tabular-nums text-emerald-400 tracking-widest">
              {String(capped).padStart(3, '0')}%
            </span>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-10 text-[11px] font-mono tracking-[0.35em] text-zinc-600 uppercase"
      >
        Sayan Sinha Portfolio © 2026
      </motion.p>
    </motion.div>
  );
}