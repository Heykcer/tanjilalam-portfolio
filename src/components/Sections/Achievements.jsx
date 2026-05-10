import React from 'react';
import { motion } from 'framer-motion';
import ErrorBoundary from '../Common/ErrorBoundary';
import Particles from '../Common/Particles';
import R3FBackground from '../Common/R3FBackground';

const achievements = [
  {
    rank: '1ST',
    title: 'GEC HACKATHON',
    year: '2026',
    type: 'crimson-coin',
    textColor: '#B22222',
    detail: 'Champions // Innovation Category',
    org: 'Gandhi Engineering College, Bhubaneswar',
  },
  {
    rank: '2ND',
    title: 'INFIAI HACKATHON',
    year: '2026',
    type: 'steel-coin',
    textColor: '#D1D5DB',
    detail: 'Runner Up // AI Architecture',
    org: 'IETE, Bhubaneswar',
  },
];

export default function Achievements() {
  return (
    <section
      className="snap-section"
      id="achievements"
      style={{
        flexDirection: 'column',
        gap: '4rem',
      }}
    >


      <ErrorBoundary fallback={null}>
        <R3FBackground variant="achievements" />
      </ErrorBoundary>

      <Particles count={30} />
      <div className="grid-bg" />
      <div className="vignette" />
      <div className="section-label">MODULE_05 // HALL OF MERIT</div>

      <motion.h2
        className="content-layer"
        style={{ fontSize: '3.5rem', letterSpacing: '0.15em', textAlign: 'center', zIndex: 10 }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        HALL OF <span style={{ color: 'var(--crimson)', textShadow: '0 0 20px var(--crimson)' }}>MERIT</span>
      </motion.h2>

      <motion.div
        className="content-layer"
        style={{ display: 'flex', gap: '5rem', flexWrap: 'wrap', justifyContent: 'center', zIndex: 10 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {achievements.map((item, idx) => (
          <motion.div
            key={idx}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', cursor: 'pointer' }}
            whileHover={{ scale: 1.06 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
          >
            <div className={`signet-coin ${item.type}`}>
              <span style={{ color: '#050505', fontSize: '1.6rem', fontFamily: 'var(--font-head)', fontWeight: 800, zIndex: 1 }}>
                {item.rank}
              </span>
            </div>

            <div
              className="glass-panel"
              style={{
                border: `1px solid ${item.textColor}30`,
                boxShadow: `6px 6px 0 ${item.textColor}`,
                minWidth: 260,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-head)', color: item.textColor, marginBottom: '0.5rem' }}>
                {item.rank}
              </div>
              <h3 style={{ fontSize: '1rem', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>{item.title} — {item.year}</h3>
              <p style={{ fontSize: '0.6rem', color: 'var(--steel-dim)', letterSpacing: '0.3em' }}>{item.detail}</p>
              <p style={{ fontSize: '0.55rem', color: 'rgba(209,213,219,0.3)', marginTop: '0.75rem', letterSpacing: '0.1em' }}>{item.org}</p>
              <div style={{ height: 1, background: `${item.textColor}50`, margin: '1.2rem 0 0' }} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
