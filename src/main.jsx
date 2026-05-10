import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const rootEl = document.getElementById('root');

try {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (err) {
  console.error('[FATAL] Root render failed:', err);
  rootEl.innerHTML = `
    <div style="
      background:#050505;
      color:#B22222;
      font-family:'Courier New',monospace;
      font-size:0.75rem;
      padding:3rem;
      height:100vh;
      display:flex;
      flex-direction:column;
      gap:1rem;
    ">
      <h2 style="font-size:1.5rem;letter-spacing:4px;">[SYSTEM_FAILURE]</h2>
      <pre style="color:#D1D5DB;white-space:pre-wrap;">${err.message}\n\n${err.stack}</pre>
    </div>
  `;
}
