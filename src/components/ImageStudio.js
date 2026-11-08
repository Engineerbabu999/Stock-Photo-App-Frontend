import React, { useState } from 'react';
import { generateImagesAsList, generateSingleImage } from '../services/api';
import { Sparkles, Sliders, Maximize2, RefreshCw, Eye, Layers } from 'lucide-react';

const PRESET_PROMPTS = [
  'Futuristic cyberpunk city bathed in rain and neon lights',
  'Majestic golden retriever puppy resting in golden hour sunlight',
  'Misty Alpine mountain lake surrounded by pine forests at dawn',
  'Deep cosmic spiral galaxy nebula with iridescent stellar dust',
  'Artisan matcha latte with intricate swan foam art in ceramic cup',
  'Cinematic portrait of a cyberpunk android with glowing cyan circuit lines'
];

const INITIAL_GALLERY = [
  {
    id: 'init-1',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=85',
    prompt: 'Futuristic cyberpunk city bathed in rain and neon lights',
    quality: 'HD',
    dimensions: '1024x1024',
    timestamp: 'Just now'
  },
  {
    id: 'init-2',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=85',
    prompt: 'Misty Alpine mountain lake surrounded by pine forests at dawn',
    quality: 'HD',
    dimensions: '1024x1024',
    timestamp: 'Just now'
  },
  {
    id: 'init-3',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&auto=format&fit=crop&q=85',
    prompt: 'Playful domestic cat portrait with emerald green eyes',
    quality: 'HD',
    dimensions: '1024x1024',
    timestamp: 'Just now'
  },
  {
    id: 'init-4',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=85',
    prompt: 'Deep cosmic spiral galaxy nebula with glowing stars',
    quality: 'HD',
    dimensions: '1024x1024',
    timestamp: 'Just now'
  }
];

