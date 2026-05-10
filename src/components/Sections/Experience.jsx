import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ErrorBoundary from '../Common/ErrorBoundary';
import R3FBackground from '../Common/R3FBackground';

const timeline = [
  {
    side: 'left',
    period: '2024 – 2028',
    org: 'GANDHI ENGINEERING COLLEGE',
    role: 'B.Tech CSE (AI/ML) // 8.6 CGPA',
    detail: 'Specializing in intelligent systems, deep learning, and scalable architectures. Consistently top-tier academic performance.',
    type: 'EDU',
  },
  {
    side: 'right',
    period: 'JAN 2026 – PRESENT',
    org: 'UPTOSKILLS',
    role: 'MERN Stack Intern // AI-Mentor Platform',
    detail: 'Engineering an AI-powered mentorship platform. Led front-end development, implemented real-time features, and integrated machine learning APIs.',
    type: 'INT',
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setProgress(entry.intersectionRatio * 100);
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="snap-section"
      id="experience"
      ref={sectionRef}
      style={{
        flexDirection: 'column',
        gap: '3rem',
      }}
    >


      <ErrorBoundary fallback={null}>
        <R3FBackground variant="experience" />
      </ErrorBoundary>

      <div className="grid-bg" />
      <div className="vignette" />
      <div className="section-label">MODULE_04 // THE ORDER'S LEDGER</div>

      <motion.h2
        className="content-layer"
        style={{ fontSize: '3rem', letterSpacing: '0.15em', textAlign: 'center', zIndex: 10 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        THE ORDER'S <span style={{ color: 'var(--crimson)', textShadow: '0 0 12px var(--crimson)' }}>LEDGER</span>
      </motion.h2>

      <div className="content-layer" style={{ position: 'relative', width: '100%', maxWidth: 900, zIndex: 10 }}>
        <div className="timeline-track">
          <div className="glow-fill" style={{ height: `${Math.min(progress * 1.8, 100)}%` }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              className={`timeline-item ${item.side}`}
              initial={{ opacity: 0, x: item.side === 'left' ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.7 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              <div className="timeline-dot" />
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.4em', color: 'var(--crimson)', fontFamily: 'var(--font-mono)' }}>
                {item.period}
              </span>
              <div style={{
                display: 'inline-block',
                padding: '0.2rem 0.8rem',
                background: 'rgba(178,34,34,0.15)',
                borderLeft: '2px solid var(--crimson)',
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                color: 'var(--crimson)',
                marginBottom: '0.25rem',
                width: 'fit-content',
              }}>
                {item.type}
              </div>
              <h3 style={{ fontSize: '1.2rem', letterSpacing: '0.1em' }}>{item.org}</h3>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--steel)', letterSpacing: '0.05em' }}>{item.role}</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--steel-dim)', lineHeight: 1.7, fontFamily: 'var(--font-mono)', marginTop: '0.5rem' }}>
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
