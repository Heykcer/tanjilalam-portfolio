import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '../Common/ErrorBoundary';
import Particles from '../Common/Particles';
import R3FBackground from '../Common/R3FBackground';

const arsenal = {
  'LVL_1: LANGUAGES': {
    icon: '⚔',
    skills: ['Java', 'Python', 'JavaScript', 'SQL', 'C', 'C#', 'C++'],
  },
  'LVL_2: FRAMEWORKS': {
    icon: '🛡',
    skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS'],
  },
  'LVL_3: TOOLS': {
    icon: '🗡',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Git/GitHub', 'Postman', 'Docker'],
  },
};

export default function Skills() {
  const [active, setActive] = useState(null);

  const handleTap = (key) => {
    // Toggle on tap — works on both mobile and desktop
    setActive((prev) => (prev === key ? null : key));
  };

  return (
    <section
      className="snap-section"
      id="skills"
      style={{
        flexDirection: 'column',
        gap: '3rem',
      }}
    >
      <ErrorBoundary fallback={null}>
        <R3FBackground variant="skills" />
      </ErrorBoundary>

      <Particles count={20} />
      <div className="grid-bg" />
      <div className="vignette" />
      <div className="section-label">MODULE_02 // THE ARSENAL</div>

      <motion.div
        className="content-layer"
        style={{ textAlign: 'center', zIndex: 10 }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 style={{ fontSize: '3.5rem', letterSpacing: '0.15em' }}>
          THE <span style={{ color: 'var(--crimson)', textShadow: '0 0 15px var(--crimson)' }}>ARSENAL</span>
        </h2>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.4em', color: 'var(--steel-dim)', marginTop: '0.5rem' }}>
          WEAPON_SYSTEM_STATUS: ACTIVE — TAP TO UNLOCK
        </p>
      </motion.div>

      <motion.div
        className="content-layer weapon-cases-row"
        style={{ display: 'flex', gap: '1.5rem', width: '100%', maxWidth: 900, zIndex: 10 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {Object.entries(arsenal).map(([key, { icon }]) => (
          <div
            key={key}
            className={`weapon-case ${active === key ? 'active' : ''}`}
            onMouseEnter={() => setActive(key)}
            onMouseLeave={() => setActive(null)}
            onClick={() => handleTap(key)}
          >
            <div className="case-label">{key.split(':')[0]}</div>
            <div className="case-title">{key.split(':')[1]?.trim() || key}</div>
            <div style={{ fontSize: '2rem', marginTop: '0.75rem', opacity: 0.6 }}>{icon}</div>
          </div>
        ))}
      </motion.div>

      <div className="content-layer" style={{ width: '100%', maxWidth: 900, minHeight: 120, zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="glass-panel cel-shadow"
            >
              <p style={{ fontSize: '0.55rem', letterSpacing: '0.4em', color: 'var(--crimson)', marginBottom: '1rem' }}>
                CLASSIFIED_EQUIPMENT: {active}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {arsenal[active].skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                fontSize: '0.7rem',
                color: 'rgba(209,213,219,0.2)',
                textAlign: 'center',
                letterSpacing: '0.3em',
                padding: '2rem',
              }}
            >
              [ TAP A CASE TO UNLOCK ARSENAL ]
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
