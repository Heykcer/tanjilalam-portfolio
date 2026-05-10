import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '../Common/ErrorBoundary';
import R3FBackground from '../Common/R3FBackground';

export default function Footer() {
  const [isModalOpen, setModalOpen] = useState(false);
  const bounty = 1337 + Math.floor(Date.now() / 1000000) % 500;

  return (
    <footer
      className="snap-section"
      id="footer"
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '5rem',
        paddingBottom: '3rem',
      }}
    >


      <ErrorBoundary fallback={null}>
        <R3FBackground variant="default" />
      </ErrorBoundary>

      <div className="hud-bounty">BOUNTY_COUNT: {bounty.toLocaleString()} CONFIRMED</div>
      <div className="vignette" />
      <div className="grid-bg" />
      <div className="section-label">THE SILENT EXIT</div>

      {/* Header */}
      <div className="content-layer" style={{ textAlign: 'center', marginBottom: '3rem', zIndex: 10 }}>
        <h2 style={{ fontSize: '2.5rem', letterSpacing: '1em', color: 'rgba(209,213,219,0.25)' }}>COMMAND CENTER</h2>
        <div style={{ width: 120, height: 1, background: 'var(--crimson)', margin: '1.5rem auto', boxShadow: '0 0 8px var(--crimson)' }} />
      </div>

      {/* CTA Buttons */}
      <div
        className="content-layer"
        style={{ display: 'flex', gap: '5rem', justifyContent: 'center', alignItems: 'flex-start', marginBottom: '5rem', flexWrap: 'wrap', zIndex: 10 }}
      >
        <div className="footer-btn seal" role="button" tabIndex={0} onClick={() => setModalOpen(true)} onKeyDown={e => e.key === 'Enter' && setModalOpen(true)}>
          <motion.div className="icon-wrap" whileHover={{ boxShadow: '0 0 30px var(--crimson)' }}>
            ✉
          </motion.div>
          <label style={{ color: 'var(--crimson)', letterSpacing: '0.5em' }}>SEAL_CONTRACT</label>
        </div>

        <a className="footer-btn blade" href="#" aria-label="Download Resume">
          <motion.div className="icon-wrap" whileHover={{ boxShadow: '0 0 20px var(--steel)' }}>
            <span>⚔</span>
          </motion.div>
          <label style={{ color: 'var(--steel-dim)', letterSpacing: '0.5em' }}>STEEL_RESUME</label>
        </a>
      </div>

      {/* Bottom bar */}
      <div
        className="content-layer"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1000,
          borderTop: '1px solid rgba(209,213,219,0.07)',
          paddingTop: '2rem',
          flexWrap: 'wrap',
          gap: '1.5rem',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="https://github.com/heykcer" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">GH</a>
          <a href="https://linkedin.com/in/tanjilalam" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">IN</a>
          <a href="mailto:mdtanjilalam69@gmail.com" className="social-link" aria-label="Email">@</a>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(209,213,219,0.3)' }}>
            © 2026 TANJIL ALAM // ALL PROTOCOLS SECURED
          </p>
          <p style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(246, 247, 248, 0.15)', marginTop: '0.3rem' }}>
            STAY SILENT. STAY SHARP.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: 'palegreen',
            boxShadow: '0 0 8px var(--crimson)',
            animation: 'pulse-glow 2s infinite',
          }} />
          <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'var(--crimson)' }}>
            AVAILABLE_FOR_HIRE
          </span>
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setModalOpen(false)}
          >
            <motion.div
              className="modal-box"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', letterSpacing: '0.2em', color: 'var(--crimson)' }}>
                  TRANSMIT INTEL
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{ background: 'none', border: '1px solid rgba(209,213,219,0.2)', color: 'var(--steel-dim)', width: 36, height: 36, fontSize: '1rem', cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--crimson)'; e.currentTarget.style.color = 'var(--crimson)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(209,213,219,0.2)'; e.currentTarget.style.color = 'var(--steel-dim)'; }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={e => { e.preventDefault(); setModalOpen(false); }}>
                <div className="form-field">
                  <label>IDENTIFIER</label>
                  <input type="text" placeholder="NAME // ORGANIZATION" />
                </div>
                <div className="form-field">
                  <label>ENCRYPTION CHANNEL</label>
                  <input type="email" placeholder="EMAIL ADDRESS" required />
                </div>
                <div className="form-field">
                  <label>PAYLOAD</label>
                  <textarea placeholder="MESSAGE CONTENT..." required />
                </div>
                <button className="btn-primary" type="submit" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                  DISPATCH SIGNAL
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
