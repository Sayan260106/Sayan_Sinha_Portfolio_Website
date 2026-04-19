import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Galaxy({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const mainRef  = useRef<THREE.Points>(null);
  const coreRef  = useRef<THREE.Points>(null);
  const dustRef  = useRef<THREE.Points>(null);
  const { camera } = useThree();

  /* ── Main spiral arms ── */
  const mainGeo = useMemo(() => {
    const COUNT    = 100_000;
    const BRANCHES = 5;
    const SPIN     = 1.8;
    const RADIUS   = 16;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);

    const c1 = new THREE.Color('#ff6b35'); // warm core
    const c2 = new THREE.Color('#4361ee'); // mid blue
    const c3 = new THREE.Color('#0a1445'); // deep outer

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const r      = Math.random() * RADIUS;
      const spin   = r * SPIN;
      const branch = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
      const p      = 2.8;

      const rx = Math.pow(Math.random(), p) * (Math.random() < 0.5 ? 1 : -1) * 0.22 * r;
      const ry = Math.pow(Math.random(), p) * (Math.random() < 0.5 ? 1 : -1) * 0.08 * r;
      const rz = Math.pow(Math.random(), p) * (Math.random() < 0.5 ? 1 : -1) * 0.22 * r;

      positions[i3]     = Math.cos(branch + spin) * r + rx;
      positions[i3 + 1] = ry;
      positions[i3 + 2] = Math.sin(branch + spin) * r + rz;

      const t   = r / RADIUS;
      const col = t < 0.5 ? c1.clone().lerp(c2, t * 2) : c2.clone().lerp(c3, (t - 0.5) * 2);
      colors[i3] = col.r; colors[i3 + 1] = col.g; colors[i3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    return geo;
  }, []);

  /* ── Bright galactic core ── */
  const coreGeo = useMemo(() => {
    const COUNT     = 12_000;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const warm      = new THREE.Color('#ffd5a0');
    const hot       = new THREE.Color('#ffffff');

    for (let i = 0; i < COUNT; i++) {
      const i3    = i * 3;
      const r     = Math.pow(Math.random(), 2.2) * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi   = (Math.random() - 0.5) * 0.45;

      positions[i3]     = Math.cos(theta) * Math.cos(phi) * r;
      positions[i3 + 1] = Math.sin(phi) * r * 0.5;
      positions[i3 + 2] = Math.sin(theta) * Math.cos(phi) * r;

      const col = hot.clone().lerp(warm, r / 2.8);
      colors[i3] = col.r; colors[i3 + 1] = col.g; colors[i3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    return geo;
  }, []);

  /* ── Distant background star dust ── */
  const dustGeo = useMemo(() => {
    const COUNT     = 15_000;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 20 + Math.random() * 30;

      positions[i3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const brightness   = 0.4 + Math.random() * 0.6;
      colors[i3] = brightness * 0.8;
      colors[i3 + 1] = brightness * 0.85;
      colors[i3 + 2] = brightness;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (mainRef.current) mainRef.current.rotation.y = t * 0.035;
    if (coreRef.current) coreRef.current.rotation.y = t * 0.07;

    /* ── Scroll-driven camera fly-through ── */
    const scroll    = scrollRef.current;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const pct       = Math.min(scroll / maxScroll, 1);

    // 0% scroll: hovering above galaxy · 100% scroll: punched through the core
    const targetZ   = THREE.MathUtils.lerp(20, -8, pct);
    const targetY   = THREE.MathUtils.lerp(5, -1, pct);
    const targetFov = THREE.MathUtils.lerp(58, 105, pct);

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.055);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.055);

    const cam = camera as THREE.PerspectiveCamera;
    cam.fov   = THREE.MathUtils.lerp(cam.fov, targetFov, 0.055);
    cam.updateProjectionMatrix();
  });

  return (
    <>
      {/* Background star dust */}
      <points ref={dustRef} geometry={dustGeo}>
        <pointsMaterial size={0.06} sizeAttenuation depthWrite={false}
          vertexColors blending={THREE.AdditiveBlending} />
      </points>

      {/* Main spiral arms */}
      <points ref={mainRef} geometry={mainGeo}>
        <pointsMaterial size={0.016} sizeAttenuation depthWrite={false}
          vertexColors blending={THREE.AdditiveBlending} />
      </points>

      {/* Dense core */}
      <points ref={coreRef} geometry={coreGeo}>
        <pointsMaterial size={0.028} sizeAttenuation depthWrite={false}
          vertexColors blending={THREE.AdditiveBlending} />
      </points>
    </>
  );
}

export default function ThreeCanvas() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <Canvas
        camera={{ position: [0, 5, 20], fov: 58 }}
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020714']} />
        <fog attach="fog" args={['#020714', 28, 42]} />
        <Galaxy scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}