import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Galaxy({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const mainRef  = useRef<THREE.Points>(null);
  const coreRef  = useRef<THREE.Points>(null);
  const dustRef  = useRef<THREE.Points>(null);
  const { camera } = useThree();

  /* ── Sharper, higher-contrast particle texture ── */
  const starTexture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const center = size / 2;
      const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);

      // Much tighter falloff — solid core, fast dropoff, minimal halo
      gradient.addColorStop(0.0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.25, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.85)');
      gradient.addColorStop(0.5, 'rgba(255,255,255,0.35)');
      gradient.addColorStop(0.65, 'rgba(255,255,255,0.08)');
      gradient.addColorStop(1.0, 'rgba(255,255,255,0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, []);

  /* ── Main spiral arms ── */
  const mainGeo = useMemo(() => {
    const COUNT    = 25_000;
    const BRANCHES = 5;
    const SPIN     = 1.8;
    const RADIUS   = 16;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);

    // Higher-contrast, more saturated colors
    const c1 = new THREE.Color('#ff7a3d'); // hot orange core
    const c2 = new THREE.Color('#5577ff'); // vivid blue
    const c3 = new THREE.Color('#1a1055'); // deep purple-blue outer

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

      // Bimodal brightness: many dim, some very bright → more contrast
      const brightness = Math.random() < 0.15
        ? 1.4 + Math.random() * 0.6   // bright stars (15%)
        : 0.5 + Math.random() * 0.5;  // dim stars (85%)

      colors[i3]     = col.r * brightness;
      colors[i3 + 1] = col.g * brightness;
      colors[i3 + 2] = col.b * brightness;

      sizes[i] = 0.4 + Math.random() * 1.4;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes,     1));
    return geo;
  }, []);

  /* ── Bright galactic core ── */
  const coreGeo = useMemo(() => {
    const COUNT     = 4_000;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);
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
      const brightness = 0.9 + Math.random() * 0.5;
      colors[i3]     = col.r * brightness;
      colors[i3 + 1] = col.g * brightness;
      colors[i3 + 2] = col.b * brightness;

      sizes[i] = 0.7 + Math.random() * 1.6;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes,     1));
    return geo;
  }, []);

  /* ── Distant background star dust ── */
  const dustGeo = useMemo(() => {
    const COUNT     = 3_500;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 20 + Math.random() * 30;

      positions[i3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Bimodal: most dim, a few pop bright
      const brightness = Math.random() < 0.1
        ? 1.1 + Math.random() * 0.4
        : 0.3 + Math.random() * 0.4;

      colors[i3]     = brightness * 0.85;
      colors[i3 + 1] = brightness * 0.9;
      colors[i3 + 2] = brightness;

      sizes[i] = 0.3 + Math.random() * 1.0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes,     1));
    return geo;
  }, []);

  /* ── Custom shader: normal blending for crisp, less-glowy particles ── */
  const createStarMaterial = (baseSize: number) => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: starTexture },
        uBaseSize: { value: baseSize },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aSize;
        varying vec3 vColor;
        uniform float uBaseSize;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = uBaseSize * aSize * uPixelRatio * (1.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3 vColor;

        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          if (tex.a < 0.15) discard;

          // Sharpen alpha with a power curve — harder edges, less halo
          float alpha = pow(tex.a, 1.8);

          // Boost color contrast — push midtones toward extremes
          vec3 color = vColor * tex.rgb;
          color = pow(color, vec3(0.9)); // slight gamma boost for punch

          gl_FragColor = vec4(color, alpha);
        }
      `,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending, // less glowy than additive
    });
  };

  const mainMat = useMemo(() => createStarMaterial(38), [starTexture]);
  const coreMat = useMemo(() => createStarMaterial(55), [starTexture]);
  const dustMat = useMemo(() => createStarMaterial(28), [starTexture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (mainRef.current) mainRef.current.rotation.y = t * 0.025;
    if (coreRef.current) coreRef.current.rotation.y = t * 0.05;

    const scroll    = scrollRef.current;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const pct       = Math.min(scroll / maxScroll, 1);

    const mouseX = (state.mouse.x * 2);
    const mouseY = (state.mouse.y * 2);

    const targetZ   = THREE.MathUtils.lerp(24, 2.5, pct);
    const targetY   = THREE.MathUtils.lerp(6, 0.2, pct);
    const targetFov = THREE.MathUtils.lerp(55, 95, pct);

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + (mouseY * 0.1), 0.035);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 0.25, 0.035);

    const cam = camera as THREE.PerspectiveCamera;
    cam.fov   = THREE.MathUtils.lerp(cam.fov, targetFov, 0.035);
    cam.updateProjectionMatrix();

    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <points ref={dustRef} geometry={dustGeo} material={dustMat} />
      <points ref={mainRef} geometry={mainGeo} material={mainMat} />
      <points ref={coreRef} geometry={coreGeo} material={coreMat} />
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
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020714']} />
        <fog attach="fog" args={['#020714', 32, 48]} />
        <Galaxy scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}