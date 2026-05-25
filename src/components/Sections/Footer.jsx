import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '../Common/ErrorBoundary';
import R3FBackground from '../Common/R3FBackground';
import emailjs from '@emailjs/browser';

export default function Footer() {
  // Stable bounty count — recalculates only once per mount
  const bounty = useMemo(() => 1337 + Math.floor(Date.now() / 1000000) % 500, []);

  // Modal visibility — starts closed
  const [modalOpen, setModalOpen] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    identifier: '',
    email: '',
    payload: ''
  });

  const [isSending, setIsSending] = useState(false);

  // In-form error/success feedback (replaces alert())
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Close button hover state (replaces inline style hacks)
  const [closeBtnHovered, setCloseBtnHovered] = useState(false);

  // Dynamically update state when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus) setSubmitStatus(null); // clear status on new input
  };

  // Handle form submission via EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus(null);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      name_org: formData.identifier,
      email: formData.email,
      message: formData.payload,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSending(false);
        setFormData({ identifier: '', email: '', payload: '' });
        setSubmitStatus('success');
        // Auto-close modal after a short delay so user sees the success message
        setTimeout(() => {
          setModalOpen(false);
          setSubmitStatus(null);
        }, 2000);
      })
      .catch((error) => {
        console.error('FAILED TO TRANSMIT:', error);
        setIsSending(false);
        setSubmitStatus('error');
      });
  };

  const handleOpenModal = () => {
    setSubmitStatus(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSubmitStatus(null);
  };

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
        <div
          className="footer-btn seal"
          role="button"
          tabIndex={0}
          onClick={handleOpenModal}
          onKeyDown={e => e.key === 'Enter' && handleOpenModal()}
        >
          <motion.div className="icon-wrap" whileHover={{ boxShadow: '0 0 30px var(--crimson)' }}>
            ✉
          </motion.div>
          <label style={{ color: 'var(--crimson)', letterSpacing: '0.5em' }}>SEAL_CONTRACT</label>
        </div>

        <a className="footer-btn blade" href="/TanjilAlamResume-April2026.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download Resume">
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
          <p style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(246,247,248,0.15)', marginTop: '0.3rem' }}>
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
        {modalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && handleCloseModal()}
          >
            <motion.div
              className="modal-box"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', letterSpacing: '0.2em', color: 'var(--crimson)' }}>
                  TRANSMIT INTEL
                </h3>
                <button
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                  onMouseEnter={() => setCloseBtnHovered(true)}
                  onMouseLeave={() => setCloseBtnHovered(false)}
                  style={{
                    background: 'none',
                    border: `1px solid ${closeBtnHovered ? 'var(--crimson)' : 'rgba(209,213,219,0.2)'}`,
                    color: closeBtnHovered ? 'var(--crimson)' : 'var(--steel-dim)',
                    width: 36, height: 36, fontSize: '1rem', cursor: 'pointer',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Transmission Intel Form */}
              <form onSubmit={handleSubmit}>

                <div className="form-field">
                  <label htmlFor="identifier">IDENTIFIER</label>
                  <input
                    id="identifier"
                    type="text"
                    name="identifier"
                    placeholder="NAME // ORGANIZATION"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">ENCRYPTION CHANNEL</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="EMAIL ADDRESS"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="payload">PAYLOAD</label>
                  <textarea
                    id="payload"
                    name="payload"
                    placeholder="MESSAGE CONTENT..."
                    value={formData.payload}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Inline status feedback */}
                {submitStatus === 'success' && (
                  <p style={{ color: 'palegreen', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '1rem', textAlign: 'center' }}>
                    ✓ SIGNAL DISPATCHED SUCCESSFULLY
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p style={{ color: 'var(--crimson)', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '1rem', textAlign: 'center' }}>
                    ✕ TRANSMISSION FAILED — CHECK CONNECTION CONFIG
                  </p>
                )}

                <button
                  className="btn-primary"
                  type="submit"
                  disabled={isSending}
                  style={{ width: '100%', display: 'block', textAlign: 'center' }}
                >
                  {isSending ? 'DISPATCHING SIGNAL...' : 'DISPATCH SIGNAL'}
                </button>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
