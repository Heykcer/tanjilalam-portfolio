import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Floating shard ── */
function Shard({ position, scale = 1, speed = 1, color = '#B22222' }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.6;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshToonMaterial color={color} transparent opacity={0.65} />
    </mesh>
  );
}

/* ── Spinning torus ring ── */
function Ring({ position, color = '#B22222', opacity = 0.4, radius = 1.5 }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.3;
    ref.current.rotation.z = s.clock.elapsedTime * 0.2;
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, 0.04, 16, 64]} />
      <meshToonMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* ── Wireframe cube edges ── */
const boxEdgesGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2));
function WireCube({ position, opacity = 0.25 }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.2;
    ref.current.rotation.y = s.clock.elapsedTime * 0.3;
  });
  return (
    <lineSegments ref={ref} position={position} geometry={boxEdgesGeo}>
      <lineBasicMaterial color="#D1D5DB" transparent opacity={opacity} />
    </lineSegments>
  );
}

/* ── Main component ── */
export default function R3FBackground({ variant = 'default' }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#B22222" />
        <pointLight position={[-5, -3, 3]} intensity={1} color="#D1D5DB" />

        <Suspense fallback={null}>
          <Stars radius={80} depth={30} count={300} factor={2} fade speed={0.5} />
          <Sparkles count={60} scale={12} size={2} speed={0.4} color="#B22222" opacity={0.6} />

          {/* Hero */}
          {variant === 'hero' && (
            <>
              <Float speed={2} rotationIntensity={0.4} floatIntensity={1}>
                <Shard position={[3.8, 1.2, -3]} scale={0.55} speed={0.8} color="#B22222" />
              </Float>
              <Float speed={1.5} floatIntensity={0.7}>
                <Ring position={[-3.5, -0.5, -4]} color="#B22222" opacity={0.35} />
              </Float>
              <Float speed={3} floatIntensity={1.2}>
                <Shard position={[5, -2.5, -5]} scale={0.3} speed={1.3} color="#D1D5DB" />
              </Float>
              <Float speed={2.5} floatIntensity={0.5}>
                <Ring position={[5.5, 2.5, -6]} color="#D1D5DB" opacity={0.2} radius={2} />
              </Float>
              <Float speed={1.8} floatIntensity={0.9}>
                <WireCube position={[-5, 2, -5]} opacity={0.2} />
              </Float>
            </>
          )}

          {/* Skills */}
          {variant === 'skills' && (
            <>
              {[-5, 0, 5].map((x, i) => (
                <Float key={i} speed={2 + i * 0.4} floatIntensity={0.8}>
                  <Shard position={[x, 3, -4]} scale={0.4} speed={0.5 + i * 0.2} color={i === 1 ? '#D1D5DB' : '#B22222'} />
                </Float>
              ))}
              <Float speed={1.5} floatIntensity={0.6}>
                <Ring position={[0, -3, -5]} color="#B22222" opacity={0.25} radius={2.5} />
              </Float>
            </>
          )}

          {/* Projects */}
          {variant === 'projects' && (
            <>
              <Float speed={2} floatIntensity={0.7}>
                <WireCube position={[5, 1, -4]} opacity={0.25} />
              </Float>
              <Float speed={3} floatIntensity={1}>
                <Shard position={[-5, -2, -5]} scale={0.5} speed={0.7} color="#B22222" />
              </Float>
            </>
          )}

          {/* Experience */}
          {variant === 'experience' && (
            <>
              <Float speed={1.5} floatIntensity={0.5}>
                <Ring position={[-5, 0, -5]} color="#B22222" opacity={0.3} radius={2} />
              </Float>
              <Float speed={2} floatIntensity={0.8}>
                <Ring position={[5, 0, -5]} color="#D1D5DB" opacity={0.2} radius={1.8} />
              </Float>
            </>
          )}

          {/* Achievements */}
          {variant === 'achievements' && (
            <>
              <Float speed={4} rotationIntensity={2}>
                <Shard position={[-5, 2.5, -3]} scale={0.7} speed={1.2} color="#B22222" />
              </Float>
              <Float speed={3} rotationIntensity={1.5}>
                <Shard position={[5, -2, -3]} scale={0.65} speed={0.9} color="#D1D5DB" />
              </Float>
              <Float speed={2} floatIntensity={0.5}>
                <Ring position={[0, 0, -6]} color="#B22222" opacity={0.2} radius={3} />
              </Float>
              <Float speed={1.5} floatIntensity={0.5}>
                <WireCube position={[0, 0, -7]} opacity={0.15} />
              </Float>
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
