import React from 'react';
import { X, Download, Copy, ExternalLink, Check } from 'lucide-react';

export default function ImageLightbox({ image, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!image) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(image.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `spring-ai-${Date.now()}.jpg`;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.click();
  };

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="lightbox-image-container">
          <img src={image.url} alt={image.prompt || 'Generated AI Art'} className="lightbox-img" />
        </div>

        <div className="lightbox-details">
          <div className="lightbox-info">
            <span className="lightbox-badge">DALL-E 3 Style</span>
            <h3 className="lightbox-prompt">"{image.prompt || 'Generated Creation'}"</h3>
            <p className="lightbox-meta">
              Quality: <strong>{image.quality || 'HD'}</strong> • Dimensions: <strong>{image.dimensions || '1024x1024'}</strong>
            </p>
          </div>

          <div className="lightbox-actions">
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied' : 'Copy URL'}</span>
            </button>
            <a href={image.url} target="_blank" rel="noreferrer" className="btn-secondary">
              <ExternalLink size={16} />
              <span>Full Size</span>
            </a>
            <button className="btn-primary" onClick={handleDownload}>
              <Download size={16} />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
