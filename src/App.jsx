import React from 'react';
import ErrorBoundary from './components/Common/ErrorBoundary';
import Hero from './components/Sections/Hero';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Experience from './components/Sections/Experience';
import Achievements from './components/Sections/Achievements';
import Footer from './components/Sections/Footer';

/* Floating Hire-Me beacon */
const HireBeacon = () => (
  <div className="hire-beacon">
    <div className="beacon-dot" />
    <span style={{ fontSize: '0.55rem', letterSpacing: '0.35em', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>
      AVAIL_FOR_HIRE
    </span>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      {/* Fixed anime background — never scrolls */}
      <div className="fixed-bg" aria-hidden="true" />
      <div className="fixed-bg-overlay" aria-hidden="true" />

      <HireBeacon />
      <main className="snap-container">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <Skills />
        </ErrorBoundary>
        <ErrorBoundary>
          <Projects />
        </ErrorBoundary>
        <ErrorBoundary>
          <Experience />
        </ErrorBoundary>
        <ErrorBoundary>
          <Achievements />
        </ErrorBoundary>
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </main>
    </ErrorBoundary>
  );
}
