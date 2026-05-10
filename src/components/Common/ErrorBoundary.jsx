import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div style={{
            color: '#B22222',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            padding: '2rem',
            border: '1px solid #B22222',
            background: 'rgba(178,34,34,0.05)',
          }}>
            [SYSTEM_ERROR] {this.state.error?.message || 'Unknown failure.'}
          </div>
        )
      );
    }
    return this.props.children;
  }
}
