import React, { useRef, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import ErrorBoundary from '../Common/ErrorBoundary';
import Particles from '../Common/Particles';
import R3FBackground from '../Common/R3FBackground';

/* ── Mouse-tracking 3D Mask in its own Canvas ── */
function MaskMesh() {
  const outerRef = useRef();
  const innerRef = useRef();
  useFrame((state) => {
    if (!outerRef.current) return;
    const { x, y } = state.mouse;
    outerRef.current.rotation.y = x * 0.6;
    outerRef.current.rotation.x = -y * 0.4;
    if (innerRef.current) {
      innerRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={outerRef}>
        {/* Mask face */}
        <mesh castShadow>
          <octahedronGeometry args={[1.6, 0]} />
          <meshToonMaterial color="#1a1a1a" />
        </mesh>
        {/* Eye glow L */}
        <mesh position={[-0.5, 0.4, 1.1]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#B22222" emissive="#B22222" emissiveIntensity={3} />
        </mesh>
        {/* Eye glow R */}
        <mesh position={[0.5, 0.4, 1.1]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#B22222" emissive="#B22222" emissiveIntensity={3} />
        </mesh>
        {/* Outer ring */}
        <mesh ref={innerRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.2, 0.04, 16, 60]} />
          <meshToonMaterial color="#B22222" transparent opacity={0.5} />
        </mesh>
        {/* Second ring */}
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.8, 0.025, 16, 60]} />
          <meshToonMaterial color="#D1D5DB" transparent opacity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Hero() {
  return (
    <section
      className="snap-section hero-section"
      style={{
        flexDirection: 'row',
        gap: '4rem',
        justifyContent: 'center',
      }}
    >


      {/* R3F sparkles / stars in background */}
      <ErrorBoundary fallback={null}>
        <R3FBackground variant="hero" />
      </ErrorBoundary>

      {/* CSS ember particles */}
      <Particles count={35} />
      <div className="grid-bg" />
      <div className="vignette" />
      <div className="section-label">MODULE_01 // THE DESCENT</div>

      {/* ── Text Side ── */}
      <motion.div
        className="content-layer"
        style={{ maxWidth: 520, flex: 1, zIndex: 10 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div style={{ marginBottom: '0.6rem' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.5em', color: 'var(--crimson)', fontFamily: 'var(--font-mono)' }}>
            STEALTH_MODE: ACTIVE
          </span>
        </div>

        <h1 className="hero-title" style={{ marginBottom: '0.4rem' }}>
          <span className="glitch-container" data-text="TANJIL">TANJIL</span>
        </h1>
        <h1 className="hero-title" style={{ marginBottom: '2rem' }}>
          <span className="accent">ALAM</span>
        </h1>

        <p style={{ fontSize: '0.7rem', letterSpacing: '0.4em', color: 'var(--steel-dim)', marginBottom: '2.5rem', fontFamily: 'var(--font-mono)' }}>
          SOFTWARE ENGINEER&nbsp;&nbsp;//&nbsp;&nbsp;AI–ML ARCHITECT
        </p>

        <motion.div
          className="glass-panel cel-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <p style={{ fontSize: '0.78rem', lineHeight: 1.8, color: 'var(--steel-dim)', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--crimson)', fontWeight: 700 }}>$ STATUS:</span>&nbsp;
            3rd‑year B.Tech student with an 8.6 CGPA. Proactive developer
            specializing in MERN &amp; Next.js. I architect systems that
            operate in the shadows of technical complexity — fast, precise,
            and invisible until deployed.
          </p>
        </motion.div>

        <motion.div
          className="hero-btns"
          style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button className="btn-primary" onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}>
            COMMENCE_MISSION
          </button>
          <button className="btn-ghost" onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}>
            SILENT_EXIT
          </button>
        </motion.div>
      </motion.div>

      {/* ── 3D Mask Canvas ── */}
      <motion.div
        className="content-layer hero-mask-canvas"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        style={{ width: 320, height: 320, zIndex: 10, flexShrink: 0 }}
      >
        <ErrorBoundary fallback={
          <div style={{ width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Fallback SVG mask if 3D fails */}
            <svg viewBox="0 0 220 260" width="220" height="260" fill="none" style={{ filter: 'drop-shadow(0 0 20px rgba(178,34,34,0.7))' }}>
              <ellipse cx="110" cy="130" rx="85" ry="110" fill="#1a1a1a" stroke="#B22222" strokeWidth="2" />
              <ellipse cx="78" cy="105" rx="10" ry="4" fill="#B22222" opacity="0.9" />
              <ellipse cx="142" cy="105" rx="10" ry="4" fill="#B22222" opacity="0.9" />
              <ellipse cx="110" cy="130" rx="100" ry="120" fill="none" stroke="rgba(178,34,34,0.3)" strokeWidth="1" strokeDasharray="6 4" />
            </svg>
          </div>
        }>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent', width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={3} color="#B22222" />
            <pointLight position={[-3, -3, 3]} intensity={1.5} color="#D1D5DB" />
            <Suspense fallback={null}>
              <MaskMesh />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </motion.div>
    </section>
  );
}
