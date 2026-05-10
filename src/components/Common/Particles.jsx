import React, { useMemo } from 'react';

export default function Particles({ count = 30 }) {
  const particles = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 8}s`,
      opacity: Math.random() * 0.7 + 0.2,
    }))
  ), [count]);

  return (
    <div className="particles" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.width,
            height: p.height,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
