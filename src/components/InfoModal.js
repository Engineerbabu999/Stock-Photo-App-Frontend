import React from 'react';
import { X, CheckCircle, Cpu, Zap, Radio, Server } from 'lucide-react';

export default function InfoModal({ backendStatus, onClose }) {
  const isOnline = backendStatus?.status === 'ONLINE';

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="info-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="info-modal-header">
          <div className="icon-badge">
            <Cpu size={22} />
          </div>
          <div>
            <h2 className="section-title">AI Engine Architecture</h2>
            <p className="section-subtitle">Spring AI Studio System Diagnostics</p>
          </div>
          <button className="lightbox-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="info-modal-content">
          {/* Status Metric Grid */}
          <div className="metrics-grid">
            <div className="metric-box">
              <div className="metric-icon">
                <Zap size={18} />
              </div>
              <div>
                <span className="metric-label">Neural Engine</span>
                <div className="metric-val">GPT-4o & DALL-E 3</div>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-icon">
                <Server size={18} />
              </div>
              <div>
                <span className="metric-label">Backend Gateway</span>
                <div className="metric-val">Spring AI 2.0.1</div>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-icon">
                <Radio size={18} />
              </div>
              <div>
                <span className="metric-label">Gateway Status</span>
                <div className="metric-val text-emerald">{isOnline ? 'Operational (100%)' : 'Connecting...'}</div>
              </div>
            </div>
          </div>

          {/* Endpoints Table */}
          <div className="info-section">
            <h4 className="info-section-title">Verified Active Endpoints</h4>
            <div className="endpoint-list">
              <div className="endpoint-item">
                <span className="badge-get">GET</span>
                <code>/ask-ai</code>
                <span className="endpoint-desc">Standard AI Reasoning & Code Synthesis</span>
                <CheckCircle size={16} className="text-emerald" />
              </div>
              <div className="endpoint-item">
                <span className="badge-get">GET</span>
                <code>/ask-ai-options</code>
                <span className="endpoint-desc">Dynamic Parameter & Persona Stream</span>
                <CheckCircle size={16} className="text-emerald" />
              </div>
              <div className="endpoint-item">
                <span className="badge-get">GET</span>
                <code>/generate-image</code>
                <span className="endpoint-desc">Single DALL-E 3 ImageResponse DTO</span>
                <CheckCircle size={16} className="text-emerald" />
              </div>
              <div className="endpoint-item">
                <span className="badge-get">GET</span>
                <code>/generate-images-as-list</code>
                <span className="endpoint-desc">Batch Generation with Custom Dimensions</span>
                <CheckCircle size={16} className="text-emerald" />
              </div>
              <div className="endpoint-item">
                <span className="badge-get">GET</span>
                <code>/redirect-generated-image</code>
                <span className="endpoint-desc">Direct HTTP 302 Visual Stream</span>
                <CheckCircle size={16} className="text-emerald" />
              </div>
              <div className="endpoint-item">
                <span className="badge-get">GET</span>
                <code>/recipe-creator</code>
                <span className="endpoint-desc">Prompt-Engineered Gourmet Synthesizer</span>
                <CheckCircle size={16} className="text-emerald" />
              </div>
            </div>
          </div>
        </div>

        <div className="info-modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Back to Studio
          </button>
        </div>
      </div>
    </div>
  );
}
