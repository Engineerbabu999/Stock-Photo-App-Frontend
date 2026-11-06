import React, { useState } from 'react';
import { Sparkles, MessageSquare, Image as ImageIcon, Utensils, ExternalLink, Activity, Sliders, Menu, X } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, backendStatus, onOpenInfo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isOnline = backendStatus?.status === 'ONLINE';

  const navItems = [
    { id: 'gallery', label: 'Photo Studio', icon: ImageIcon },
    { id: 'chat', label: 'AI Reasoning', icon: MessageSquare },
    { id: 'recipe', label: 'Chef Studio', icon: Utensils },
    { id: 'redirect', label: 'Direct Stream', icon: ExternalLink }
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="studio-header">
        <div className="header-container">
          {/* Brand Logo & Name */}
          <div className="brand-section">
            <div className="brand-logo">
              <Sparkles className="brand-icon" size={22} />
            </div>
            <div>
              <div className="brand-title">
                <span>Spring AI</span> Studio
              </div>
              <div className="brand-subtitle">Enterprise Multimodal Intelligence</div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="nav-tabs desktop-only">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Header Controls & Status */}
          <div className="header-status-area">
            <div
              className={`status-pill ${isOnline ? 'online' : 'offline'}`}
              onClick={onOpenInfo}
              title="Click to view AI Engine specs"
            >
              <span className="status-dot"></span>
              <span className="status-label">{isOnline ? 'GPT-4o Engine Ready' : 'Connecting...'}</span>
            </div>

            <button
              className="info-btn desktop-only"
              onClick={onOpenInfo}
              title="Model & Engine Diagnostics"
            >
              <Sliders size={17} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-menu-btn mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer mobile-only animate-fade">
            <div className="mobile-nav-links">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button className="mobile-nav-item model-specs-item" onClick={() => { onOpenInfo(); setMobileMenuOpen(false); }}>
                <Activity size={20} />
                <span>Engine Diagnostics & Specs</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Fixed Bottom Navigation Bar for Native-like App Feel */}
      <nav className="mobile-bottom-bar mobile-only">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`mobile-bar-tab ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
