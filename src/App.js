import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageStudio from './components/ImageStudio';
import ChatStudio from './components/ChatStudio';
import RecipeStudio from './components/RecipeStudio';
import RedirectTester from './components/RedirectTester';
import ImageLightbox from './components/ImageLightbox';
import InfoModal from './components/InfoModal';
import { checkBackendStatus } from './services/api';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ status: 'CHECKING', isMockMode: true });

  const refreshStatus = async () => {
    const status = await checkBackendStatus();
    setBackendStatus(status);
  };

  useEffect(() => {
    refreshStatus();
    const interval = setInterval(refreshStatus, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="studio-app">
      {/* Background Ambient Glows */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendStatus={backendStatus}
        onOpenInfo={() => setShowInfoModal(true)}
      />

      {/* Main Workspace Container */}
      <main className="studio-main">
        {activeTab === 'gallery' && (
          <ImageStudio onSelectImage={(img) => setSelectedImage(img)} />
        )}

        {activeTab === 'chat' && <ChatStudio />}

        {activeTab === 'recipe' && <RecipeStudio />}

        {activeTab === 'redirect' && <RedirectTester />}
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <ImageLightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Info / Setup Modal */}
      {showInfoModal && (
        <InfoModal
          backendStatus={backendStatus}
          onClose={() => setShowInfoModal(false)}
        />
      )}
    </div>
  );
}

export default App;
