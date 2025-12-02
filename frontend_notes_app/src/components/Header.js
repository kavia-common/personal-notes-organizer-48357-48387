import React from 'react';

// PUBLIC_INTERFACE
export default function Header({ theme, onToggleTheme, envInfo }) {
  /** App header with title, theme switch, and optional environment info. */
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true" />
        <h1 className="app-title">Ocean Notes</h1>
      </div>
      <div className="header-actions">
        {envInfo && (
          <span className="env-pill" title="Runtime environment">
            {envInfo}
          </span>
        )}
        <button
          className="btn theme-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}