export default function ImageStudio({ onSelectImage }) {
  const [prompt, setPrompt] = useState('');
  const [quality, setQuality] = useState('hd');
  const [n, setN] = useState(2);
  const [dimension, setDimension] = useState('1024x1024');
  const [apiMode, setApiMode] = useState('list'); // 'list' or 'single'
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    const [width, height] = dimension.split('x').map(Number);

    try {
      if (apiMode === 'single') {
        const res = await generateSingleImage(prompt);
        if (res.url) {
          const newImg = {
            id: `img-${Date.now()}`,
            url: res.url,
            prompt,
            quality: 'HD',
            dimensions: '1024x1024',
            timestamp: new Date().toLocaleTimeString(),
            raw: res.raw
          };
          setGallery((prev) => [newImg, ...prev]);
        }
      } else {
        const urls = await generateImagesAsList(prompt, { quality, n, width, height });
        const newImages = urls.map((url, idx) => ({
          id: `img-${Date.now()}-${idx}`,
          url,
          prompt,
          quality: quality.toUpperCase(),
          dimensions: dimension,
          timestamp: new Date().toLocaleTimeString()
        }));
        setGallery((prev) => [...newImages, ...prev]);
      }
    } catch (err) {
      console.error(err);
      setError(`Generation failed: ${err.message}. Please check backend connection.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="studio-view">
      {/* Studio Header & Generator Panel */}
      <div className="generator-card glass-panel">
        <div className="generator-top">
          <div className="generator-title-group">
            <div className="icon-badge">
              <Sparkles size={20} className="icon-glow" />
            </div>
            <div>
              <h2 className="section-title">Generative Photo Studio</h2>
              <p className="section-subtitle">
                Synthesize photorealistic visual art using DALL-E 3 neural architecture
              </p>
            </div>
          </div>

          <div className="api-mode-selector">
            <span className="mode-label">Mode:</span>
            <button
              className={`mode-toggle-btn ${apiMode === 'list' ? 'active' : ''}`}
              onClick={() => setApiMode('list')}
              title="Batch Multi-Image Generation"
            >
              <Layers size={13} />
              <span>Batch ({n}x)</span>
            </button>
            <button
              className={`mode-toggle-btn ${apiMode === 'single' ? 'active' : ''}`}
              onClick={() => setApiMode('single')}
              title="Single High-Res Render"
            >
              <span>Single DTO</span>
            </button>
          </div>
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleGenerate} className="prompt-form">
          <div className="prompt-input-wrapper">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your creative vision in vivid, cinematic detail..."
              className="prompt-input"
              disabled={loading}
            />
            <div className="prompt-actions-row">
              <button
                type="button"
                className={`settings-toggle-btn ${showSettings ? 'open' : ''}`}
                onClick={() => setShowSettings(!showSettings)}
                title="Configure parameters"
              >
                <Sliders size={18} />
              </button>
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="generate-btn"
              >
                {loading ? (
                  <>
                    <RefreshCw size={17} className="spin-icon" />
                    <span className="btn-text">Rendering...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    <span className="btn-text">Generate Visual</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Inspiration Chips */}
          <div className="preset-chips-scroll">
            <span className="preset-label">Trending:</span>
            <div className="preset-chips">
              {PRESET_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="preset-chip"
                  onClick={() => setPrompt(p)}
                >
                  {p.length > 34 ? p.slice(0, 34) + '...' : p}
                </button>
              ))}
            </div>
          </div>

          {/* Collapsible Advanced Parameters */}
          {showSettings && (
            <div className="settings-drawer animate-fade">
              <div className="settings-grid">
                <div className="setting-group">
                  <label>Render Quality</label>
                  <div className="setting-options">
                    <button
                      type="button"
                      className={`opt-btn ${quality === 'standard' ? 'active' : ''}`}
                      onClick={() => setQuality('standard')}
                    >
                      Standard
                    </button>
                    <button
                      type="button"
                      className={`opt-btn ${quality === 'hd' ? 'active' : ''}`}
                      onClick={() => setQuality('hd')}
                    >
                      Ultra HD
                    </button>
                  </div>
                </div>

                <div className="setting-group">
                  <label>Aspect Ratio & Resolution</label>
                  <select
                    value={dimension}
                    onChange={(e) => setDimension(e.target.value)}
                    className="select-input"
                  >
                    <option value="1024x1024">Square 1:1 (1024x1024)</option>
                    <option value="1024x1792">Portrait 9:16 (1024x1792)</option>
                    <option value="1792x1024">Landscape 16:9 (1792x1024)</option>
                  </select>
                </div>

                {apiMode === 'list' && (
                  <div className="setting-group">
                    <label>Batch Size: {n} {n === 1 ? 'image' : 'images'}</label>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={n}
                      onChange={(e) => setN(Number(e.target.value))}
                      className="range-input"
                    />
                    <div className="range-marks">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </form>

        {error && <div className="error-banner">{error}</div>}
      </div>

      {/* Gallery Section */}
      <div className="gallery-section">
        <div className="gallery-header">
          <div>
            <h3 className="gallery-title">Asset Portfolio</h3>
            <span className="gallery-count">{gallery.length} visual assets</span>
          </div>
        </div>

        <div className="gallery-grid">
          {gallery.map((img) => (
            <div
              key={img.id}
              className="gallery-card"
              onClick={() => onSelectImage(img)}
            >
              <div className="image-wrapper">
                <img src={img.url} alt={img.prompt} loading="lazy" />
                
                {/* Desktop Hover Overlay */}
                <div className="card-overlay desktop-only">
                  <div className="overlay-top">
                    <span className="badge-quality">{img.quality || 'HD'}</span>
                    <span className="badge-dim">{img.dimensions}</span>
                  </div>
                  <div className="overlay-bottom">
                    <p className="card-prompt">"{img.prompt}"</p>
                    <div className="card-actions">
                      <button
                        className="card-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectImage(img);
                        }}
                        title="View Fullscreen"
                      >
                        <Maximize2 size={16} />
                      </button>
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noreferrer"
                        className="card-action-btn"
                        onClick={(e) => e.stopPropagation()}
                        title="Open Source"
                      >
                        <Eye size={16} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Mobile Bottom Badge Card (Visible on mobile where hover doesn't exist) */}
                <div className="mobile-card-bar mobile-only">
                  <span className="mobile-prompt-text">"{img.prompt}"</span>
                  <div className="mobile-bar-actions">
                    <span className="badge-dim">{img.dimensions}</span>
                    <Maximize2 size={15} className="mobile-action-icon" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
