import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Subtle auto-rotation combined with manual control
    meshRef.current.rotation.x = Math.sin(time / 2) / 4;
    meshRef.current.rotation.y = Math.cos(time / 2) / 4;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[1, 100, 100]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        scale={clicked ? 1.2 : 1}
      >
        <MeshDistortMaterial
          color={hovered ? "#3b82f6" : "#10b981"}
          attach="material"
          distort={clicked ? 0.6 : 0.4}
          speed={hovered ? 4 : 2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function Cube({ position, rotation, speed }: { position: [number, number, number], rotation: [number, number, number], speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x += 0.01 * speed;
    meshRef.current.rotation.y += 0.01 * speed;
    meshRef.current.position.y += Math.sin(time + position[0]) * 0.002;
  });

  return (
    <mesh position={position} rotation={rotation} ref={meshRef}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <MeshWobbleMaterial color="#3b82f6" speed={1} factor={0.6} opacity={0.4} transparent />
    </mesh>
  );
}

function FloatingCubes() {
  const cubes = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      speed: Math.random() + 0.5
    }));
  }, []);

  return (
    <group>
      {cubes.map((props, i) => (
        <Cube key={i} {...props} />
      ))}
    </group>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={1} />
        
        <AnimatedSphere />
        <FloatingCubes />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
