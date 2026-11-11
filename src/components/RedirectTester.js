import React, { useState } from 'react';
import { getRedirectImageUrl } from '../services/api';
import { ExternalLink, Sparkles, Compass, RefreshCw, Eye } from 'lucide-react';

const REDIRECT_PRESETS = [
  'Misty Alpine mountain reflection',
  'Tokyo cyberpunk illuminated rain',
  'Adorable fluffy kitten with big blue eyes',
  'Gourmet glazed salmon fillet on ceramic plate',
  'Vibrant interstellar cosmic nebula stars'
];

export default function RedirectTester() {
  const [prompt, setPrompt] = useState('Misty Alpine mountain reflection');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const redirectUrl = getRedirectImageUrl(prompt);

  const handleTestRedirect = () => {
    setLoading(true);
    setPreviewUrl(null);

    setTimeout(() => {
      setPreviewUrl(getRedirectImageUrl(prompt) + `&t=${Date.now()}`);
      setLoading(false);
    }, 350);
  };

  const handleOpenNewTab = () => {
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="redirect-tester-container glass-panel">
      <div className="redirect-header">
        <div className="icon-badge redirect-badge">
          <Compass size={22} />
        </div>
        <div>
          <h2 className="section-title">Direct Image Streaming & Redirect</h2>
          <p className="section-subtitle">
            Validating Spring Boot HTTP 302 endpoint: <code>/redirect-generated-image</code>
          </p>
        </div>
      </div>

      <div className="redirect-explanation">
        <p>
          This endpoint issues an immediate HTTP 302 redirect directly to the generated visual asset. It allows web applications, mobile apps, and HTML <code>&lt;img&gt;</code> tags to stream dynamic AI assets directly without intermediary client parsing!
        </p>
      </div>

      <div className="redirect-form-group">
        <label className="form-label">Stream Prompt</label>
        <div className="prompt-input-wrapper">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter image description..."
            className="prompt-input"
          />
          <div className="prompt-actions-row">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleTestRedirect}
              disabled={!prompt.trim() || loading}
            >
              {loading ? <RefreshCw size={16} className="spin-icon" /> : <Eye size={16} />}
              <span>Preview Stream</span>
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={handleOpenNewTab}
              disabled={!prompt.trim()}
            >
              <ExternalLink size={16} />
              <span>Open Direct Link</span>
            </button>
          </div>
        </div>

        <div className="preset-chips-scroll">
          <span className="preset-label">Suggestions:</span>
          <div className="preset-chips">
            {REDIRECT_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="preset-chip"
                onClick={() => {
                  setPrompt(p);
                  setPreviewUrl(getRedirectImageUrl(p) + `&t=${Date.now()}`);
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="redirect-live-container">
        <div className="live-url-display">
          <span className="endpoint-method">GET 302</span>
          <code className="endpoint-url">{redirectUrl}</code>
        </div>

        <div className="redirect-preview-box">
          {previewUrl ? (
            <div className="redirect-image-frame">
              <img
                src={previewUrl}
                alt={prompt}
                className="redirect-result-img"
                onLoad={() => setLoading(false)}
              />
              <div className="redirect-overlay">
                <span>Verified Stream • Redirected from Spring Boot 302</span>
              </div>
            </div>
          ) : (
            <div className="redirect-placeholder">
              <Sparkles size={32} />
              <p>Click "Preview Stream" or "Open Direct Link" to test browser forwarding</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
