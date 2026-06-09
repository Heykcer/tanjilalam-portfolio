import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '../Common/ErrorBoundary';
import Particles from '../Common/Particles';
import R3FBackground from '../Common/R3FBackground';

const projects = [
  {
    id: 'MISSION_01',
    title: 'PARK VISITOR PLATFORM',
    tech: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Razorpay'],
    desc: 'A high-performance full-stack reservation system featuring real-time booking management and secure payment integration. Architected for speed and reliability. Deployed on Vercel with high-availability and responsive design across all devices.',
  },
  {
    id: 'MISSION_02',
    title: 'DECISION-IQ',
    tech: ['React', 'Tailwind CSS', 'Express.js', 'D3.js'],
    desc: 'Interactive web interface focusing on mission-critical UI/UX logic and data visualization. Implemented reusable component libraries to accelerate development cycles and ensure design consistency at scale.',
  },
];

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      className="snap-section"
      id="projects"
      style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >


      <ErrorBoundary fallback={null}>
        <R3FBackground variant="projects" />
      </ErrorBoundary>

      <Particles count={20} />
      <div className="grid-bg" />
      <div className="vignette" />
      <div className="section-label">MODULE_03 // MISSION SCROLLS</div>

      <div className="content-layer projects-content" style={{ width: '100%', maxWidth: 800, zIndex: 10 }}>
        <motion.h2
          style={{ fontSize: '3rem', letterSpacing: '0.15em', marginBottom: '3.5rem' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          MISSION <span style={{ color: 'var(--crimson)', textShadow: '0 0 12px var(--crimson)' }}>SCROLLS</span>
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              className="mission-scroll"
              onClick={() => setSelected(selected === idx ? null : idx)}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="mission-id">{proj.id} &nbsp;// CLICK TO DECRYPT</div>
              <h3 style={{ fontSize: '1.6rem', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
                {proj.title}
              </h3>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                {proj.tech.map(t => (
                  <span key={t} className="skill-tag" style={{ borderColor: 'rgba(178,34,34,0.3)', color: 'var(--crimson)', fontSize: '0.55rem' }}>
                    {t}
                  </span>
                ))}
              </div>

              <AnimatePresence>
                {selected === idx && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--steel-dim)',
                      lineHeight: 1.8,
                      borderLeft: '2px solid var(--crimson)',
                      paddingLeft: '1.2rem',
                      marginTop: '1rem',
                      overflow: 'hidden',
                    }}
                  >
                    <span style={{ color: 'var(--crimson)' }}>&gt;&gt;&nbsp;</span>
                    {proj.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
